import * as vscode from 'vscode';
import { exec } from 'child_process';

// define ApexDoc2 Config object
export interface ApexDoc2Config {
	sourceDirectory: string;
	includes: string[],
	excludes: string[],
	targetDirectory: string;
	sourceControlURL: string;
	homePagePath: string;
	bannerPagePath: string;
	scope: string[];
	title: string;
	showTOCSnippets: boolean;
	sortOrder: string;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.runApexDoc2', () => {
		const config: ApexDoc2Config = getApexDocConfig();
		const command = buildCommand(config, context.extensionPath);

		exec(command, error => {
			if (error) {
				vscode.window.showErrorMessage('ApexDoc2 Failed!\n' + error);
			} else {
				vscode.window.showInformationMessage('ApexDoc2 Complete!');
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }


function buildCommand(config: ApexDoc2Config, extensionRoot: string): string {
	const apexDoc2 = extensionRoot + '\\assets\\ApexDoc2-1.0.0.jar';
	const sourceControlURL = config.sourceControlURL;
	const homePagePath = config.homePagePath;
	const bannerPagePath = config.bannerPagePath;
	const includes = config.includes || [];
	const excludes = config.excludes || [];

	const command = `
		java -jar ${apexDoc2}
		-s "${config.sourceDirectory}"
		-t "${config.targetDirectory}"
		-p "${config.scope.join(',')}"
		-d "${config.title}"
		-c ${config.showTOCSnippets}
		-o ${config.sortOrder}
		${includes.length > 0 ? '-i "' + includes.join(',') + '"' : ''}
		${excludes.length > 0 ? '-e "' + excludes.join(',') + '"' : ''}
		${sourceControlURL ? '-u "' + sourceControlURL + '"' : ''}
		${homePagePath ? '-h "' + homePagePath + '"' : ''}
		${bannerPagePath ? '-b "' + bannerPagePath + '"' : ''}
  `;

	return command.replace(/\s+/g, ' ').trim();
}

function getApexDocConfig(): ApexDoc2Config {
	// Clone object when fetching config to avoid 'read only' field error when trying to overwrite defaults.
	const config: ApexDoc2Config = { ...vscode.workspace.getConfiguration('apexdoc2')['config'] };

	let projectRoot = '.';
	if (vscode.workspace.workspaceFolders) {
		projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
	}

	// if user has not overridden defaults defined in package.json
	// or if has just not added these required fields, add them here
	if (config.sourceDirectory === '') {
		config.sourceDirectory = projectRoot + '\\src\\classes';
	}

	if (config.targetDirectory === '') {
		config.targetDirectory = projectRoot + '\\documentation\\apex';
	}

	return config;
}