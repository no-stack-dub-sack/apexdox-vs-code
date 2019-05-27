import * as assert from 'assert';
import ApexDoc from '../engine/ApexDoc';
import fs from 'fs';
import LineReader from '../engine/LineReader';
import path from 'path';
import vscode from 'vscode';
import { IApexDocConfig } from '../common/Settings';
import { Option } from '../common/Utils';

const feature1 = path.resolve(__dirname, './apex/feature1');
const feature2 = path.resolve(__dirname, './apex/feature2');
const targetDir = path.resolve(__dirname, './snapshot/result');
const referenceDir = path.resolve(__dirname, './snapshot/reference');

const testConfig: IApexDocConfig = {
	source: [{
        path: feature1,
        sourceUrl: 'https://somefakeurl.com'
    },{
        path: feature2,
        sourceUrl: 'https://somefakeurl.com'
    }],
	targetDirectory: targetDir,
	includes: [
        'IncludeTwo.cls',
        'IncludeOne.cls',
        'TEST_*'
    ],
	excludes: [
        '*Exclude.cls',
        '*Test.cls',
        'TEST_ExcuseMe.cls'
    ],
	homePagePath: '',
	bannerPagePath: '',
	scope: [
        'public',
        'private',
        'protected',
        'global'
    ],
	title: 'My Test Docs',
	showTOCSnippets: true,
	sortOrder: 'alpha',
    cleanDir: true,
    assets: [],
    pages: [],
    port: 8080
};

let files: string[];
suite("ApexDoc2 Extension Tests", function () {

    suite('Documentation Engine Tests', function() {
        setup(function() {
            return new Promise((resolve) => {
                // set extension context and run ApexDoc
                ApexDoc.extensionRoot = path.resolve(__dirname, '../');
                ApexDoc.runApexDoc(testConfig);
                // collect output files to assert with
                files = fs.readdirSync(targetDir);
                resolve();
            });
        });

        test("ApexDoc2 created docs", function() {
            assert.notEqual(files.length, 0);
        });

        test("ApexDoc2 included only files included by 'includes' setting", function() {
            files.forEach(fileOrDirName => {
                if (fileOrDirName !== 'assets' && fileOrDirName !== 'index.html') {
                    assert.ok(
                        fileOrDirName === 'IncludeOne.html' ||
                        fileOrDirName === 'IncludeTwo.html' ||
                        fileOrDirName.startsWith('TEST_'),
                        `Unexpected files in target directory: ${fileOrDirName}`
                    );
                }
            });
        });

        test("ApexDoc2 excluded files excluded by 'excludes' setting", function() {
            files.forEach(fileOrDirName => {
                if (fileOrDirName !== 'assets' && fileOrDirName !== 'index.html') {
                    assert.ok(
                        !fileOrDirName.endsWith('Exclude.html') &&
                        !fileOrDirName.endsWith('Test.html') &&
                        fileOrDirName !== 'TEST_ExcuseMe.html',
                        `Unexpected files in target directory: ${fileOrDirName}`
                    );
                }
            });
        });

        test("Snapshot results match references", function() {
            files.forEach(fileOrDirName => {
                if (fileOrDirName !== 'assets') {
                    let fileSnapshot = new LineReader(path.resolve(targetDir, fileOrDirName)).toString();
                    let fileReference = new LineReader(path.resolve(referenceDir, fileOrDirName)).toString();
                    assert.equal(fileSnapshot, fileReference, `Snapshot does not match reference: ${fileOrDirName}`);
                }
            });
        });
    });
});