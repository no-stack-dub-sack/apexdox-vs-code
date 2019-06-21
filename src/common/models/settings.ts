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
	scope: string[];
	title: string;
	subtitle: string;
	showTOCSnippets: boolean;
	sortOrder: string;
    cleanDir: boolean;
    assets: string[];
    pages: string[];
    port: number;
}

export class ApexDocConfig implements IApexDocConfig {
	public source = [];
	public targetDirectory = '';
	public includes = [];
	public excludes = [];
	public homePagePath = '';
	public scope = [
        'global',
        'public',
        'protected',
        'private',
        'testMethod',
        'webService'
    ];
	public title = 'Apex Documentation';
	public subtitle = 'Powered by <a target="_blank" rel="noopener noreferrer" href="https://github.com/no-stack-dub-sack/apexdoc2-vscode">ApexDoc2</a>';
	public showTOCSnippets = true;
	public sortOrder = 'alpha';
    public cleanDir = false;
    public assets = [];
    public pages = [];
    public port = 8080;
}

export interface IDocBlockConfig {
	alignItems: boolean;
	omitDescriptionTag: boolean;
	spacious: boolean;
}

export class DocBlockConfig implements IDocBlockConfig {
	public alignItems = false;
	public omitDescriptionTag = true;
	public spacious = false;
}

export interface IApexDocRC {
	engine: IApexDocConfig;
	docBlock: IDocBlockConfig;
}
