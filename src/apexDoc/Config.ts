import ApexDoc from './ApexDoc';
import Guards from '../utils/Guards';
import { EXTENSION } from '../extension';
import { resolve } from 'path';
import { workspace } from 'vscode';

export interface IApexDocConfig {
	sourceDirectory: string;
	targetDirectory: string;
	includes: string[];
	excludes: string[];
	sourceControlURL: string;
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
    public sourceDirectory: string;
    public includes: string[];
    public excludes: string[];
    public targetDirectory: string;
    public sourceControlURL: string;
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
        let projectRoot = '.';
        // this should never evaluate to false
        if (workspace.workspaceFolders) {
            projectRoot = workspace.workspaceFolders[0].uri.fsPath;
        }

        // establish defaults
        this.sourceDirectory = resolve(projectRoot, 'src', 'classes');
        this.targetDirectory = resolve(projectRoot, 'apex-documentation');

        this.port = 8080;
        this.includes = [];
        this.excludes = [];
        this.assets = [];
        this.cleanDir = false;
        this.homePagePath = '';
        this.bannerPagePath = '';
        this.sourceControlURL = '';
        this.scope = ApexDoc.SCOPES;
        this.showTOCSnippets = true;
        this.title = 'Apex Documentation';
        this.sortOrder = ApexDoc.ORDER_ALPHA;
    }

    public static getConfig(): IApexDocConfig {
        return this.merge(<IApexDocConfig>
            workspace.getConfiguration(EXTENSION).get('config')
        );
    }

    private static merge(userConfig: IApexDocConfig): IApexDocConfig {
        const defaults = new Config();

        return {
            ...defaults,
            ...userConfig,
            sourceDirectory: !userConfig.sourceDirectory
                ? defaults.sourceDirectory
                : userConfig.sourceDirectory,
            targetDirectory: !userConfig.targetDirectory
                ? defaults.targetDirectory
                : userConfig.targetDirectory
        };
    }

    public static validateConfig(config: IApexDocConfig): void {
        // misc. strings
        config.title = Guards.title(config.title);
        config.sortOrder = Guards.sortOrder(config.sortOrder);
        config.sourceControlURL = Guards.sourceControlURL(config.sourceControlURL);

        // arrays
        config.scope = Guards.scope(config.scope);
        config.assets = Guards.stringArray(config.assets, 'assets');
        config.includes = Guards.stringArray(config.includes, 'includes');
        config.excludes = Guards.stringArray(config.excludes, 'excludes');

        // booleans
        config.cleanDir = Guards.boolGuard(config.cleanDir, false);
        config.showTOCSnippets = Guards.boolGuard(config.showTOCSnippets, true);

        // directories
        config.targetDirectory = Guards.targetDirectory(config.targetDirectory);
        config.homePagePath = Guards.directory(config.homePagePath, 'homePagePath');
        config.bannerPagePath = Guards.directory(config.bannerPagePath, 'bannerPagePath');
        config.sourceDirectory = Guards.directory(config.sourceDirectory, 'sourceDirectory');
    }
}

export default Config;