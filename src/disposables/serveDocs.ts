import Configurator from '../apexDoc/Config';
import createDocServer from '../apexDoc/server';
import Guards from '../utils/Guards';
import { commands, window } from 'vscode';
import { IApexDocConfig } from '../apexDoc/Config';

const COMMAND = 'apexDoc2.serveDocs';

export default function() {
    return commands.registerCommand(COMMAND, () => {
        try {
            const config: IApexDocConfig = Configurator.getConfig();
            createDocServer(config.targetDirectory, config.title, Guards.port(config.port));
        } catch (e) {
            console.log(e);
            window.showErrorMessage(e.message);
        }
    });
}