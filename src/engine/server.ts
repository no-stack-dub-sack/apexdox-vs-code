import express from 'express';
import open from 'open';
import Utils from '../common/Utils';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { Server } from 'http';
import { window } from 'vscode';

let server: Server;

const success = (title: string) =>
    `${title} opened in default browser!`;

const error = (dir: string) =>
    `No index.html file to serve in directory: ${dir}. Did you run ApexDoc2 first?`;

export default async function createDocServer(targetDirectory: string, docsTitle: string, port: number) {
    const resolvedTarget = Utils.resolveWorkspaceFolder(targetDirectory);

    if (existsSync(resolve(resolvedTarget, 'index.html'))) {
        closeServer(); // close existing connection first
        const app = express();

        app.use(express.static(resolvedTarget));
        server = app.listen(port);

        await open(`http://localhost:${port}/index.html`);
        window.showInformationMessage(success(docsTitle));
    } else {
        window.showErrorMessage(error(resolvedTarget));
    }
}

export function closeServer() {
    if (server && server.listening) {
        server.close();
    }
}