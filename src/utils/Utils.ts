import ApexDoc from '../apexDoc/ApexDoc';
import DocGen from '../apexDoc/DocGen';
import { ApexModel } from '../models/ApexModel';
import { ClassModel } from '../models/ClassModel';
import { resolve } from 'path';
import { window, workspace, WorkspaceFolder } from 'vscode';

export type Option<T, V = undefined> = T | V;

export const last = <T>(arr: T[]): T => arr[arr.length - 1];

class Utils {
    private static COLLECTIONS: string[] = ['list', 'set', 'map'];
    private static KEYWORDS: string[] = [
        'abstract',
        'final',
        'virtual',
        'override',
        'void',
        'blob',
        'boolean',
        'date',
        'datetime',
        'decimal',
        'double',
        'id',
        'integer',
        'long',
        'object',
        'string',
        'time'
    ];

    public static isClassOrInterface(line: string): boolean {
        // Account for inner classes or @isTest classes without an access modifier; implicitly private
        if (/.*\bclass\b.*/.test(line.toLowerCase()) || /\s?\binterface\s/i.test(line.toLowerCase())) {
            return true;
        }

        return false;
    }

    public static isEnum(line: string): boolean {
        line = this.stripAnnotations(line);
        if (/^(global\s+|public\s+|private\s+)?enum\b.*/.test(line)) {
            return true;
        }

        return false;
    }

    public static stripAnnotations(line: string): string {
        let i = 0;
        while (line && line.trim().startsWith('@')) {
            line = line.trim().replace(/@\w+\s*(\([\w=.*''/\s]+\))?/, '');
            if (i >= 100) {
                break; // infinite loop protect, just in case
            }
            i++;
        }

        return line;
    }

    public static parseAnnotations(previousLine: string, line: string, model: ApexModel): void {
        // If previous line is not a comment line, it could be an annotation line.
        // Annotations may also be on the signature line, so check both for matches.
        if (previousLine && !previousLine.startsWith('*')) {
            line = previousLine + ' ' + line;
        }

        let matches: Option<RegExpMatchArray, null> = line.match(/@\w+\s*(\([\w=.*''/\s]+\))?/g);

        if (matches !== null) {
            matches.forEach(match => {
                if (match) {
                    model && model.getAnnotations().push(match.trim());
                }
            });
        }
    }

    /**
     * Helper method to determine if a line being parsed should be skipped.
     * Ignore lines not dealing with scope unless they start with the certain keywords:
     * We do not want to skip @isTest classes, inner classes, inner interfaces, or inner
     * enums defined without without explicit access modifiers. These are assumed to be
     * private. Also, interface methods don't have scope, so don't skip those lines either.
     */
    public static shouldSkipLine(line: string, cModel?: ClassModel): boolean {
        let classNameParts = cModel && cModel.getName().split('.') || [''];
        let className = last(classNameParts);

        if (!this.containsScope(line) &&
            !line.toLowerCase().startsWith(ApexDoc.ENUM + " ") &&
            !line.toLowerCase().startsWith(ApexDoc.CLASS + " ") &&
            !line.toLowerCase().startsWith(ApexDoc.INTERFACE + " ") &&
            // don't skip default constructors without access modifiers
            !(cModel && new RegExp('\\b' + className + '\\s*\\(').test(line)) &&
            // don't skip interface methods - they don't have access modifiers
            !(cModel && cModel.getIsInterface() && line.includes('('))) {
                return true;
        }

        return false;
    }

    /**
     * See if line starts with scope keywords, if it does not, and
     * current scope is private, see if line starts with keyword or
     * primitive data type, or collection which would mean it is
     * implicitly private. This only works for methods in most cases,
     * otherwise we would be matching local variables as well. This is
     * why we check for '('. Unfortunately, we cannot check for all data
     * types, so if a method is not given an explicit access modifier &
     * it doesn't start with these keywords, it will be undetectable by ApexDoc2.
    */
    public static containsScope(line: string): Option<string, void> {
        for (let scope of ApexDoc.config.scope) {
            scope = scope.toLowerCase();
            // if line starts with annotations, replace them, so
            // we can accurately use startsWith to match scope.
            line = this.stripAnnotations(line);
            line = line.toLowerCase().trim();

            // see if line starts with registered scopes.
            if (line.startsWith(scope + ' ')) {
                return scope;
            }

            // match implicitly private lines
            else if (scope === ApexDoc.PRIVATE) {
                // match static props or methods:
                if (line.startsWith('static ')) {
                    return ApexDoc.PRIVATE;
                }

                // match methods that start with
                // keywords or return primitive types:
                for (let keyword of this.KEYWORDS) {
                    if (line.startsWith(keyword + ' ') && line.includes('(')) {
                        return ApexDoc.PRIVATE;
                    }
                }

                // match methods that return collections:
                for (let collection of this.COLLECTIONS) {
                    if (new RegExp('^' + collection + '<.+>\\s.*').test(line) && line.includes('(')) {
                        return ApexDoc.PRIVATE;
                    }
                }
            }
        }
    }

    public static previousWord(str: string, searchIdx: number): string {
        if (!str) {
            return '';
        }

        if (searchIdx >= str.length) {
            return '';
        }

        let idxStart: number, idxEnd: number;
        for (idxStart = searchIdx - 1, idxEnd = 0; idxStart > 0; idxStart--) {
            if (idxEnd === 0) {
                if (str.charAt(idxStart) === ' ') {
                    continue;
                }
                idxEnd = idxStart + 1;
            } else if (str.charAt(idxStart) === ' ') {
                idxStart++;
                break;
            }
        }

        return str.substring(idxStart, idxEnd);
    }

    public static countChars(str: string, char: string): number {
        let count = 0;
        for (let i = 0; i < str.length; ++i) {
            if (str.charAt(i) === char) {
                ++count;
            }
        }
        return count;
    }

    public static isURL(str: string): boolean {
        if (!str) {
            return false;
        }

        // TODO: consider all cases. Should we just use Validator?
        // Definitely if there are other validation cases which call for another method from it.
        return /^(https?):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/.test(str.trim());
    }

    public static isMarkdownURL(str: string): boolean {
        return /^\[.*\]\(.*\)$/.test(str.trim());
    }

    public static markdownUrlToLink(str: string): string {
        str = str.trim();

        const linkName = str.substring(1, str.indexOf(']'));
        const url = str.substring(str.indexOf('](') + 2, str.length - 1);

        return Utils.isURL(url)
            ? `<a target="_blank" href="${url}">${linkName}</a>`
            : `<span title="URL is invalid!">${linkName}</span>`;
    }

    /**
    * Help highlight.js along, since props and enum signatures are not
    * recognized by highlight.js since they are not full declarations.
    */
   public static highlightNameLine(nameLine: string): string {
        if (nameLine.includes('(')) {
            const name = this.previousWord(nameLine, nameLine.indexOf('('));
            return nameLine.replace(name, `<span class="hljs-title">${name}</span>`);
        } else {
            const words = DocGen.escapeHTML(nameLine, false).split(' ');
            words[words.length - 1] = `<span class="hljs-title">${last(words)}<span>`;
            return words.join(' ');
        }
    }

    public static resolveWorkspaceFolder(path: string): string {
        // should be safe to cast this as not-undefined
        // If running this tool, workspace folders should always exist.
        const folders = <WorkspaceFolder[]>(workspace.workspaceFolders);

        const rootFolderRe = /\$\{workspaceFolder\}(.*)?/;
        const multiFolderRe = /\$\{workspaceFolder:(.*)\}(.*)/;

        if (rootFolderRe.test(path)) {
            const results = <RegExpExecArray>rootFolderRe.exec(path);
            return resolve(folders[0].uri.fsPath, ...results[1].split(/\\|\//));
        } else if (multiFolderRe.test(path)) {
            const results = <RegExpExecArray>multiFolderRe.exec(path);
            for (let folder of folders) {
                if (folder.name === results[1]) {
                    return resolve(folder.uri.fsPath, ...results[2].split(/\\|\//));
                }
            }

            window.showWarningMessage(`Workspace variable in path '${path}' could not be resolved.`);
        }

        return path;
    }
}

export default Utils;