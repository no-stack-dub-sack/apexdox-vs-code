import ApexDoc from './ApexDoc';
import { ApexDoc2Config } from '../extension';
import * as vscode from 'vscode';

class Config implements ApexDoc2Config {
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

    public constructor() {
        let projectRoot = '.';
        // this should never evaluate to false
        if (vscode.workspace.workspaceFolders) {
            projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }

        // establish defaults
        this.sourceDirectory = projectRoot + '\\src\\classes';
        this.targetDirectory = projectRoot + '\\documentation\\apex';

        this.includes = [];
        this.excludes = [];
        this.sourceControlURL = '';
        this.homePagePath = '';
        this.bannerPagePath = '';
        this.scope = ApexDoc.SCOPES;
        this.title = 'Apex Documentation';
        this.showTOCSnippets = true;
        this.sortOrder = ApexDoc.ORDER_ALPHA;
    }

    public static merge(userConfig: ApexDoc2Config) {
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