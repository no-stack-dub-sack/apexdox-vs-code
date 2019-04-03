import ApexDoc from '../core/ApexDoc';
import ApexDocError from './ApexDocError';
import Utils from './Utils';
import { existsSync } from 'fs';

class Guards {

    public static directory(path: string, arg: string): string {
        this.typeGuard('string', path, arg);
        // blank directory's can be ignored as default for non-required
        // arguments. Source directory will always be populated by this point.
        if (path === '' || existsSync(path)) {
            return path;
        } else {
            throw new ApexDocError(ApexDocError.INVALID_DIRECTORY(arg, path));
        }
    }

    public static sortOrder(sortOrder: string): string {
        this.typeGuard('string', sortOrder, 'sort_order');
        sortOrder = sortOrder.toLowerCase();
        if (sortOrder === ApexDoc.ORDER_LOGICAL || sortOrder === ApexDoc.ORDER_ALPHA) {
            return sortOrder;
        } else {
            throw new ApexDocError(ApexDocError.INVALID_SORT_ORDER(sortOrder));
        }
    }

    public static portGuard(port: number): number {
        this.typeGuard('number', port, 'port');
        // only allows integers between 0-65535 as port numbers
        if (/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(String(port))) {
            return port;
        } else {
            throw new ApexDocError(ApexDocError.INVALID_PORT(port));
        }
    }

    public static sourceURL(str: string): string {
        this.typeGuard('string', str, 'source_url');
        if (str === '' || Utils.isURL(str)) {
            return str.trim();
        } else {
            throw new ApexDocError(ApexDocError.INVALID_SOURCE_URL(str));
        }
    }

    public static targetDirectory(path: string): string {
        this.typeGuard('string', path, 'target_directory');
        if (path && path.length > 0) {
            return path;
        } else {
            throw new ApexDocError(ApexDocError.INVALID_TARGET_DIRECTORY(path));
        }
    }

    public static showTOCSnippets(bool: boolean): boolean {
        if (typeof bool !== 'boolean') {
            return true; // DEFAULT
        } else {
            return bool;
        }
    }

    public static assets(assets: string[]): string[] {
        this.typeGuard('array', assets, 'assets');
        assets.forEach(resource => {
            if (typeof resource !== 'string') {
                throw new ApexDocError(ApexDocError.ONLY_STRINGS('assets'));
            }
        });
        return assets;
    }

    public static scope(scopes: string[]): string[] {
        this.typeGuard('array', scopes, 'scope');

        if (scopes.length > 6) {
            throw new ApexDocError(ApexDocError.SCOPE_ENTRIES_MAX);
        }

        if (scopes.length === 0) {
            throw new ApexDocError(ApexDocError.SCOPE_ENTRIES_MIN);
        }

        let registeredScopes: string[] = [];

        scopes.forEach(scope => {
            if (typeof scope !== 'string') {
                throw new ApexDocError(ApexDocError.ONLY_STRINGS('scope'));
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
                throw new ApexDocError(ApexDocError.SCOPE_ENTRY_INVALID(scope));
            }
        });

        return registeredScopes;
    }

    public static typeGuard<T>(type: string, value: T, arg: string): boolean {
        if ((type === 'array' && Array.isArray(value)) || typeof value === type) {
            return true;
        } else {
            throw new ApexDocError(ApexDocError.INVALID_TYPE(arg, type));
        }
    }
}

export default Guards;