import ApexDox from '../engine/ApexDox';
import ApexDoxError from './ApexDoxError';
import EngineConfig from './models/EngineConfig';
import Utils from './Utils';
import Validator from './Validator';
import { existsSync } from 'fs';
import { IEngineConfig, Option } from '../index';

class ValidatorEngine extends Validator<IEngineConfig> {

    public constructor(config: IEngineConfig) {
        super(config);
        this.validFields = Object.keys(new EngineConfig());
    }

    // #region Engine Field Validators / Instance Methods
    private includes() {
        ValidatorEngine.stringArray(this.config.includes, 'includes');
    }

    private excludes() {
        ValidatorEngine.stringArray(this.config.excludes, 'excludes');
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
            .map(path => Utils.resolveWorkspaceFolder(path).resolvedPath);
    }

    private targetDirectory() {
        const path = this.config.targetDirectory;
        ValidatorEngine.typeGuard('string', path, 'targetDirectory');
        if (path && path.length > 0) {
            this.config.targetDirectory = Utils.resolveWorkspaceFolder(path).resolvedPath;
        } else {
            throw new ApexDoxError(ApexDoxError.INVALID_TARGET_DIRECTORY(path));
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
        if (sortOrder === ApexDox.ORDER_LOGICAL || sortOrder === ApexDox.ORDER_ALPHA) {
            this.config.sortOrder = sortOrder;
        } else {
            throw new ApexDoxError(ApexDoxError.INVALID_SORT_ORDER(sortOrder));
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
            throw new ApexDoxError(ApexDoxError.SCOPE_ENTRIES_MAX);
        }

        if (scopes.length === 0) {
            throw new ApexDoxError(ApexDoxError.SCOPE_ENTRIES_MIN);
        }

        let registeredScopes = new Array<string>();

        scopes.forEach(scope => {
            if (typeof scope !== 'string') {
                throw new ApexDoxError(ApexDoxError.ONLY_STRINGS('scope'));
            }

            let foundScope = false;
            scope = scope.toLowerCase().trim();
            ApexDox.SCOPES.forEach(s => {
                if (s.toLowerCase() === scope) {
                    registeredScopes.push(s.toLowerCase());
                    foundScope = true;
                }
            });

            if (!foundScope) {
                throw new ApexDoxError(ApexDoxError.SCOPE_ENTRY_INVALID(scope));
            }
        });

        this.config.scope = registeredScopes;
    }

    private source() {
        this.config.source = this.config.source.map(src => {
            const { relativePath } = Utils.resolveWorkspaceFolder(src.path);

            return {
                relativePath: relativePath,
                sourceUrl: ValidatorEngine.sourceUrl(src.sourceUrl),
                path: ValidatorEngine.directory(src.path, 'source.path'),
            }
        });
    }
    // #endregion

    // #region Static ValidatorEngines
    public static port(port: number): number {
        this.typeGuard('number', port, 'port');
        // only allows integers between 0-65535 as port numbers
        if (!/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(String(port))) {
            throw new ApexDoxError(ApexDoxError.INVALID_PORT(port));
        }

        return port;
    }
    // #endregion

    // #region Static Helpers
    private static directory(path: string, arg: string, extension?: string): string {
        this.typeGuard('string', path, arg);
        // blank directory's can be ignored as default for non-required
        // arguments. Source directory will always be populated by this point.
        path = Utils.resolveWorkspaceFolder(path).resolvedPath;
        if (path === '' || existsSync(path)) {
            if (path && extension && !path.endsWith(extension)) {
                throw new ApexDoxError(ApexDoxError.INVALID_EXTENSION(arg, path, extension));
            }
            return path;
        } else {
            throw new ApexDoxError(ApexDoxError.INVALID_DIRECTORY(arg, path));
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
            throw new ApexDoxError(ApexDoxError.INVALID_SOURCE_URL(str));
        }
    }

    private static stringArray(arr: string[], argName: string): string[] {
        this.typeGuard('array', arr, argName);
        arr.forEach(item => {
            if (typeof item !== 'string') {
                throw new ApexDoxError(ApexDoxError.ONLY_STRINGS(argName));
            }
        });

        return arr;
    }

    private static typeGuard<T>(type: string, value: T, arg: string): boolean {
        if ((type === 'array' && Array.isArray(value)) || typeof value === type) {
            return true;
        } else {
            throw new ApexDoxError(ApexDoxError.INVALID_TYPE(arg, type));
        }
    }
    // #endregion
}

export default ValidatorEngine;
