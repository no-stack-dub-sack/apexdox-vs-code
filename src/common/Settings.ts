import ApexDoc from '../engine/ApexDoc';
import ApexDocError from './ApexDocError';
import Guards from './Guards';
import Utils, { Option } from './Utils';
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
    pages: string[];
    port: number;
}

export interface IDocBlockConfig {
	alignItems: boolean;
	omitDescriptionTag: boolean;
	spacious: boolean;
}

export enum Feature {
    ENGINE,
    DOC_BLOCK
}

class Settings {

    /**
     * Fetch user's config settings and set defaults where needed.
     */
    public static getConfig<T extends IApexDocConfig | IDocBlockConfig>(type: Feature): T {
        if (type === Feature.ENGINE) {
            return <T>this.setEngineDefaults(<IApexDocConfig>
                workspace.getConfiguration(EXTENSION).get<IApexDocConfig>('engine')
            );
        }

        else if (type === Feature.DOC_BLOCK) {
            return <T>workspace.getConfiguration(EXTENSION).get<IDocBlockConfig>('docBlock');
        }

        throw new ApexDocError('Unrecognized Config Section!');
    }

    /**
     * Source and Target Directory settings are dynamic and determined at runtime. If user
     * omits these settings, overwrite the default empty string with correct default settings.
     * @param config The `IApexDocConfig` instance fetched from the user's settings.json file.
     */
    private static setEngineDefaults(config: IApexDocConfig): IApexDocConfig {
        // this should be safe to cast as not-undefined.
        // If running this tool, workspace folders should always exist.
        const projectRoot = (<WorkspaceFolder[]>workspace.workspaceFolders)[0].uri.fsPath;

        // establish defaults
        const defaultSource = [{ path: this.getDefaultDir(projectRoot) }];
        const defaultTarget = resolve(projectRoot, 'apex-documentation');

        return {
            ...config,
            // if config.source has only one entry and path is '', its prob our default, even if it's
            // not, it's an invalid configuration, so replace with our defaultSource variable
            source: config.source.length === 1 && !config.source[0].path ? defaultSource : config.source,
            targetDirectory: !config.targetDirectory ? defaultTarget : config.targetDirectory
        };
    }

    /**
     * Get the default source directory based on the type of project.
     *
     * @param projectRoot The workspace's root folder.
     */
    private static getDefaultDir(projectRoot: string): string {
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
    private static isDX(projectRoot: string): boolean {
        if (
            existsSync(resolve(projectRoot, 'force-app')) &&
            !existsSync(resolve(projectRoot, 'src'))
            ) {
            return true;
        }

        return false;
    }

    /**
     * Provide additional type checking and defaults where VSCode may not be able to
     * provide the defaults we need (also, vscode did not seem to provide the setting
     * default during development, so this felt like the safest bet).
     *
     * @param config An instance of `IApexDocConfig`.
     */
    public static validateEngineConfig(config: IApexDocConfig): void {
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
        config.homePagePath = this.resolveDirectory(config.homePagePath, 'homePagePath', '.html');
        config.bannerPagePath = this.resolveDirectory(config.bannerPagePath, 'bannerPagePath', '.html');
        config.pages = config.pages.map(pagePath => this.resolveDirectory(pagePath, 'pages', '.html'));

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
    private static resolveDirectory(path: string, param?: string, extension?: string): string {
        if (param) {
            return Guards.directory(Utils.resolveWorkspaceFolder(path), param, extension);
        } else {
            return Guards.targetDirectory(Utils.resolveWorkspaceFolder(path));
        }
    }
}

export default Settings;