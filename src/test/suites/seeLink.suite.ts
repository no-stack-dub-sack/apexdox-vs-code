import * as assert from 'assert';
import cheerio from 'cheerio';
import { head, last, only } from '../../common/ArrayUtils';
import { ITestFile } from '../extension.test';

export const createSeeLinkSuite = (files: ITestFile[]) => {
    suite('See Links', function() {
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

        test('Should correctly parse and link "@see" class-link syntax', function() {
            const testFile = last(only(files, ['TEST_Links.html'], 'name'));
            let $ = cheerio.load(testFile.snapshot);

            const onclick = last($('a').toArray().filter(el => $(el).text() === 'TEST_ArrayUtils').map(el => $(el).attr('onclick')));

            assert.equal(onclick, "goToLocation('TEST_ArrayUtils.html')", '@see tag incorrectly class link.');
        });

        test('Should correctly parse and link "@see" child-class-link syntax', function() {
            const testFile = last(only(files, ['TEST_Links.html'], 'name'));
            let $ = cheerio.load(testFile.snapshot);

            const onclick = last($('a').toArray().filter(el => $(el).text() === 'TEST_NestedClasses.ConcreteChildClass').map(el => $(el).attr('onclick')));

            assert.equal(onclick, "goToLocation('TEST_NestedClasses.html#TEST_NestedClasses.ConcreteChildClass')", '@see tag incorrectly parsed child-class link.');
        });

        test('Should correctly parse and link "@see" method-link syntax', function() {
            const testFile = last(only(files, ['TEST_Links.html'], 'name'));
            let $ = cheerio.load(testFile.snapshot);

            const onclick = head($('a').toArray().filter(el => $(el).text() === 'TEST_ArrayUtils.qsort').map(el => $(el).attr('onclick')));

            assert.equal(onclick, "goToLocation('TEST_ArrayUtils.html#TEST_ArrayUtils.qsort')", '@see tag incorrectly parsed method link.');
        });

        test('Should correctly parse and link "@see" method-link overload-selector syntax', function() {
            const testFile = last(only(files, ['TEST_Links.html'], 'name'));
            let $ = cheerio.load(testFile.snapshot);

            const onclick = last($('a').toArray().filter(el => $(el).text() === 'TEST_ArrayUtils.qsort').map(el => $(el).attr('onclick')));

            assert.equal(onclick, "goToLocation('TEST_ArrayUtils.html#TEST_ArrayUtils.qsort_2')", '@see tag incorrectly parsed method link (overload).');
        });

        test('Should correctly parse and link "@see" child-class method-link syntax', function() {
            const testFile = last(only(files, ['TEST_Links.html'], 'name'));
            let $ = cheerio.load(testFile.snapshot);

            const onclick = head($('a').toArray().filter(el => $(el).text() === 'TEST_NestedClasses.ConcreteChildClass.overloadedmethod').map(el => $(el).attr('onclick')));

            assert.equal(onclick, "goToLocation('TEST_NestedClasses.html#TEST_NestedClasses.ConcreteChildClass.overloadedmethod')", '@see tag incorrectly parsed child class method link.');
        });

        test('Should correctly parse and link "@see" child-class method-link overload-selector syntax', function() {
            const testFile = last(only(files, ['TEST_Links.html'], 'name'));
            let $ = cheerio.load(testFile.snapshot);

            const onclick = last($('a').toArray().filter(el => $(el).text() === 'TEST_NestedClasses.ConcreteChildClass.overloadedmethod').map(el => $(el).attr('onclick')));

            assert.equal(onclick, "goToLocation('TEST_NestedClasses.html#TEST_NestedClasses.ConcreteChildClass.overloadedmethod_1')", '@see tag incorrectly parsed child class method link (overload).');
        });

        test('Should correctly handle "@see" link with invalid identifier', function() {
            const testFile = last(only(files, ['TEST_Links.html'], 'name'));
            let $ = cheerio.load(testFile.snapshot);

            const tooltip = last($('span').toArray().filter(el => $(el).text() === 'ThisOneShouldFail').map(el => $(el).attr('title')));

            assert.equal(tooltip, 'A valid link could not be created with this identifier.', '@see tag incorrectly handled broken link.');
        });
    });
};
