import * as tags from './tags';
import ApexDoc from '../apexDoc/ApexDoc';
import Utils, { Option } from '../utils/Utils';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { window } from 'vscode';

abstract class ApexModel {

    protected annotations: string[] = [];
    protected author: string = '';
    protected deprecated: string = '';
    protected description: string = '';
    protected example: string = '';
    protected exception: string = '';
    protected groupContentPath: string = '';
    protected groupName: string = '';
    protected lineNum: number = 0;
    protected nameLine: string = '';
    protected params: string[] = [];
    protected returns: string = '';
    protected scope: string = '';
    protected see: string[] = [];
    protected since: string = '';
    protected sourceUrl?: string;

    protected constructor(comments: string[], sourceUrl: Option<string>) {
        this.parseComments(comments);
        this.sourceUrl = sourceUrl;
    }

    public abstract getName(): string;

    public getAnnotations(): string[] {
        return this.annotations;
    }

    public getDescription(): string {
        return this.description;
    }

    public getLineNum(): number {
        return this.lineNum;
    }

    public getNameLine(): string {
        return this.nameLine;
    }

    public getScope(): string {
        return this.scope;
    }

    public getSourceUrl(): Option<string> {
        return this.sourceUrl;
    }

    private parseComments(comments: string[]): void {
        let currBlock: Option<string, null> = null;
        let block: Option<string, null> = null;

        for (let comment of comments) {
            let newBlock = false, isBreak = false;
            let lowerComment = comment.toLowerCase();
            let i: number;

            // skip lines that are just opening or closing comment blocks
            if (comment.trim() === '/**' || comment.trim() === '*/') {
                continue;
            }

            // if we find a tag, start a new block
            if (((i = lowerComment.indexOf(block = tags.AUTHOR.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.SINCE.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.SEE.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.RETURNS.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.PARAM.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.EXCEPTION.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.DEPRECATED.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.DESCRIPTION.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.GROUP.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.GROUP_CONTENT.label)) >= 0)
                || ((i = lowerComment.indexOf(block = tags.EXAMPLE.label)) >= 0)) {

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
            // if currBlock was not reset on this iteration we're on the next line of the last tag, add line
            // to that value. Allow empty lines in example blocks to preserve whitespace in complex examples
            if (currBlock !== null && (line.trim() || !line.trim() && currBlock === tags.EXAMPLE.label)) {
                if (currBlock === tags.AUTHOR.label) {
                    this.author += (this.author ? ' ' : '') + line.trim();
                } else if (currBlock === tags.SINCE.label) {
                    this.since += (this.since ? ' ' : '') + line.trim();
                } else if (currBlock === tags.SEE.label) {
                    this.see.push(line.trim());
                } else if (currBlock === tags.RETURNS.label) {
                    this.returns += (this.returns ? ' ' : '') + line.trim();
                } else if (currBlock === tags.PARAM.label) {
                    let p = (newBlock ? '' : this.params.pop());
                    this.params.push(p + (p && p.length > 0 ? ' ' : '') + line.trim());
                } else if (currBlock === tags.EXCEPTION.label) {
                    this.exception += (this.exception ? ' ' : '') + line.trim();
                } else if (currBlock === tags.DEPRECATED.label) {
                    this.deprecated += (this.deprecated ? ' ' : '') + line.trim();
                } else if (currBlock === tags.DESCRIPTION.label) {
                    this.description += (this.description ? ' ' : '') + line.trim();
                } else if (currBlock === tags.GROUP.label) {
                    this.groupName += line.trim();
                } else if (currBlock === tags.EXAMPLE.label) {
                    this.example += (this.example ? ' \n'  : '') + line;
                } else if (currBlock === tags.GROUP_CONTENT.label) {
                    const doesResolve = this.resolveContentPath(line.trim());
                    if (doesResolve) {
                        this.groupContentPath += doesResolve;
                    }
                }
            }
            // not a recognized tag, assume we're in un-tagged description
            else if (currBlock === null && line.trim()) {
                currBlock = block = tags.DESCRIPTION.label;
                this.description += (this.description ? ' ' : '') + line.trim();
            } else if (!line.trim()) {
                currBlock = null;
            }

            if (isBreak) {
                break;
            }
        }
    }

    protected parseScope(): void {
        if (this.nameLine) {
            let scope = Utils.containsScope(this.nameLine);
            if (scope) {
                this.scope = scope;
            } else {
                // scope is implicitly private
                this.scope = ApexDoc.PRIVATE;
            }
        }
    }

    // TODO: change this to relative to project root now that we can
    // have multiple sources! This will have to be fixed in README too.
    private resolveContentPath(contentPath: string): Option<string, null> {
        for (let src of ApexDoc.config.source) {
            let path = resolve(src.path, contentPath.trim());
            if (/.*\.s?html?$/.test(contentPath.trim()) && existsSync(path)) {
                return path;
            }
        }

        const warningMessage =
            `@group-content path '${contentPath.trim()}' in file '${ApexDoc.currentFile}' is invalid! ` +
            `You may want to update this tag's value to a valid HTML file path.`;

        window.showWarningMessage(warningMessage);
        return null;
    }

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
}

export { ApexModel };