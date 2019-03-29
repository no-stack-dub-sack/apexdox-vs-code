import { readdirSync } from "fs";
import { ApexDocError } from "../utils/Guards";
import * as vscode from 'vscode';

class FileManager {
    private path: string;
    private documentTitle: string = '';
    // private FileOutputStream fileOutputStream;
    // private DataOutputStream dataOutputStream;

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
}

export default FileManager;