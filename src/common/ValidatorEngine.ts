import ApexDoc from '../engine/ApexDoc';
import ApexDocError from './ApexDocError';
import Utils, { Option } from './Utils';
import Validator from './Validator';
import { ApexDocConfig, IApexDocConfig } from './models/settings';
import { existsSync } from 'fs';

class ValidatorEngine extends Validator<IApexDocConfig> {

    public constructor(config: IApexDocConfig) {
        super(config);
        this.validFields = Object.keys(new ApexDocConfig());
    }

    // #region Engine Field Validators / Instance Methods
    private includes() {
        ValidatorEngine.stringArray(this.config.includes, 'includes');
    }

    private excludes() {
        ValidatorEngine.stringArray(this.config.includes, 'excludes');
    }

    private cleanDir() {
        this.config.cleanDir = Utils.boolGuard(this.config.cleanDir, false);
    }

    private showTOCSnippets() {
        this.config.showTOCSnippets = Utils.boolGuard(this.config.showTOCSnippets, true);
    }

    private subtitle() {
        ValidatorEngine.typeGuard('string', this.config.subtitle, 'subtitle');
    }

    private pages() {
        this.config.pages = ValidatorEngine.stringArray(this.config.pages, 'pages')
            .map(path => ValidatorEngine.directory(path, 'pages', '.html'));
    }

    private assets() {
        // do not validate directory on assets, user will be warned at runtime
        this.config.assets = ValidatorEngine.stringArray(this.config.assets, 'assets')
            .map(path => Utils.resolveWorkspaceFolder(path));
    }

    private targetDirectory() {
        const path = this.config.targetDirectory;
        ValidatorEngine.typeGuard('string', path, 'targetDirectory');
        if (path && path.length > 0) {
            this.config.targetDirectory = Utils.resolveWorkspaceFolder(path);
        } else {
            throw new ApexDocError(ApexDocError.INVALID_TARGET_DIRECTORY(path));
        }
    }

    private homePagePath() {
        ValidatorEngine.typeGuard('string', this.config.homePagePath, 'homePagePath');
        this.config.homePagePath = ValidatorEngine.directory(this.config.homePagePath, 'homePagePath', '.html');
    }

    private sortOrder() {
        let sortOrder = this.config.sortOrder;
        ValidatorEngine.typeGuard('string', sortOrder, 'sortOrder');
        sortOrder = sortOrder.toLowerCase();
        if (sortOrder === ApexDoc.ORDER_LOGICAL || sortOrder === ApexDoc.ORDER_ALPHA) {
            this.config.sortOrder = sortOrder;
        } else {
            throw new ApexDocError(ApexDocError.INVALID_SORT_ORDER(sortOrder));
        }
    }

    private title() {
        ValidatorEngine.typeGuard('string', this.config.title, 'title');
        this.config.title = this.config.title || 'Apex Documentation';
    }

    private scope() {
        const scopes = this.config.scope;
        ValidatorEngine.typeGuard('array', scopes, 'scope');

        if (scopes.length > 6) {
            throw new ApexDocError(ApexDocError.SCOPE_ENTRIES_MAX);
        }

        if (scopes.length === 0) {
            throw new ApexDocError(ApexDocError.SCOPE_ENTRIES_MIN);
        }

        let registeredScopes = new Array<string>();

        scopes.forEach(scope => {
            if (typeof scope !== 'string') {
                throw new ApexDocError(ApexDocError.ONLY_STRINGS('scope'));
            }

            let foundScope = false;
            scope = scope.toLowerCase().trim();
            ApexDoc.SCOPES.forEach(s => {
                if (s.toLowerCase() === scope) {
                    registeredScopes.push(s.toLowerCase());
                    foundScope = true;
                }
            });

            if (!foundScope) {
                throw new ApexDocError(ApexDocError.SCOPE_ENTRY_INVALID(scope));
            }
        });

        this.config.scope = registeredScopes;
    }

    private source() {
        this.config.source = this.config.source.map(src => ({
            path: ValidatorEngine.directory(src.path, 'source.path'),
            sourceUrl: ValidatorEngine.sourceUrl(src.sourceUrl)
        }));
    }
    // #endregion

    // #region Static ValidatorEngines
    public static port(port: number): number {
        this.typeGuard('number', port, 'port');
        // only allows integers between 0-65535 as port numbers
        if (!/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(String(port))) {
            throw new ApexDocError(ApexDocError.INVALID_PORT(port));
        }

        return port;
    }
    // #endregion

    // #region Static Helpers
    private static directory(path: string, arg: string, extension?: string): string {
        this.typeGuard('string', path, arg);
        // blank directory's can be ignored as default for non-required
        // arguments. Source directory will always be populated by this point.
        path = Utils.resolveWorkspaceFolder(path);
        if (path === '' || existsSync(path)) {
            if (path && extension && !path.endsWith(extension)) {
                throw new ApexDocError(ApexDocError.INVALID_EXTENSION(arg, path, extension));
            }
            return path;
        } else {
            throw new ApexDocError(ApexDocError.INVALID_DIRECTORY(arg, path));
        }
    }

    private static sourceUrl(str: Option<string>): Option<string> {
        if (!str) {
            return undefined;
        }

        this.typeGuard('string', str, 'sourceUrl');
        if (Utils.isURL(str)) {
            return str.trim();
        } else {
            throw new ApexDocError(ApexDocError.INVALID_SOURCE_URL(str));
        }
    }

    private static stringArray(arr: string[], argName: string): string[] {
        this.typeGuard('array', arr, argName);
        arr.forEach(item => {
            if (typeof item !== 'string') {
                throw new ApexDocError(ApexDocError.ONLY_STRINGS(argName));
            }
        });

        return arr;
    }

    private static typeGuard<T>(type: string, value: T, arg: string): boolean {
        if ((type === 'array' && Array.isArray(value)) || typeof value === type) {
            return true;
        } else {
            throw new ApexDocError(ApexDocError.INVALID_TYPE(arg, type));
        }
    }
    // #endregion
}

export default ValidatorEngine;
