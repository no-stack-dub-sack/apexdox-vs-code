import ApexDoc from './ApexDoc';

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
        for (let i = 0; i < ApexDoc.rgstrScope.length; i++) {
            let scope = ApexDoc.rgstrScope[i].toLowerCase();

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
                for (let keyword of Utils.KEYWORDS) {
                    if (line.startsWith(keyword + ' ') && line.includes('(')) {
                        return ApexDoc.PRIVATE;
                    }
                }

                // match methods that return collections:
                for (let collection of Utils.COLLECTIONS) {
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
}

export default Utils;