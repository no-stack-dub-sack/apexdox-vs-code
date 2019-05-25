import * as Models from '../common/models';
import * as templates from '../common/templates';
import ApexDoc from './ApexDoc';
import ApexDocError from '../common/ApexDocError';
import ClassMarkupGenerator from './generators/models/ClassMarkupGenerator';
import EnumMarkupGenerator from './generators/models/EnumMarkupGenerator';
import fs from 'fs';
import GeneratorUtils from './generators/GeneratorUtils';
import LineReader from './LineReader';
import MenuGenerator from './generators/MenuGenerator';
import path from 'path';
import pretty from 'pretty';
import rimraf from 'rimraf';
import { ISourceEntry } from '../common/Settings';
import { Option } from '../common/Utils';
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

    // #region Public API Methods

    /**
     * Collects the Apex .cls files the user has indicated they'd like to document via config settings.
     *
     * @param sources A list of `ISourceEntry` objects from where to collect our .cls files
     * @param includes See config settings: a list of patterns to include
     * @param excludes See config settings: a list of patterns to exclude
     */
    public getFiles(sources: ISourceEntry[], includes: string[], excludes: string[]): ISourceEntry[] {
        const filesToCopy = new Array<ISourceEntry>()
            , noneFound = new Array<string>();

        for (let src of sources) {
            const files = fs.readdirSync(src.path);

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
                            path: path.resolve(src.path, fileName),
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
                                path: path.resolve(src.path, fileName),
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
            ${MenuGenerator.makeScopingPanel()}
            <tr style="vertical-align:top;">
            ${MenuGenerator.makeMenu(groupNameMap, models)}`;

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
        if (!filePath.trim()) { return; }
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

    // #region FS Utils
    private makeDirs(): void {
        const root = this.path;
        const assets = path.resolve(root, 'assets');

        // clean directory first if user specified this
        ApexDoc.config.cleanDir && rimraf.sync(root);

        if (!fs.existsSync(root)) {
            [root, assets].forEach(path => fs.mkdirSync(path));
        } else if (fs.existsSync(root) && !fs.existsSync(assets)) {
            fs.mkdirSync(assets);
        }
    }

    private createHTMLFiles(fileMap: Map<string, string>): void {
        for (let fileName of fileMap.keys()) {
            let contents = pretty(<string>fileMap.get(fileName));
            let fullyQualifiedFileName = path.resolve(this.path, fileName + '.html');
            fs.writeFileSync(fullyQualifiedFileName, contents);
        }
    }

    private collectApexDocAssets(): string[] {
        const files = fs.readdirSync(path.resolve(ApexDoc.extensionRoot, 'assets'));

        return files
            .map(fileName => path.resolve(ApexDoc.extensionRoot, 'assets', fileName))
            .filter(fileName => !fileName.endsWith('.svg')); // exclude logo SVG
    }

    private copyAssetsToTarget(files: string[]): void {
        files.forEach(file => {
            if (fs.existsSync(file)) {
                fs.copyFileSync(file, path.resolve(this.path, 'assets', path.basename(file)));
            } else {
                window.showWarningMessage(ApexDocError.ASSET_NOT_FOUND(file));
            }
        });
    }
    // #endregion

    // #region Document Generators
    private makePage(contents: string, banner: Option<string, void>, links: string, title?: string) {
        title = title ? `<h2 class='sectionTitle'>${title}</h2>` : '';
        return `${GeneratorUtils.makeHeader(banner, this.documentTitle)}
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
                    const markup = this.makePage(contents, banner, links);
                    fileMap.set(path.basename(pagePath.substring(0, pagePath.lastIndexOf('.'))), markup);
                }
            }
        });
    }

    private makeClassGroupPages(fileMap: Map<string, string>, links: string, banner: Option<string, void>,
        classGroupMap: Map<string, Models.ClassGroup>): void {

        for (let group of classGroupMap.keys()) {
            const cg = classGroupMap.get(group);
            if (cg && cg.contentSource) {
                const cgContent = this.parseHTMLFile(cg.contentSource);
                if (cgContent) {
                    let markup = this.makePage(cgContent, banner, links, GeneratorUtils.escapeHTML(cg.name, false));
                    fileMap.set(cg.contentFileName, markup);
                }
            }
        }
    }

    public makeDocumentationPages(fileMap: Map<string, string>, links: string, banner: Option<string, void>,
            modelMap: Map<string, Models.TopLevelModel>): void {

        for (let model of modelMap.values()) {
            let fileName = '';
            let contents = '';
            if (model.nameLine) {
                fileName = model.name;

                if (model.modelType === Models.ModelType.CLASS) {

                    const cModel = <Models.ClassModel>model;
                    contents += ClassMarkupGenerator.generate(cModel, modelMap);

                    // get child classes to work with in the order user specifies
                    const childClasses = ApexDoc.config.sortOrder === ApexDoc.ORDER_ALPHA
                        ? cModel.childClassesSorted
                        : cModel.childClasses;

                    // map over child classes, creating HTML, and concat result
                    contents += childClasses.map(cmChild =>
                        ClassMarkupGenerator.generate(cmChild, modelMap)).join('');

                } else if (model.modelType === Models.ModelType.ENUM) {
                    const eModel = <Models.EnumModel>model;
                    contents += EnumMarkupGenerator.generate(eModel, modelMap);
                }

            } else {
                continue;
            }

            contents += '</div>';
            contents = this.makePage(contents, banner, links);
            fileMap.set(fileName, contents);
        }
    }
    // #endregion
}

export default FileManager;