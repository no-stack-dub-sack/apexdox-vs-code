import ApexDoc from '../core/ApexDoc';
import ClassModel from '../models/ClassModel';

// veggie liver stuff


class Utils {
    private static KEYWORDS: string[] = ['list', 'set', 'map'];
    private static COLLECTIONS: string[] = [
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

    public static isURL(str: string): boolean {
        if (!str) {
            return false;
        }

        // TODO: consider all cases. Should we just use Validator?
        // Definitely if there are other validation cases which call for another method from it.
        return /^(https?):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/.test(str.trim());
    }

    public static isMarkdownURL(str: string): boolean {
        return /^\\[.*\\]\\(.*\\)$/.test(str.trim());
    }

    /**
     * See if line starts with scope keywords, if it does not, and
     * current scope is private, see if line starts with keyword or
     * primitive data type, or collection which would mean it is
     * implicitly private. This only works for methods in most cases,
     * otherwise we would be matching local variables as well. This is
     * why we check for '('. Unfortunately, we cannot check for all data
     * types, so if a method is not given an explicit access modifier &
     * it doesnt start with these keywords, it will be undetectable by ApexDoc2.
    */
    public static containsScope(line: string): string {
        for (let i = 0; i < ApexDoc.registerScope.length; i++) {
            let scope = ApexDoc.registerScope[i].toLowerCase();

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

        return '';
    }

    public static stripAnnotations(line: string): string {
        let i = 0;
        while (line.trim().startsWith('@')) {
            line = line.trim().replace(/@\w+\s*(\([\w=.*''/\s]+\))?/, '');
            if (i >= 100) {
                break; // infinite loop protect, just in case
            }
            i++;
        }

        return line;
    }

    public static previousWord(str: string, searchIdx: number): string {
        if (!str) {
            return '';
        }

        if (searchIdx >= str.length) {
            return '';
        }

        let idxStart;
        let idxEnd;
        for (idxStart = searchIdx - 1, idxEnd = 0; idxStart >= 0; idxStart--) {
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

        if (idxStart === -1) {
            return '';
        } else {
            return str.substring(idxStart, idxEnd);
        }
    }

    /**
     * @description Helper method to determine if a line being parsed should be skipped.
     * Ignore lines not dealing with scope unless they start with the certain keywords:
     * We do not want to skip @isTest classes, inner classes, inner interfaces, or innter
     * enums defined without without explicit access modifiers. These are assumed to be
     * private. Also, interface methods don't have scope, so don't skip those lines either.
     */
    public static shouldSkipLine(line: string, cModel: ClassModel): boolean {
        if (this.containsScope(line) === null &&
            !line.toLowerCase().startsWith(ApexDoc.ENUM + " ") &&
            !line.toLowerCase().startsWith(ApexDoc.CLASS + " ") &&
            !line.toLowerCase().startsWith(ApexDoc.INTERFACE + " ") &&
            !(cModel !== null && cModel.getIsInterface() && line.includes('('))) {
                return true;
        }

        return false;
    }

    public static isEnum(line: string): boolean {
        line = this.stripAnnotations(line);
        if (/^(global\\s+|public\\s+|private\\s+)?enum\\b.*"/.test(line)) {
            return true;
        }

        return false;
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
}

export default Utils;