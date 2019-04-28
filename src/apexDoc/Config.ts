import ApexDoc from './ApexDoc';
import Guards from '../utils/Guards';
import Utils, { Option } from '../utils/Utils';
import { existsSync } from 'fs';
import { EXTENSION } from '../extension';
import { resolve } from 'path';
import { workspace, WorkspaceFolder } from 'vscode';

export interface ISourceEntry {
    path: string;
    sourceUrl?: string;
}

export interface IApexDocConfig {
	source: ISourceEntry[];
	targetDirectory: string;
	includes: string[];
	excludes: string[];
	homePagePath: string;
	bannerPagePath: string;
	scope: string[];
	title: string;
	showTOCSnippets: boolean;
	sortOrder: string;
    cleanDir: boolean;
	assets: string[];
    port: number;
}

class Config implements IApexDocConfig {
    public source: ISourceEntry[];
    public includes: string[];
    public excludes: string[];
    public targetDirectory: string;
    public homePagePath: string;
    public bannerPagePath: string;
    public scope: string[];
    public title: string;
    public showTOCSnippets: boolean;
    public sortOrder: string;
    public cleanDir: boolean;
    public assets: string[];
    public port: number;

    public constructor() {
        // this should be safe to cast as not-undefined.
        // If running this tool, workspace folders should always exist.
        const projectRoot = (<WorkspaceFolder[]>workspace.workspaceFolders)[0].uri.fsPath;

        // establish defaults
        this.source = [{ path: this.getDefaultDir(projectRoot) }];
        this.targetDirectory = resolve(projectRoot, 'apex-documentation');

        this.port = 8080;
        this.includes = [];
        this.excludes = [];
        this.assets = [];
        this.cleanDir = false;
        this.homePagePath = '';
        this.bannerPagePath = '';
        this.scope = ApexDoc.SCOPES;
        this.showTOCSnippets = true;
        this.title = 'Apex Documentation';
        this.sortOrder = ApexDoc.ORDER_ALPHA;
    }

    /**
     * Get the default source directory based on the type of project.
     *
     * @param projectRoot The workspace's root folder.
     */
    private getDefaultDir(projectRoot: string): string {
        return !this.isDX(projectRoot)
            ? resolve(projectRoot, 'src', 'classes')
            : resolve(projectRoot, 'force-app', 'main', 'default', 'classes');
    }

    /**
     * Determine with reasonable certainty whether this is a DX project or not.
     * This will help us determine what the default source directory should be.
     *
     * @param projectRoot The workspace's root folder.
     */
    private isDX(projectRoot: string): boolean {
        if (
            existsSync(resolve(projectRoot, 'force-app')) &&
            !existsSync(resolve(projectRoot, 'src'))
            ) {
            return true;
        }

        return false;
    }

    /**
     * Fetch users config settings.
     */
    public static getConfig(): IApexDocConfig {
        return this.merge(
            workspace.getConfiguration(EXTENSION).get<IApexDocConfig>('config')
        );
    }

    /**
     * Merge user settings with extension defaults.
     * @param userConfig The `IApexDocConfig` instance fetched from the user's settings.json file.
     */
    private static merge(userConfig: Option<IApexDocConfig>): IApexDocConfig {
        const defaults = new Config();

        if (!userConfig) {
            return defaults;
        }

        return {
            ...defaults,
            ...userConfig,
            source: !userConfig.source
                ? defaults.source
                : userConfig.source,
            targetDirectory: !userConfig.targetDirectory
                ? defaults.targetDirectory
                : userConfig.targetDirectory
        };
    }

    /**
     * Provide additional type checking and defaults where VSCode may not be able to
     * provide the defaults we need (also, vscode did not seem to provide the setting
     * default during development, so this felt like the safest bet).
     *
     * @param config An instance of `IApexDocConfig`.
     */
    public static validateConfig(config: IApexDocConfig): void {
        // misc. strings
        config.title = Guards.title(config.title);
        config.sortOrder = Guards.sortOrder(config.sortOrder);

        // arrays
        config.scope = Guards.scope(config.scope);
        config.includes = Guards.stringArray(config.includes, 'includes');
        config.excludes = Guards.stringArray(config.excludes, 'excludes');
        config.assets = Guards.stringArray(config.assets, 'assets').map(path => Utils.resolveWorkspaceFolder(path));

        // booleans
        config.cleanDir = Guards.boolGuard(config.cleanDir, false);
        config.showTOCSnippets = Guards.boolGuard(config.showTOCSnippets, true);

        // directories: don't you wish TypeScript had a |> operator!
        config.targetDirectory = this.resolveDirectory(config.targetDirectory);
        config.homePagePath = this.resolveDirectory(config.homePagePath, 'homePagePath');
        config.bannerPagePath = this.resolveDirectory(config.bannerPagePath, 'bannerPagePath');

        config.source = config.source.map(src => ({
            path: this.resolveDirectory(src.path, 'source.path'),
            sourceUrl: Guards.sourceUrl(src.sourceUrl)
        }));
    }

    /**
     * A utility function to wrap the composition of resolve and guard calls.
     * Not super necessary, but keeps things neater up above.
     *
     * @param path The directory to attempt to resolve
     * @param param The setting name for this path. e.g. 'homePagePath'
     */
    private static resolveDirectory(path: string, param?: string): string {
        if (param) {
            return Guards.directory(Utils.resolveWorkspaceFolder(path), param);
        } else {
            return Guards.targetDirectory(Utils.resolveWorkspaceFolder(path));
        }
    }
}

export default Config;