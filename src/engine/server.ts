import _static from 'node-static';
import http, { Server } from 'http';
import open from 'open';
import Utils from '../common/Utils';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { window } from 'vscode';

let server: Server;

const closing = () => `ApexDoc2 server shutting down...`;
const success = (title: string) => `${title} opened in default browser!`;
const listening = (port: number) => `ApexDoc2 server listening on port ${port}`;
const error = (dir: string) =>  `No index.html file to serve in directory: ${dir}. Did you run ApexDoc2 first?`;

export default async function createDocServer(targetDirectory: string, docsTitle: string, port: number) {
    const resolvedTarget = Utils.resolveWorkspaceFolder(targetDirectory);
    if (existsSync(resolve(resolvedTarget, 'index.html'))) {
        closeServer();
        const file = new _static.Server(resolvedTarget);
        server = http.createServer((request, response) => {
            request.addListener('end', () => {
                file.serve(request, response);
            }).resume();
        }).listen(port);

        console.info(listening(port));
        await open(`http://localhost:${port}/index.html`);
        window.showInformationMessage(success(docsTitle));
    } else {
        window.showErrorMessage(error(resolvedTarget));
    }
}

export function closeServer() {
    if (server && server.listening) {
        console.info(closing());
        server.close();
    }
}
