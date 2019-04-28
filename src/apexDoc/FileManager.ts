import * as Models from '../models';
import * as templates from '../utils/Templates';
import ApexDoc from './ApexDoc';
import ApexDocError from '../utils/ApexDocError';
import DocGen from './DocGen';
import LineReader from '../utils/LineReader';
import pretty from 'pretty';
import rimraf from 'rimraf';
import { basename, resolve } from 'path';
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    readdirSync,
    writeFileSync
    } from 'fs';
import { ISourceEntry } from './Config';
import { Option } from '../utils/Utils';
import { window } from 'vscode';

class FileManager {
    private path: string;
    private documentTitle: string;
    private userAssets: string[];

    public constructor(targetDirectory: string, documentTitle: string, assets: string[]) {
        this.path = targetDirectory;
        this.userAssets = assets;
        this.documentTitle = documentTitle;
    }

    public getFiles(sources: ISourceEntry[], includes: string[], excludes: string[]): ISourceEntry[] {
        const filesToCopy = new Array<ISourceEntry>()
            , noneFound = new Array<string>();

        for (let src of sources) {
            const files = readdirSync(src.path);

            if (files && files.some(file => file.endsWith('cls'))) {
                files.forEach(fileName => {
                    // make sure entry is a file and is an apex cl
                    if (!fileName.endsWith('.cls')) {
                        return;
                    }

                    for (let entry of excludes) {
                        entry = entry.trim().replace('*', '');
                        // file is explicitly excluded or matches wildcard, return early
                        if (fileName.startsWith(entry) || fileName.endsWith(entry))  {
                            return;
                        }
                    }

                    // no includes params, include file
                    if (includes.length === 0) {
                        filesToCopy.push({
                            path: resolve(src.path, fileName),
                            sourceUrl: src.sourceUrl
                        });
                        return;
                    }

                    // there are includes params, only include files that pass test
                    for (let entry of includes) {
                        entry = entry.trim().replace('*', '');
                        // file matches explicitly matches or matches wildcard
                        if (fileName.startsWith(entry) || fileName.endsWith(entry))  {
                            filesToCopy.push({
                                path: resolve(src.path, fileName),
                                sourceUrl: src.sourceUrl
                            });
                            return;
                        }
                    }
                });
            } else {
                noneFound.push(src.path);
            }
        }

        if (!filesToCopy.length) {
            const sourceDirs = sources.map(src => src.path).join(',');
            throw new ApexDocError(ApexDocError.NO_FILES_FOUND(sourceDirs));
        } else if (noneFound.length) {
            window.showWarningMessage(`No .cls files found in ${noneFound.join(',')}`);
        }

        return filesToCopy;
    }

    /**
     * Parses HTML files provided by the user, like class group pages,
     * project home page, banner page, etc. Returns any content between
     * the <body> tags, or the entire markup if no <body> tags are present.
     * The extracted markup will be placed within the project's standard
     * page layout (header, menu, footer) for the final product.
     *
     * @param filePath The path of the HTML file to parse.
     * @returns string representing the markup or void.
     */
    public parseHTMLFile(filePath: string): Option<string, void> {
        if (!filePath.trim()) { return ; }
        const contents = new LineReader(filePath).toString();
        if (contents) {
            const startIndex = contents.indexOf('<body>');
            const endIndex = contents.indexOf('</body>');
            if (startIndex !== -1 && endIndex !== -1) {
                return contents.substring(startIndex + 6, endIndex);
            } else if (startIndex === -1 && endIndex === -1) {
                return contents;
            }
        }
    }

    private makePage(contents: string, banner: Option<string, void>, links: string, title?: string) {
        title = title ? `<h2 class='sectionTitle'>${title}</h2>` : '';
        return `${DocGen.makeHeader(banner, this.documentTitle)}
            ${links}<td class="contentTD">${title + contents}</td>
            ${templates.FOOTER}`;
    }

    private makeSupplementaryPages(fileMap: Map<string, string>, links: string, banner: Option<string, void>, pages: string[]): void {
        pages.forEach((pagePath, i) => {
            if (i === 0) {
                // our home page is always the first index
                const homePageContents = this.parseHTMLFile(pagePath);
                const markup = this.makePage(homePageContents || templates.DEFAULT_HOME_CONTENTS, banner, links, 'Home');
                fileMap.set('index', markup);
            } else {
                const contents = this.parseHTMLFile(pagePath);
                if (contents) {
                    const markup = this.makePage(contents, banner, links, 'Home');
                    fileMap.set(basename(pagePath.substring(0, pagePath.lastIndexOf('.'))), markup);
                }
            }
        });
    }

    private makeClassGroupPages(fileMap: Map<string, string>, links: string, banner: Option<string, void>,
        classGroupMap: Map<string, Models.ClassGroup>): void {

        for (let group of classGroupMap.keys()) {
            const cg = classGroupMap.get(group);
            if (cg && cg.getContentSource()) {
                const cgContent = this.parseHTMLFile(cg.getContentSource());
                if (cgContent) {
                    let markup = this.makePage(cgContent, banner, links, DocGen.escapeHTML(cg.getName(), false));
                    fileMap.set(cg.getContentFilename(), markup);
                }
            }
        }
    }

    public makeDocumentationPages(fileMap: Map<string, string>, links: string, banner: Option<string, void>,
            modelMap: Map<string, Models.TopLevelModel>): void {

        for (let model of modelMap.values()) {
            let fileName = '';
            let contents = '';
            if (model.getNameLine()) {
                fileName = model.getName();

                if (model.getModelType() === Models.ModelType.CLASS) {

                    const cModel = <Models.ClassModel>model;
                    contents += DocGen.documentClass(cModel, modelMap);

                    // get child classes to work with in the order user specifies
                    const childClasses = DocGen.sortOrderStyle === ApexDoc.ORDER_ALPHA
                        ? cModel.getChildClassesSorted()
                        : cModel.getChildClasses();

                    // map over child classes, creating HTML, and concat result
                    contents += childClasses.map(cmChild =>
                        DocGen.documentClass(cmChild, modelMap)).join('');

                } else if (model.getModelType() === Models.ModelType.ENUM) {
                    const eModel = <Models.EnumModel>model;
                    contents += DocGen.documentEnum(eModel, modelMap);
                }

            } else {
                continue;
            }

            contents += '</div>';
            contents = this.makePage(contents, banner, links);
            fileMap.set(fileName, contents);
        }
    }

    /**
     * Main routine that creates HTML file for each of our classes and for any additional
     * pages that a user has included, e.g. home page, class group, supplementary.
     *
     * @param groupNameMap Map of our class group names to their ClassGroup instances
     * @param modelMap Map of our model names to their TopLevelModel instances
     * @param banner The HTML markup for the project's banner
     * @param pages Any additional pages, including the project home page, the user has included
     */
    public createDocs(groupNameMap: Map<string, Models.ClassGroup>, models: Map<string, Models.TopLevelModel>,
            banner: Option<string, void>, pages: string[]): void {

        // make the menu and the scoping panel
        // and initialize our main file map
        const fileMap = new Map<string, string>();
        const links = `<table width="100%">
            ${DocGen.makeHTMLScopingPanel()}
            <tr style="vertical-align:top;">
            ${DocGen.makeMenu(groupNameMap, models)}`;

        // create the markup for our different varieties of HTML pages
        // and add to our file map. HTML files will be created from this map.
        this.makeSupplementaryPages(fileMap, links, banner, pages);
        this.makeClassGroupPages(fileMap, links, banner, groupNameMap);
        this.makeDocumentationPages(fileMap, links, banner, models);

        // Now finalize everything... Make our directories first
        // if they don't exist yet, then create our HTML files.
        // Lastly, copy our assets, ours first, then the users.
        // If they're using a favicon this will override ours.
        const assets = this.collectApexDocAssets();

        this.makeDirs();
        this.createHTMLFiles(fileMap);
        this.copyAssetsToTarget(assets);
        this.copyAssetsToTarget(this.userAssets);
    }

    private collectApexDocAssets(): string[] {
        const files: string[] = readdirSync(resolve(ApexDoc.extensionRoot, 'assets'));
        return files.map(fileName => resolve(ApexDoc.extensionRoot, 'assets', fileName));
    }

    private makeDirs(): void {
        const root = this.path;
        const assets = resolve(root, 'assets');

        // clean directory first if user specified this
        ApexDoc.config.cleanDir && rimraf.sync(root);

        if (!existsSync(root)) {
            [root, assets].forEach(path => mkdirSync(path));
        } else if (existsSync(root) && !existsSync(assets)) {
            mkdirSync(assets);
        }
    }

    private createHTMLFiles(fileMap: Map<string, string>): void {
        for (let fileName of fileMap.keys()) {
            let contents = pretty(<string>fileMap.get(fileName));
            let fullyQualifiedFileName = resolve(this.path, fileName + '.html');
            writeFileSync(fullyQualifiedFileName, contents);
        }
    }

    private copyAssetsToTarget(files: string[]): void {
        files.forEach(file => {
            if (existsSync(file)) {
                copyFileSync(file, resolve(this.path, 'assets', basename(file)));
            } else {
                window.showWarningMessage(ApexDocError.ASSET_NOT_FOUND(file));
            }
        });
    }
}

export default FileManager;