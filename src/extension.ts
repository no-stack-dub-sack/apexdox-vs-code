import * as vscode from 'vscode';
import disposables from './disposables';
import { closeServer } from './server';

export const EXTENSION = 'apexdoc2';

export function activate(context: vscode.ExtensionContext) {
	const commands = Object.values(disposables);
	commands.forEach((func: (context: vscode.ExtensionContext) => vscode.Disposable) => {
		context.subscriptions.push(func(context));
	});
}

export function deactivate() {
	closeServer();
}
