import * as vscode from 'vscode';
import ApexDoc from '../core/ApexDoc';
import Utils from '../utils/Utils';
import { existsSync } from 'fs';
import { resolve } from 'path';

abstract class ApexModel {

    // token constants
    private static AUTHOR: string = ' @author';
    private static DATE: string = ' @date';
    private static DEPRECATED: string = ' @deprecated';
    private static DESCRIPTION: string = ' @description';
    private static EXAMPLE: string = ' @example';
    private static EXCEPTION: string = ' @exception';
    private static GROUP: string = ' @group '; // needed to include space to not match group-content
    private static GROUP_CONTENT: string = ' @group-content';
    private static PARAM: string = ' @param';
    private static RETURN: string = ' @return';
    private static SEE: string = ' @see';

    // instance variables
    private author: string = '';
    private date: string = '';
    private deprecated: string = '';
    private description: string = '';
    private annotations: string[] = [];
    private nameLine: string = '';
    private lineNum: number = 0;

    protected params: string[] = [];
    protected example: string = '';
    protected exception: string = '';
    protected groupName: string = '';
    protected groupContentPath: string = '';
    protected see: string = '';
    protected returns: string = '';
    protected scope: string = '';


    protected constructor(comments: string[]) {
        this.parseComments(comments);
    }

    // model attribute getters / setters
    protected setNameLine(nameLine: string, lineNum: number): void {
        // strip any annotations from the signature line
        // we'll capture those and display them separately
        this.nameLine = Utils.stripAnnotations(nameLine).trim();
        this.lineNum = lineNum;
        // if we're running the stub command
        // we don't care about scope
        if (!ApexDoc.isStub) {
            this.parseScope();
        }
    }

    public getNameLine(): string {
        return this.nameLine;
    }

    public getLineNum(): number {
        return this.lineNum;
    }

    public getScope(): string {
        return !this.scope ? '' : this.scope;
    }

    protected parseScope(): void {
        if (this.nameLine) {
            let scope = Utils.containsScope(this.nameLine);
            if (scope) {
                this.scope = <string>scope;
            }

            // TODO: perhaps this branch of control flow should
            // be present only in a class override method
            else {

                // this must be an inner class
                // or an @IsTest class
                this.scope = ApexDoc.PRIVATE;
            }
        }
    }

    public getDescription(): string {
        return !this.description ? '' : this.description;
    }

    public getAuthor(): string {
        return !this.author ? '' : this.author;
    }

    public getDeprecated(): string {
        return !this.deprecated ? '' : this.deprecated;
    }

    public getDate(): string {
        return !this.date ? '' : this.date;
    }

    public getExample(): string {
        // return example and remove trailing white space which
        // may have built up due to the allowance of preserving
        // white pace in complex code example blocks for methods
        return !this.example ? '' : this.example.trimRight();
    }

    public getSee(): string {
        return !this.see ? '' : this.see;
    }

    public getAnnotations(): string[] {
        return this.annotations;
    }

    // comment parser
    private parseComments(comments: string[]): void {
        let currBlock: string | null = null, block = null;
        for (let comment of comments) {
            let newBlock = false, isBreak = false;
            let lowerComment = comment.toLowerCase();
            let i: number;

            // skip lines that are just opening or closing comment blocks
            if (comment.trim() === '/**' || comment.trim() === '*/') {
                continue;
            }

            // if we find a token, start a new block
            if (((i = lowerComment.indexOf(block = ApexModel.AUTHOR)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.DATE)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.SEE)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.RETURN)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.PARAM)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.EXCEPTION)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.DEPRECATED)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.DESCRIPTION)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.GROUP)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.GROUP_CONTENT)) >= 0)
                || ((i = lowerComment.indexOf(block = ApexModel.EXAMPLE)) >= 0)) {

                comment = comment.substring(i + block.length);
                currBlock = block;
                newBlock = true;
            }

            // get everything after opening '*'s
            let line = '';
            comment = comment.trim();
            for (let j = 0; j < comment.length; ++j) {
                let ch = comment.charAt(j);
                // skip the '/' of the opening
                // block so comment is trimmed correctly
                if (ch === '/' && j === 0) {
                    continue;
                }

                if (ch !== '*') {
                    line = comment.slice(j);
                    break;
                }
            }

            // replace docBlock break marker and indicate we should break after
            // this round. Otherwise we may get some strange behavior due to
            // multi-line support and this common parser for all models
            if (line.includes(ApexDoc.DOC_BLOCK_BREAK)) {
                line = line.replace(ApexDoc.DOC_BLOCK_BREAK, '');
                isBreak = true;
            }

            // add line to appropriate block...
            // if currBlock was not reset on this iteration we're on the next line of the last token, add line
            // to that value. Allow empty lines in example blocks to preserve whitespace in complex examples
            if (currBlock !== null && (line.trim() || !line.trim() && currBlock === ApexModel.EXAMPLE)) {
                if (currBlock === ApexModel.AUTHOR) {
                    this.author += (this.author ? ' ' : '') + line.trim();
                } else if (currBlock === ApexModel.DATE) {
                    this.date += (this.date ? ' ' : '') + line.trim();
                } else if (currBlock === ApexModel.SEE) {
                    this.see += (this.see ? ' ' : '') + line.trim();
                } else if (currBlock === ApexModel.RETURN) {
                    this.returns += (this.returns ? ' ' : '') + line.trim();
                } else if (currBlock === ApexModel.PARAM) {
                    let p = (newBlock ? '' : this.params.splice(this.params.length - 1, 1));
                    this.params.push(p + (p.length > 0 ? ' ' : '') + line.trim());
                } else if (currBlock === ApexModel.EXCEPTION) {
                    this.exception += (this.exception ? ' ' : '') + line.trim();
                } else if (currBlock === ApexModel.DEPRECATED) {
                    this.deprecated += (this.deprecated ? ' ' : '') + line.trim();
                } else if (currBlock === ApexModel.DESCRIPTION) {
                    this.description += (this.description ? ' ' : '') + line.trim();
                } else if (currBlock === ApexModel.GROUP) {
                    this.groupName += line.trim();
                } else if (currBlock === ApexModel.EXAMPLE) {
                    this.example += (this.example ? ' \n'  : '') + line;
                } else if (currBlock === ApexModel.GROUP_CONTENT) {
                    if (this.pathExists(line.trim())) {
                        this.groupContentPath += line.trim();
                    }
                }
            }
            // not a recognized token, assume we're in un-tagged description
            else if (currBlock === null && line.trim()) {
                currBlock = block = ApexModel.DESCRIPTION;
                this.description += (this.description ? ' ' : '') + line.trim();
            } else if (!line.trim()) {
                currBlock = null;
            }

            if (isBreak) {
                break;
            }
        }
    }

    // make sure path relative to target
    // directory exists for @group-content token
    private pathExists(contentPath: string): boolean {
        let path = resolve(...[ApexDoc.config.sourceDirectory, contentPath.trim()]);
        if (/.*\.s?html?$/.test(contentPath.trim()) && existsSync(path)) {
            return true;
        } else {
            vscode.window.showWarningMessage(`@group-content path '${path}' in file '${ApexDoc.currentFile}' is invalid!`);
            return false;
        }
    }
}

export default ApexModel;