import { ApexDocError } from "../utils/Guards";
import { readdirSync, copyFileSync } from "fs";
import * as vscode from 'vscode';
import ApexDoc from "./ApexDoc";
import LineReader from "../utils/LineReader";

class FileManager {
    private path: string;
    private documentTitle: string = '';

    public constructor(targetDirectory: string) {
        this.path = targetDirectory;
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
                vscode.window.showErrorMessage("ApexDoc2 Failed: No files found in directory: " + sourceDirectory);
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