import * as assert from 'assert';
import cheerio from 'cheerio';
import { basename } from 'path';
import { except, last, only } from '../common/Utils';
import { ITestFile } from './extension.test';

const createEngineTests = (files: ITestFile[]) => {

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
        const indexHtml = last(only(files, 'index.html', 'name'));
        const $ = cheerio.load(indexHtml.snapshot);

        const title = $('title').text();
        assert.equal(title, 'My Test Docs', `Unexpected title ${title}`);
    });

    test('Should have a menu item for each file', function() {
        const indexHtml = last(only(files, 'index.html', 'name'));
        const $ = cheerio.load(indexHtml.snapshot);

        const expectedFiles = except(files, 'index.html', 'name').map(f => basename(f.name, '.html'));

        const offendingMenuItems = $('li.navItem').toArray()
            .map(el => $(el).text().trim())
            .filter(item => expectedFiles.indexOf(item) === -1);

        assert.equal(offendingMenuItems.length, 0, `Unexpected menu items found: ${offendingMenuItems.join(', ')}`);
    });

    test('Should correctly parse enum values (inner)', function() {
        const testFile = last(only(files, 'TEST_SlackOpportunityPublisher.html', 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const monthEnumValues = $($('td.enumValues').toArray()[0]).text().split(',').map(m => m.trim());
        const months = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
        assert.deepEqual(monthEnumValues, months, 'Enum values do not match.');
    });

    test('Should correctly parse enum values (.cls)', function() {
        const testFile = last(only(files, 'TEST_Status.html', 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const statusEnumValues = $('td.enumValues').toArray().map(el => $(el).text().trim());
        const satuses = ['QUEUED','PROCESSING','COMPLETE','COMPLETE_WITH_ERRORS','FAILED'];
        assert.deepEqual(statusEnumValues, satuses, 'Enum values do not match.');
    });

    test('Should have param for every given "@param" tag', function() {
        const testFile = last(only(files, 'TEST_SampleDataController.html', 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const params = $('.paramName').toArray().map(el => $(el).text().trim());
        const expectedParams = ['param1', 'param2', 'param3'];
        assert.deepEqual(params, expectedParams, 'Params do not match.');
    });

    test('Should have param description for every given "@param" tag', function() {
        const testFile = last(only(files, 'TEST_SampleDataController.html', 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const descriptions = $('.paramDescription').toArray().map(el => $(el).text().trim());
        const expectedDescriptions = ['param description 1', 'param description 2', 'param description 3'];
        assert.deepEqual(descriptions, expectedDescriptions, 'Param descriptions do not match.');
    });

    test('Should correctly link overloaded methods', function() {
        const testFile = last(only(files, 'TEST_Gotchas.html', 'name'));
        let $ = cheerio.load(testFile.snapshot);

        const hrefs = $('a.methodTOCEntry').toArray()
            .filter(el => $(el).text().trim() === 'getInt')
            .map(el => $(el).attr('href'));

        const ids = $('h2.methodHeader').toArray()
            .filter(el => $(el).text().trim() === 'getInt')
            .map(el => $(el).attr('id'));

        const expectedIds = ['TEST_Gotchas.getInt', 'TEST_Gotchas.getInt_1', 'TEST_Gotchas.getInt_2', 'TEST_Gotchas.getInt_3' ];
        const expectedHrefs = ['#TEST_Gotchas.getInt', '#TEST_Gotchas.getInt_1', '#TEST_Gotchas.getInt_2', '#TEST_Gotchas.getInt_3' ];

        assert.deepEqual(hrefs, expectedHrefs, 'Method overloads are not correctly linked to their TOC entries.');
        assert.deepEqual(ids, expectedIds, 'Method overloads are not correctly linked to their TOC entries.');
    });

    test('Should capture tag values over multiple lines', function() {
        const testFile = last(only(files, 'TEST_Gotchas.html', 'name'));
        let $ = cheerio.load(testFile.snapshot);

        const param = $('.paramDescription').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines.');
        assert.equal($(param).text(), 'Works over multiple lines.', 'param description value does not match expected multi-line value.');

        const description = $('.methodDescription').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines.');
        assert.equal($(description).text(), 'Works over multiple lines.', 'description value does not match expected multi-line value');

        const author = $('.methodSubDescription').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (author).');
        assert.equal($(author).text(), 'Works over multiple lines (author).', 'author value does not match expected multi-line value');

        const since = $('.methodSubDescription').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (since).');
        assert.equal($(since).text(), 'Works over multiple lines (since).', 'since value does not match expected multi-line value');

        const returns = $('.methodSubDescription').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (returns).');
        assert.equal($(returns).text(), 'Works over multiple lines (returns).', 'returns value does not match expected multi-line value');

        const exception = $('.methodSubDescription').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (exception).');
        assert.equal($(exception).text(), 'Works over multiple lines (exception).', 'exception value does not match expected multi-line value');

        const deprecated = $('.methodSubDescription').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (deprecated).');
        assert.equal($(deprecated).text(), 'Works over multiple lines (deprecated).', 'deprecated value does not match expected multi-line value');
    });

    // test('Should copy user assets defined by "assets" setting', function() {
        
    // });
};

export default createEngineTests;