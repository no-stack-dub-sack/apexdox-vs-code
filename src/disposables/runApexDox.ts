import ApexDox from '../engine/ApexDox';
import Settings, { Feature } from '../common/Settings';
import {
    commands,
    Disposable,
    ExtensionContext,
    window
    } from 'vscode';
import { IEngineConfig } from '..';

const COMMAND = 'apexdox.run';

export default function(context: ExtensionContext): Disposable {
    return commands.registerCommand(COMMAND, () => {
        try {
            const config = Settings.getConfig<IEngineConfig>(Feature.ENGINE);
            ApexDox.extensionRoot = context.extensionPath;
            ApexDox.run(config);
        } catch (e: any) {
            console.log(e);
            window.showErrorMessage(e.message);
        }
    });
}