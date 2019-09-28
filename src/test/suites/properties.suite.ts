import * as assert from 'assert';
import cheerio from 'cheerio';
import { ITestFile } from '../..';
import { last, only } from '../../common/ArrayUtils';

export const createPropertiesSuite = (files: ITestFile[]) => {
    suite('Properties', function() {
        test('Should correctly parse all varieties of non-implicitly private properties', function() {
            const testFile = last(only(files, ['TEST_Properties.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const props = $('.attribute-name', '.subsection.properties.TEST_Properties');
            assert.equal(props.length, 14, 'All fourteen test properties not found');
        });

        test('Should not identify properties without explicit scope / access-modifiers', function() {
            const testFile = last(only(files, ['TEST_Properties.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const props = $('.attribute-name', '.subsection.properties.TEST_Properties').toArray().filter(el => $(el).text() === 'invisible');
            assert.equal(props.length, 0, '"TEST_Properties.invisible" property detected');
        });

        test('Should not have description column if no properties are doc-block annotated', function() {
            const testFile = last(only(files, ['TEST_Properties.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const descriptionHeader = $('th', '.subsection.properties.TEST_Properties_InnerTwo').toArray().filter(el => $(el).text() === 'Description');
            assert.equal(descriptionHeader.length, 0, 'Description column found in properties table');
        });

        test('Should have description column if any property is doc-block annotated', function() {
            const testFile = last(only(files, ['TEST_Properties.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const descriptionHeader = $('th', '.subsection.properties.TEST_Properties_InnerOne').toArray().filter(el => $(el).text() === 'Description');
            assert.equal(descriptionHeader.length, 1, 'Description column not found in properties table');
        });

        test('Should not have annotation column if no properties have Apex annotations', function() {
            const testFile = last(only(files, ['TEST_Properties.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const annotationHeader = $('th', '.subsection.properties.TEST_Properties_InnerOne').toArray().filter(el => $(el).text() === 'Annotations');
            assert.equal(annotationHeader.length, 0, 'Annotation column found in properties table');
        });

        test('Should have description column if any property is doc-block annotated', function() {
            const testFile = last(only(files, ['TEST_Properties.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const annotationHeader = $('th', '.subsection.properties.TEST_Properties_InnerTwo').toArray().filter(el => $(el).text() === 'Annotations');
            assert.equal(annotationHeader.length, 1, 'Annotation column not found in properties table');
        });

        test('Should have description and annotation column if properties have at least one doc-block and Apex annotation ', function() {
            const testFile = last(only(files, ['TEST_Properties.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const annotationHeader = $('th', '.subsection.properties.TEST_Properties_InnerThree').toArray().filter(el => $(el).text() === 'Annotations');
            const descriptionHeader = $('th', '.subsection.properties.TEST_Properties_InnerThree').toArray().filter(el => $(el).text() === 'Description');
            assert.equal(annotationHeader.length + descriptionHeader.length, 2, 'Annotation or Description column not found in properties table');
        });
    });
};
