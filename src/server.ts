import * as express from 'express';
import * as vscode from 'vscode';
import { Server } from 'http';
import { existsSync } from 'fs';
const open = require('open');

let server: Server;
const success = (title: string) => `${title} opened in default browser!`;
const error = (dir: string) => `No index.html file to serve in directory: ${dir}. Did you run ApexDoc2 first?`;

export const createDocServer = async (targetDirectory: string, docsTitle: string, port: number) => {
    if (existsSync(targetDirectory + '/index.html')) {
        const app = express();

        app.use(express.static(targetDirectory));
        server = app.listen(port);

        await open(`http://localhost:${port}/index.html`);
        vscode.window.showInformationMessage(success(docsTitle));
    } else {
        vscode.window.showErrorMessage(error(targetDirectory));
    }
};

export const closeServer = () => {
    if (server && server.listening) {
        server.close();
    }
};