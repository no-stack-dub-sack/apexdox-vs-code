import { existsSync } from 'fs';
import Utils from './Utils';
import ApexDoc from '../core/ApexDoc';

export class ApexDocError extends Error {}

class Guards {
    public static directory(path: string, arg: string): string {
        this.typeGuard('string', path, arg);
        if (path === '' || existsSync(path)) {
            // trim trailing slash, so we don't have to deal with this later
            if (path.endsWith('\\') || path.endsWith('/')) {
                return path.slice(0, -1);
            }
            return path;
        } else {
            throw new ApexDocError(
                `Value for <${arg}> argument: '${path}' is invalid. Please provide a valid directory.`
            );
        }
    }

    public static sortOrder(sortOrder: string): string {
        this.typeGuard('string', sortOrder, 'sort_order');
        sortOrder = sortOrder.toLowerCase();
        if (sortOrder === ApexDoc.ORDER_LOGICAL || sortOrder === ApexDoc.ORDER_ALPHA) {
            return sortOrder;
        } else {
            throw new ApexDocError(
                `Value for <sort_order> argument '${sortOrder}' is invalid. Options for this argument are: 'logical' or 'alpha'.`
            );
        }
    }

    public static sourceURL(str: string): string {
        this.typeGuard('string', str, 'source_url');
        if (str === '' || Utils.isURL(str)) {
            return str.trim();
        } else {
            throw new ApexDocError(
                'Value for <source_url> argument: \'str\' is invalid. Please provide a valid URL where your source ' +
                'code is hosted, e.g.: \'https://github.com/no-stack-dub-sack/ApexDoc2/tree/master/src/main\''
            );
        }
    }

    public static targetDirectory(path: string): string {
        this.typeGuard('string', path, 'target_directory');
        if (path && path.length > 0) {
            return path.endsWith('/') || path.endsWith('\\') ? path : path + '/';
        } else {
            throw new ApexDocError(
                "Value for <target_directory> argument: '" + path +
                "' is invalid. Please provide a valid directory."
            );
        }
    }

    public static showTOCSnippets(bool: boolean): boolean {
        if (typeof bool !== 'boolean') {
            return true; // DEFAULT
        } else {
            return bool;
        }
    }

    public static scope(scopes: string[]): string[] {
        this.typeGuard('array', scopes, 'scope');
        const commonError = 'Please provide a comma delimited list of valid scopes. ' +
            'Valid scopes include: ' + ApexDoc.SCOPES.join(', ');

        if (scopes.length > 6) {
            throw new ApexDocError(`Argument <scope> has too many entries. ${commonError}`);
        }

        if (scopes.length === 0) {
            throw new ApexDocError(`Argument <scope> must have at least one entry. ${commonError}`);
        }

        let registeredScopes: string[] = [];

        scopes.forEach(scope => {
            if (typeof scope !== 'string') {
                throw new ApexDocError('Argument <scope> array may only contain strings.');
            }

            let foundScope = false;
            scope = scope.toLowerCase().trim();
            ApexDoc.SCOPES.forEach(s => {
                if (s.toLowerCase() === scope) {
                    registeredScopes.push(s);
                    foundScope = true;
                }
            });

            if (!foundScope) {
                throw new ApexDocError(`Entry for <scope> argument: '${scope}' is invalid. ${commonError}`);
            }
        });

        return registeredScopes;
    }

    public static typeGuard<T>(type: string, value: T, arg: string): boolean {
        if ((type === 'array' && Array.isArray(value)) || typeof value === type) {
            return true;
        } else {
            throw new ApexDocError(`Value for <${arg}> argument is incorrect type. Expected '${type}'`);
        }
    }
}

export default Guards;