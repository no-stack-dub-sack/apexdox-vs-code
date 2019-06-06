import * as assert from 'assert';
import cheerio from 'cheerio';
import { basename } from 'path';
import { except, last, only } from '../common/ArrayUtils';
import { ITestFile } from './extension.test';

// TODO:
// - interfaces
// - menu links
// - classes / nested classes

const createEngineTests = (files: ITestFile[]) => {

    suite('Core Engine', () => {
        test('Should correctly set title from config', function() {
            const indexHtml = last(only(files, ['index.html'], 'name'));
            const $ = cheerio.load(indexHtml.snapshot);

            const title = $('title').text();
            assert.equal(title, 'My Test Docs', `Unexpected title ${title}`);
        });

        test('Should place classes in correct groups according to "@group" tags', function() {
            const indexHtml = last(only(files, ['index.html'], 'name'));
            const $ = cheerio.load(indexHtml.snapshot);

            const assertionGroup = $('a', '#Assertions').toArray().map(el => $(el).text());
            const featureGroup = $('a', '#Feature1').toArray().map(el => $(el).text());
            const miscellaneousGroup = $('a', '#Miscellaneous').toArray().map(el => $(el).text());

            const expectedMiscellaneousGroup = ['IncludeOne', 'IncludeTwo'];

            const expectedAssertionsGroup = [
                'TEST_Annotations', 'TEST_EnumClass', 'TEST_EnumInner', 'TEST_InterfaceClass', 'TEST_Links',
                'TEST_Methods', 'TEST_MultiLineTagValues', 'TEST_NestedClasses', 'TEST_Properties'
            ];

            const expectedFeatureGroup = [
                'TEST_ArrayUtils', 'TEST_BotField', 'TEST_BotHandler', 'TEST_BotItem', 'TEST_BotMessage', 'TEST_HandlerSOQL',
                'TEST_IllegalStateException', 'TEST_ISObjectComparator', 'TEST_JWT', 'TEST_LIFXController', 'TEST_MyRestResource',
                'TEST_PrimitiveComparator', 'TEST_SampleDataController', 'TEST_SlackOpportunityPublisher', 'TEST_StopWatch'
            ];

            assert.deepEqual(miscellaneousGroup, expectedMiscellaneousGroup, 'Menu items in assertion group do match match expected items');
            assert.deepEqual(featureGroup, expectedFeatureGroup, 'Menu items in assertion group do match match expected items');
            assert.deepEqual(assertionGroup, expectedAssertionsGroup, 'Menu items in assertion group do match match expected items');
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

        test('Should correctly parse enum values (inner)', function() {
            const testFile = last(only(files, ['TEST_EnumInner.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const enums = $('td.enumValues').toArray();
            const days = $(enums[0]).text().split(',').map(m => m.trim());
            const months = $(enums[1]).text().split(',').map(m => m.trim());
            const numbers = $(enums[2]).text().split(',').map(m => m.trim());
            const rgb = $(enums[3]).text().split(',').map(m => m.trim());

            const expectedMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
            const expectedDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
            const expectedNumbers = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];
            const expectedRgb = ['RED', 'GREEN', 'BLUE'];

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
    });
};

export default createEngineTests;