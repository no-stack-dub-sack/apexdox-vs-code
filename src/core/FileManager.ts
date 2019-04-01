import { ApexDocError } from '../utils/Guards';
import * as HTML from '../utils/HTML';
import * as vscode from 'vscode';
import ApexDoc from './ApexDoc';
import ClassGroup from '../models/ClassGroup';
import ClassModel from '../models/ClassModel';
import DocGen from './DocGen';
import EnumModel from '../models/EnumModel';
import LineReader from '../utils/LineReader';
import TopLevelModel, { ModelType } from '../models/TopLevelModel';
import {
    readdirSync,
    copyFileSync,
    existsSync,
    mkdirSync,
    writeFileSync
} from 'fs';

class FileManager {
    private path: string;
    private documentTitle: string;

    public constructor(targetDirectory: string, documentTitle: string) {
        this.path = targetDirectory;
        this.documentTitle = documentTitle;
    }

    public getFiles(sourceDirectory: string, includes: string[], excludes: string[]): string[] {
        try {
            let filesToCopy: string[] = [];
            let files: string[];
            files = readdirSync(sourceDirectory);
            if (files && files.length > 0) {
                files.forEach(fileName => {
                    // make sure entry is a file and is an apex cl
                    if (!fileName.endsWith(".cls")) {
                        return;
                    }

                    for (let entry of excludes) {
                        entry = entry.trim().replace("*", "");
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
                        entry = entry.trim().replace("*", "");
                        // file matches explicitly matches or matches wildcard
                        if (fileName.startsWith(entry) || fileName.endsWith(entry))  {
                            filesToCopy.push(fileName);
                        }
                    }
                });
            } else {
                vscode.window.showErrorMessage(`ApexDoc2 Failed: No files found in directory: ` + sourceDirectory);
            }
            return filesToCopy;
        } catch (e) {
            throw new ApexDocError(e);
        }
    }

    private parseFile(filePath: string): string {
        try {
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
            }
        } catch (e) {
            vscode.window.showErrorMessage(e);
        }

        return "";
    }

    public parseHTMLFile(filePath: string): string {
        let contents = (this.parseFile(filePath)).trim();
        if (contents) {
            let startIndex = contents.indexOf('<body>');
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

    private createHTML(fileNameToContent: Map<string, string>): boolean {
        try {
            // create our target directory if it doesn't exist
            if (!existsSync(this.path)) {
                mkdirSync(this.path);
            }

            for (let fileName of fileNameToContent.values()) {
                let contents = fileNameToContent.get(fileName);
                let fullyQualifiedFileName = this.path + fileName + '.html';
                writeFileSync(fullyQualifiedFileName, contents);
            }

            // copy our resources to our target dir
            this.copyResourcesToTarget();
            return true;
        } catch (err) {
            new ApexDocError(err);
        }

        return false;
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
            homeContents = DocGen.makeHeader(bannerPage, this.documentTitle) + homeContents + HTML.FOOTER;
        } else {
            homeContents = HTML.DEFAULT_HOME_CONTENTS;
            homeContents = links + `<td class='contentTD'><h2 class='sectionTitle'>Home</h2>${homeContents}</td>`;
            homeContents = DocGen.makeHeader(bannerPage, this.documentTitle) + homeContents + HTML.FOOTER;
        }

        let fileName = '';
        const fileMap = new Map<string, string>();
        fileMap.set('index', homeContents);

        // create our Class Group content files
        this.createClassGroupContent(fileMap, links, bannerPage, groupNameMap);

        for (let model of models) {
            let contents = links;
            if (model.getNameLine()) {
                fileName = model.getName();
                contents += '<td class="contentTD">';

                if (model.getModelType() === ModelType.CLASS) {

                    const cModel = <ClassModel>model;
                    contents += DocGen.documentClass(cModel, modelMap, models);

                    // get child classes to work with in the order user specifies
                    const childClasses = DocGen.sortOrderStyle === ApexDoc.ORDER_ALPHA
                        ? cModel.getChildClassesSorted()
                        : cModel.getChildClasses();

                    // map over child classes, creating HTML, and concat result
                    contents += childClasses.map(cmChild =>
                        DocGen.documentClass(cmChild, modelMap, models)).join('');

                } else if (model.getModelType() === ModelType.ENUM) {
                    const eModel = <EnumModel>model;
                    contents += DocGen.documentEnum(eModel, modelMap, models);
                }

            } else {
                continue;
            }
            contents += '</div>';
            contents = DocGen.makeHeader(bannerPage, this.documentTitle) + contents + HTML.FOOTER;
            fileMap.set(fileName, contents);
        }

        this.createHTML(fileMap);
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

                    html += HTML.FOOTER;

                    fileMap.set(cg.getContentFilename(), html);
                }
            }
        }
    }

    // TODO: find the right time to invoke this!
    // this is slightly different that the java implementation
    private copyResourcesToTarget() {
        try {
            const files: string[] = readdirSync(ApexDoc.extensionRoot + '/resources');
            files.forEach(file => {
                copyFileSync(ApexDoc.extensionRoot + '/resources/' + file, this.path + '/' + file);
            });
        } catch (e) {
            throw new ApexDocError(e);
        }
    }
}

export default FileManager;