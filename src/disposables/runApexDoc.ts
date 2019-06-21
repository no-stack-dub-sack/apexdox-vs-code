import ApexDoc from '../engine/ApexDoc';
import Settings, { Feature } from '../common/Settings';
import {
    commands,
    Disposable,
    ExtensionContext,
    window
    } from 'vscode';
import { IApexDocConfig } from '../common/models/settings';

const COMMAND = 'apexDoc2.runApexDoc';

export default function(context: ExtensionContext): Disposable {
    return commands.registerCommand(COMMAND, () => {
        try {
            const config = Settings.getConfig<IApexDocConfig>(Feature.ENGINE);
            ApexDoc.extensionRoot = context.extensionPath;
            ApexDoc.runApexDoc(config);
        } catch (e) {
            console.log(e);
            window.showErrorMessage(e.message);
        }
    });
}