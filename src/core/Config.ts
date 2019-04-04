import * as vscode from 'vscode';
import ApexDoc from './ApexDoc';

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
        if (vscode.workspace.workspaceFolders) {
            projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }

        // establish defaults
        this.sourceDirectory = projectRoot + '\\src\\classes';
        this.targetDirectory = projectRoot + '\\documentation\\apex';

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

    public static merge(userConfig: IApexDocConfig): IApexDocConfig {
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
}

export default Config;