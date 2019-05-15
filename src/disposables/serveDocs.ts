import createDocServer from '../engine/server';
import Guards from '../common/Guards';
import Settings, { Feature } from '../common/Settings';
import { commands, window } from 'vscode';
import { IApexDocConfig } from '../common/Settings';

const COMMAND = 'apexDoc2.serveDocs';

export default function() {
    return commands.registerCommand(COMMAND, () => {
        try {
            const config = Settings.getConfig<IApexDocConfig>(Feature.ENGINE);
            createDocServer(config.targetDirectory, config.title, Guards.port(config.port));
        } catch (e) {
            console.log(e);
            window.showErrorMessage(e.message);
        }
    });
}