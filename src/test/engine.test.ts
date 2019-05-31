import * as assert from 'assert';
import cheerio from 'cheerio';
import LineReader from '../common/LineReader';
import { basename, resolve } from 'path';
import { except, last, only } from '../common/Utils';
import { ITestFile } from './extension.test';

const targetDir = resolve(__dirname, './docs');

const createEngineTests = (files: ITestFile[]) => {
    let $: CheerioStatic;

    suiteSetup(() => {
        const indexHtml = last(files.filter(only('name', 'index.html')));
        $ = cheerio.load(indexHtml.snapshot);
    });

    test('ApexDoc2 created docs', function() {
        assert.notEqual(files.length, 0);
    });

    test('Should only include files included by "includes" setting', function() {
        files.forEach(file => {
            if (file.name !== 'index.html') {
                assert.ok(
                    file.name === 'IncludeOne.html' ||
                    file.name === 'IncludeTwo.html' ||
                    file.name.startsWith('TEST_'),
                    `Unexpected files in target directory: ${file.name}`
                );
            }
        });
    });

    test('Should exclude files excluded by "excludes" setting', function() {
        files.forEach(file => {
            if (file.name !== 'index.html') {
                assert.ok(
                    !file.name.endsWith('Exclude.html') &&
                    !file.name.endsWith('Test.html') &&
                    file.name !== 'TEST_ExcuseMe.html',
                    `Unexpected files in target directory: ${file.name}`
                );
            }
        });
    });

    test('Should only be HTML files in target directory', function() {
        files.forEach(file => {
            assert.ok(file.name.endsWith('.html'), `Unexpected file extension found in target directory: ${file.name}`);
        });
    });

    test('Should correctly set title from config', function() {
        const title = $('title').text();

        assert.equal(title, 'My Test Docs', `Unexpected title ${title}`);
    });

    test('Should have a menu item for each file', function() {
        const menuItems = $('li.navItem')
            .toArray()
            .map(el => $(el).text().trim())
            .sort((a, b) => a.localeCompare(b));

        const expectedFiles = files
            .filter(except('name', 'index.html'))
            .map(f => basename(f.name, '.html'))
            .sort((a, b) => a.localeCompare(b));

        assert.deepEqual(menuItems, expectedFiles);
    });

    test('Should correctly parse enum values (inner)', function() {
        const testFile = last(files.filter(only('name', 'TEST_SlackOpportunityPublisher.html')));
        $ = cheerio.load(testFile.snapshot);
        const monthEnumValues = $($('td.enumValues').toArray()[0]).text().split(',').map(m => m.trim());
        const months = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
        assert.deepEqual(monthEnumValues, months);
    });

    // test('Should correctly parse enum values (.cls)', function() {
        
    // });

    // test('Should correctly parse method parameters', function() {
        
    // });

    // test('Should correctly link overloaded methods', function() {
        
    // });
};

export default createEngineTests;