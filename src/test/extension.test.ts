import * as vscode from 'vscode';
import createEngineTests from './engine.test';
import createSnapshotTests from './snapshot.test';
import LineReader from '../common/LineReader';
import { except } from '../common/ArrayUtils';
import { readdirSync } from 'fs';
import { resolve as resolvePath } from 'path';

export interface ITestFile {
    reader: LineReader;
    name: string;
    snapshot: string;
}

export const targetDir = resolvePath(__dirname, '../../src/test/test-proj/docs');
const runSnapshotTests = true; // easily turn off snapshot tests if desired during dev
const runEngineTests = true; // easily turn off engine tests if desired during dev

const runApexDoc = () => {
    return new Promise(resolve => {
        resolve(vscode.commands.executeCommand('apexDoc2.runApexDoc'));
    }).then(() => {
        const fileNames = readdirSync(targetDir);
        const files: ITestFile[] = except(fileNames, ['assets', 'Page.html']).map(fileName => {
            const reader = new LineReader(resolvePath(targetDir, fileName));
            return {
                reader,
                name: fileName,
                snapshot: <string>reader.toString(false, '\n')
            };
        });

        return files;
    });
};

const createMochaTestSuite = async () => {
    const files = await runApexDoc();

    suite("ApexDoc2 Extension Tests", function () {

        if (runEngineTests) {
            suite('Documentation Engine Tests', function() {
                createEngineTests(files);
            });
        }

        if (runSnapshotTests) {
            suite('Snapshot Tests', function() {
                createSnapshotTests(files);
            });
        }
    });

    run();
};

createMochaTestSuite();
