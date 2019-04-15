import * as templates from '../utils/Templates';
import * as vscode from 'vscode';
import ApexDoc from './ApexDoc';
import ApexDocError from '../utils/ApexDocError';
import ClassGroup from '../models/ClassGroup';
import ClassModel from '../models/ClassModel';
import DocGen from './DocGen';
import EnumModel from '../models/EnumModel';
import LineReader from '../utils/LineReader';
import pretty from 'pretty';
import rimraf from 'rimraf';
import TopLevelModel, { ModelType } from '../models/TopLevelModel';
import { basename, resolve } from 'path';
import {
    copyFileSync,
    existsSync,
    mkdirSync,
    readdirSync,
    writeFileSync
    } from 'fs';

class FileManager {
    private path: string;
    private documentTitle: string;
    private userAssets: string[];

    public constructor(targetDirectory: string, documentTitle: string, assets: string[]) {
        this.path = targetDirectory;
        this.userAssets = assets;
        this.documentTitle = documentTitle;
    }

    public getFiles(sourceDirectory: string, includes: string[], excludes: string[]): string[] {
        let filesToCopy: string[] = [];
        let files: string[];
        files = readdirSync(sourceDirectory);
        // make sure files is truthy and contains Apex classes
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
                    filesToCopy.push(fileName);
                    return;
                }

                // there are includes params, only include files that pass test
                for (let entry of includes) {
                    entry = entry.trim().replace('*', '');
                    // file matches explicitly matches or matches wildcard
                    if (fileName.startsWith(entry) || fileName.endsWith(entry))  {
                        filesToCopy.push(fileName);
                    }
                }
            });
        } else {
            throw new ApexDocError(ApexDocError.NO_FILES_FOUND(sourceDirectory));
        }

        return filesToCopy;
    }

    private readFile(filePath: string): string {
        if (filePath) {
            const reader = new LineReader(filePath);
            let contents = '';
            let line;

            while ((line = reader.readLine()) !== null) {
                line = line.trim();
                if (line) {
                    contents += line;
                }
            }

            return contents;
        } else {
            return '';
        }
    }

    public parseHTMLFile(filePath: string): string {
        let contents = (this.readFile(filePath)).trim();
        if (contents) {
            let startIndex = contents.indexOf('<body>') + 6;
            let endIndex = contents.indexOf('</body>');
            if (startIndex !== -1) {
                if (contents.indexOf('</body>') !== -1) {
                    contents = contents.substring(startIndex, endIndex);
                    return contents;
                }
            }
        }
        return '';
    }

    /**
     * Main routine that creates an HTML file for each class specified
     */
    public createDocs(groupNameMap: Map<string, ClassGroup>, modelMap: Map<string, TopLevelModel>,
            models: Array<TopLevelModel>, bannerPage: string, homeContents: string): void {

        let links = '<table width="100%">';
        links += DocGen.makeHTMLScopingPanel();
        links += "<tr style='vertical-align:top;' >";
        links += DocGen.makeMenu(groupNameMap, models);

        if (homeContents) {
            homeContents = links + `<td class='contentTD'><h2 class='sectionTitle'>Home</h2>${homeContents}</td>`;
            homeContents = DocGen.makeHeader(bannerPage, this.documentTitle) + homeContents + templates.FOOTER;
        } else {
            homeContents = templates.DEFAULT_HOME_CONTENTS;
            homeContents = links + `<td class='contentTD'><h2 class='sectionTitle'>Home</h2>${homeContents}</td>`;
            homeContents = DocGen.makeHeader(bannerPage, this.documentTitle) + homeContents + templates.FOOTER;
        }

        const fileMap = new Map<string, string>();
        fileMap.set('index', homeContents);

        // create our Class Group content files
        this.createClassGroupContent(fileMap, links, bannerPage, groupNameMap);

        for (let model of models) {
            let fileName = '';
            let contents = links;
            if (model.getNameLine()) {
                fileName = model.getName();
                contents += '<td class="contentTD">';

                if (model.getModelType() === ModelType.CLASS) {

                    const cModel = <ClassModel>model;
                    contents += DocGen.documentClass(cModel, modelMap);

                    // get child classes to work with in the order user specifies
                    const childClasses = DocGen.sortOrderStyle === ApexDoc.ORDER_ALPHA
                        ? cModel.getChildClassesSorted()
                        : cModel.getChildClasses();

                    // map over child classes, creating HTML, and concat result
                    contents += childClasses.map(cmChild =>
                        DocGen.documentClass(cmChild, modelMap)).join('');

                } else if (model.getModelType() === ModelType.ENUM) {
                    const eModel = <EnumModel>model;
                    contents += DocGen.documentEnum(eModel, modelMap);
                }

            } else {
                continue;
            }

            contents += '</div>';
            contents = DocGen.makeHeader(bannerPage, this.documentTitle) + contents + templates.FOOTER;
            fileMap.set(fileName, contents);
        }

        // Now finalize everything... Make our directories first
        // if they don't exist yet, then create our HTML files.
        // Lastly, copy our assets, ours first, then the users.
        // If they're using a favicon this will override ours.
        const assets = this.collectApexDocAssets();

        this.makeDirs();
        this.createHTML(fileMap);
        this.copyAssetsToTarget(assets);
        this.copyAssetsToTarget(this.userAssets);
    }

    private createHTML(fileMap: Map<string, string>): void {
        for (let fileName of fileMap.keys()) {
            let contents = pretty(<string>fileMap.get(fileName));
            let fullyQualifiedFileName = resolve(this.path, fileName + '.html');
            writeFileSync(fullyQualifiedFileName, contents);
        }
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

    // create our Class Group content files
    private createClassGroupContent(fileMap: Map<string, string>, links: string, bannerPage: string,
        classGroupMap: Map<string, ClassGroup>): void {

        for (let group of classGroupMap.keys()) {
            const cg = classGroupMap.get(group);
            if (cg && cg.getContentSource()) {
                const cgContent = this.parseHTMLFile(cg.getContentSource());
                if (cgContent) {

                    let html =
                        DocGen.makeHeader(bannerPage, this.documentTitle) + links +
                        `<td class="contentTD"><h2 class="sectionTitle">
                        ${DocGen.escapeHTML(cg.getName(), false)}
                        </h2>${cgContent}</td>`;

                    html += templates.FOOTER;

                    fileMap.set(cg.getContentFilename(), html);
                }
            }
        }
    }

    private collectApexDocAssets(): string[] {
        const files: string[] = readdirSync(ApexDoc.extensionRoot + '/assets');
        return files.map(file => ApexDoc.extensionRoot + '/assets/' + file);
    }

    private copyAssetsToTarget(files: string[]): void {
        files.forEach(file => {
            if (existsSync(file)) {
                copyFileSync(file, resolve(this.path, 'assets', basename(file)));
            } else {
                vscode.window.showWarningMessage(ApexDocError.ASSET_NOT_FOUND(file));
            }
        });
    }
}

export default FileManager;