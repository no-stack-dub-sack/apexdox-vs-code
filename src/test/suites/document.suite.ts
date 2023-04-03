import * as assert from 'assert';
import cheerio from 'cheerio';
import { basename } from 'path';
import { except, last, only } from '../../common/ArrayUtils';
import { ITestFile } from '../..';

export const createDocumentSuite = (files: ITestFile[]) => {
    suite('Document', () => {
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

            const expectedMiscellaneousGroup = ['IncludeOne', 'TEST_HtmlTags', 'IncludeTwo'];

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

            const offendingMenuItems = $('li.nav-item').toArray()
                .map(el => $(el).text().trim())
                .filter(item => expectedFiles.indexOf(item) === -1);

            assert.equal(offendingMenuItems.length, 0, `Unexpected menu items found: ${offendingMenuItems.join(', ')}`);
        });

        test('Should correctly link each menu item to its corresponding doc page', function() {
            const indexHtml = last(only(files, ['index.html'], 'name'));
            const $ = cheerio.load(indexHtml.snapshot);

            $('li.nav-item')
                .toArray()
                .map(el => ({
                    text: $(el).text().trim(),
                    onclick: $(el).attr('onclick')
                }))
                .forEach(menuObj => {
                    assert.ok(menuObj.onclick.includes(menuObj.text + '.html'), "Menu item's onclick attribute does not link to correct file.");
                });
        });

        test('Should capture tag values over multiple lines', function() {
            const testFile = last(only(files, ['TEST_MultiLineTagValues.html'], 'name'));
            let $ = cheerio.load(testFile.snapshot);

            const param = $('.param-description').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines.');
            assert.equal($(param).text().trim(), 'Works over multiple lines.', 'param description value does not match expected multi-line value.');

            const description = $('.method-description').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines.');
            assert.equal($(description).text().trim(), 'Works over multiple lines.', 'description value does not match expected multi-line value');

            const author = $('.method-subtitle-description').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (author).');
            assert.equal($(author).text().trim(), 'Works over multiple lines (author).', 'author value does not match expected multi-line value');

            const since = $('.method-subtitle-description').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (since).');
            assert.equal($(since).text().trim(), 'Works over multiple lines (since).', 'since value does not match expected multi-line value');

            const returns = $('.method-subtitle-description').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (returns).');
            assert.equal($(returns).text().trim(), 'Works over multiple lines (returns).', 'returns value does not match expected multi-line value');

            const exception = $('.method-subtitle-description').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (exception).');
            assert.equal($(exception).text().trim(), 'Works over multiple lines (exception).', 'exception value does not match expected multi-line value');

            const deprecated = $('.method-subtitle-description').toArray().filter(el => $(el).text().trim() === 'Works over multiple lines (deprecated).');
            assert.equal($(deprecated).text().trim(), 'Works over multiple lines (deprecated).', 'deprecated value does not match expected multi-line value');
        });

        test('Should preserver whitespace and newlines for supplementary page code examples', function() {
            const indexHtml = last(only(files, ['index.html'], 'name'));
            let $ = cheerio.load(indexHtml.snapshot);

            const actual = $("code").toArray().reduce((acc, el) => acc + $(el).text(), "");

            const expected = `@AuraEnabled
public static void someMethod() {
    List<BotField> fields = new List<BotField>();
    System.debug('Some debug statement');
}`;

            assert.equal(actual, expected, "Example code does not match expected value");
        });
    });
};
