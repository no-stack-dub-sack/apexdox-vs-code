import _static from 'node-static';
import http, { Server } from 'http';
import open from 'open';
import Utils from '../common/Utils';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { window } from 'vscode';

let server: Server;

const closing = () => `ApexDox VS Code server shutting down...`;
const success = (title: string) => `${title} opened in default browser!`;
const listening = (port: number) => `ApexDox VS Code server listening on port ${port}`;
const error = (dir: string) =>  `No index.html file to serve in directory: ${dir}. Did you run 'ApexDox: Run' first?`;

export default async function createDocServer(targetDirectory: string, docsTitle: string, port: number) {
    if (existsSync(resolve(targetDirectory, 'index.html'))) {

        const file = new _static.Server(targetDirectory, { cache: false }); // do not cache files
        closeServer() && (server = http.createServer((request, response) => {
            request.addListener('end', () => {
                file.serve(request, response);
            }).resume();
        }).listen(port));

        console.info(listening(port));
        await open(`http://localhost:${port}/index.html`);
        window.setStatusBarMessage(success(docsTitle));
    } else {
        window.showErrorMessage(error(targetDirectory));
    }
}

export function closeServer() {
    if (server && server.listening) {
        console.info(closing());
        server.close();
    }

    return true;
}
