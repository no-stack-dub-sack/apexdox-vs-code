import * as assert from 'assert';
import cheerio from 'cheerio';
import { basename, resolve } from 'path';
import { except, last, only } from '../common/ArrayUtils';
import { existsSync } from 'fs';
import { ITestFile, targetDir } from './extension.test';

const createEngineTests = (files: ITestFile[]) => {

    test('Should create docs', function() {
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
                    file.name !== 'TEST_ExcludeMe.html',
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
        const indexHtml = last(only(files, ['index.html'], 'name'));
        const $ = cheerio.load(indexHtml.snapshot);

        const title = $('title').text();
        assert.equal(title, 'My Test Docs', `Unexpected title ${title}`);
    });

    test('Should have a menu item for each file', function() {
        const indexHtml = last(only(files, ['index.html'], 'name'));
        const $ = cheerio.load(indexHtml.snapshot);

        const expectedFiles = except(files, ['index.html'], 'name').map(f => basename(f.name, '.html'));

        const offendingMenuItems = $('li.navItem').toArray()
            .map(el => $(el).text().trim())
            .filter(item => expectedFiles.indexOf(item) === -1);

        assert.equal(offendingMenuItems.length, 0, `Unexpected menu items found: ${offendingMenuItems.join(', ')}`);
    });

    // NEED TEST FOR MENU GROUPS HERE!

    test('Should correctly parse enum values (inner)', function() {
        const testFile = last(only(files, ['TEST_EnumInner.html'], 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const enums = $('td.enumValues').toArray();
        const days = $(enums[0]).text().split(',').map(m => m.trim());
        const months = $(enums[1]).text().split(',').map(m => m.trim());
        const numbers = $(enums[2]).text().split(',').map(m => m.trim());
        const rgb = $(enums[3]).text().split(',').map(m => m.trim());

        const expectedMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const expectedDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
        const expectedNumbers = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];
        const expectedRgb = ["RED", "GREEN", "BLUE"];

        assert.deepEqual(months, expectedMonths, 'Enum values do not match.');
        assert.deepEqual(days, expectedDays, 'Enum values do not match.');
        assert.deepEqual(numbers, expectedNumbers, 'Enum values do not match.');
        assert.deepEqual(rgb, expectedRgb, 'Enum values do not match.');
    });

    test('Should correctly parse enum values (.cls)', function() {
        const testFile = last(only(files, ['TEST_EnumClass.html'], 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const statuses = $('td.enumValues').toArray().map(el => $(el).text().trim());
        const expectedStatuses = ['QUEUED','PROCESSING','COMPLETE','COMPLETE_WITH_ERRORS','FAILED'];
        assert.deepEqual(statuses, expectedStatuses, 'Enum values do not match.');
    });

    test('Should have param for every given "@param" tag', function() {
        const testFile = last(only(files, ['TEST_Links.html'], 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const params = $('.paramName').toArray().map(el => $(el).text().trim());
        const expectedParams = ['int', 'int2', 'int3', 'int4'];
        assert.deepEqual(params, expectedParams, 'Params do not match.');
    });

    test('Should have param description for every given "@param" tag', function() {
        const testFile = last(only(files, ['TEST_Links.html'], 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const descriptions = $('.paramDescription').toArray().map(el => $(el).text().trim());
        const expectedDescriptions = ['int desc', 'int2 desc', 'int3 desc', 'int4 desc'];
        assert.deepEqual(descriptions, expectedDescriptions, 'Param descriptions do not match.');
    });

    test('Should correctly capture method annotations over multiple lines', function() {
        const testFile = last(only(files, ['TEST_Annotations.html'], 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const annotations = last(
            $('.methodHeader').toArray()
                .filter(el => $(el).text().trim() === 'method1')
                .map(el => $(el).next().text())
        );

        const expectedAnnotations = '@FirstAnnotation @SecondAnnotation @ThirdAnnotation';
        assert.deepEqual(annotations, expectedAnnotations, 'Annotations do not match.');
    });

    test('Should correctly capture class annotations over multiple lines', function() {
        const testFile = last(only(files, ['TEST_Annotations.html'], 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const annotations = $('.classAnnotations').text();

        const expectedAnnotations = `@FirstAnnotation(param=true) @SecondAnnotation(paramWithValue='/value/*') @ThirdAnnotation`;
        assert.deepEqual(annotations, expectedAnnotations, 'Annotations do not match.');
    });

    test('Should correctly capture annotations with params', function() {
        const testFile = last(only(files, ['TEST_Annotations.html'], 'name'));
        const $ = cheerio.load(testFile.snapshot);

        const methods = $('.methodHeader').toArray();
        const annotations1 = last(methods.filter(el => $(el).text().trim() === 'method2').map(el => $(el).next().text()));
        const annotations2 = last(methods.filter(el => $(el).text().trim() === 'method3').map(el => $(el).next().text()));
        const annotations3 = last(methods.filter(el => $(el).text().trim() === 'method4').map(el => $(el).next().text()));

        const expected1 = `@InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.')`;
        const expected2 = `@AuraEnabled(cacheable=true)`;
        const expected3 = `@AuraEnabled (cacheable=true)`;

        assert.deepEqual(annotations1, expected1, 'Annotation does not match.');
        assert.deepEqual(annotations2, expected2, 'Annotation does not match.');
        assert.deepEqual(annotations3, expected3, 'Annotation does not match.');
    });

    test('Should correctly link overloaded methods', function() {
        const testFile = last(only(files, ['TEST_Links.html'], 'name'));
        let $ = cheerio.load(testFile.snapshot);

        const hrefs = $('a.methodTOCEntry').toArray()
            .filter(el => $(el).text().trim() === 'getInt')
            .map(el => $(el).attr('href'));

        const ids = $('h2.methodHeader').toArray()
            .filter(el => $(el).text().trim() === 'getInt')
            .map(el => $(el).attr('id'));

        const expectedIds = ['TEST_Links.getInt', 'TEST_Links.getInt_1', 'TEST_Links.getInt_2', 'TEST_Links.getInt_3' ];
        const expectedHrefs = ['#TEST_Links.getInt', '#TEST_Links.getInt_1', '#TEST_Links.getInt_2', '#TEST_Links.getInt_3' ];

        assert.deepEqual(hrefs, expectedHrefs, 'Method overloads are not correctly linked to their TOC entries.');
        assert.deepEqual(ids, expectedIds, 'Method overloads are not correctly linked to their TOC entries.');
    });

    test('Should correctly parse and link "@see" markdown syntax', function() {
        const testFile = last(only(files, ['TEST_Links.html'], 'name'));
        let $ = cheerio.load(testFile.snapshot);

        const href = last($('a').toArray().filter(el => $(el).text() === 'Markdown Link').map(el => $(el).attr('href')));

        assert.equal(href, 'http://code.google.com/p/apex-lang/', '@see tag incorrectly parsed markdown link.');
    });

    test('Should correctly parse and link "@see" literal syntax', function() {
        const testFile = last(only(files, ['TEST_Links.html'], 'name'));
        let $ = cheerio.load(testFile.snapshot);

        const href = last($('a').toArray().filter(el => $(el).text() === 'https://www.google.com').map(el => $(el).attr('href')));

        assert.equal(href, 'https://www.google.com', '@see tag incorrectly parsed literal link.');
    });

    test('Should capture tag values over multiple lines', function() {
        const testFile = last(only(files, ['TEST_MultiLineTagValues.html'], 'name'));
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

    test('Should copy user assets defined by "apexdoc2.engine.assets" setting', function() {
        assert.equal(existsSync(resolve(targetDir, 'assets', 'info.md')), true, '"info.md" file not found in assets directory.');
    });

    test('Should copy user "Pages" defined by "apexdoc2.engine.pages" setting', function() {
        assert.equal(existsSync(resolve(targetDir, 'Page.html')), true, '"Page.html" file not found in root directory.');
    });
};

export default createEngineTests;