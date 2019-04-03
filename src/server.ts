import * as express from 'express';
import * as vscode from 'vscode';
import { Server } from 'http';
import ApexDoc from './core/ApexDoc';
const open = require('open');

let server: Server;

export const createDocServer = async (targetDirectory: string, docsTitle: string, port: number) => {
    const app = express();

    app.use(express.static(targetDirectory));
    server = app.listen(port);

    await open(`http://localhost:${port}/index.html`);
    vscode.window.showInformationMessage(`${docsTitle} opened in default browser!`);
};

export const closeServer = () => {
    if (server && server.listening) {
        server.close();
    }
};