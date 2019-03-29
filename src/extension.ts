import * as vscode from 'vscode';
import ApexDoc from './core/ApexDoc';
import Config from './core/Config';

// define ApexDoc2 Config object
export interface ApexDoc2Config {
	sourceDirectory: string;
	targetDirectory: string;
	includes?: string[];
	excludes?: string[];
	sourceControlURL?: string;
	homePagePath?: string;
	bannerPagePath?: string;
	scope?: string[];
	title?: string;
	showTOCSnippets?: boolean;
	sortOrder?: string;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.runApexDoc2', () => {
		const config: Config = getApexDocConfig();
		if (true) {
			console.log('cool! But where do you go!?');
		}

		try {
			ApexDoc.runApexDoc(config);
		} catch (e) {
			vscode.window.showErrorMessage(e.message);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function getApexDocConfig(): Config {
	// Clone object when fetching config to avoid 'read only' field error when trying to overwrite defaults.
	const config: ApexDoc2Config = { ...vscode.workspace.getConfiguration('apexdoc2')['config'] };
	return Config.merge(config);
}