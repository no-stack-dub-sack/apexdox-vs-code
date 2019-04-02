import * as express from 'express';
import * as vscode from 'vscode';
import { Server } from 'http';
const open = require('open');

let server: Server;

export const createDocServer = async (targetDirectory: string, docsTitle: string) => {
    const app = express();
    const port = 8080;

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