import * as vscode from 'vscode';
import disposables, { ApexDoc2Command } from './disposables/index';
import { closeServer } from './apexDoc/server';

export const EXTENSION = 'apexdoc2';

export function activate(context: vscode.ExtensionContext) {
	disposables.forEach((cmd: ApexDoc2Command) => {
		context.subscriptions.push(cmd(context));
	});
}

export function deactivate() {
	closeServer();
}
