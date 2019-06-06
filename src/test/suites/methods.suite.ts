import * as assert from 'assert';
import cheerio from 'cheerio';
import {
    head,
    last,
    only,
    tail
    } from '../../common/ArrayUtils';
import { ITestFile } from '../extension.test';

const createMethodsSuite = (files: ITestFile[]) => {
    suite('Methods', function() {
        test('Should correctly parse public methods', function() {
            const testFile = last(only(files, ['TEST_Methods.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const methods = $('li.method.public');
            const methodName = methods.children('a').text().trim();
            assert.equal(methods.length, 1, 'Incorrectly number of public methods found');
            assert.equal(methodName, 'method1', 'Incorrect public method name found');
        });

        test('Should correctly parse protected methods', function() {
            const testFile = last(only(files, ['TEST_Methods.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const methods = $('li.method.protected');
            const methodName = methods.children('a').text().trim();
            assert.equal(methods.length, 1, 'Incorrectly number of protected methods found');
            assert.equal(methodName, 'method3', 'Incorrect protected method name found');
        });

        test('Should correctly parse global methods', function() {
            const testFile = last(only(files, ['TEST_Methods.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const methods = $('li.method.global');
            const methodName = methods.children('a').text().trim();
            assert.equal(methods.length, 1, 'Incorrectly number of global methods found');
            assert.equal(methodName, 'method4', 'Incorrect global method name found');
        });

        test('Should correctly parse explicitly private methods', function() {
            const testFile = last(only(files, ['TEST_Methods.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const methodName = head($('li.method.private').children('a').toArray().map(el => $(el).text().trim()));
            assert.equal(methodName, 'method2', 'Incorrect private method name found');
        });

        test('Should correctly parse implicitly private methods whose signatures start with known keywords/collections', function() {
            const testFile = last(only(files, ['TEST_Methods.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const methodNames = tail($('li.method.private').children('a').toArray().map(el => $(el).text().trim()));
            const expectedMethodNames = ['method5', 'method6', 'method7', 'method8', 'method9'];
            assert.deepEqual(methodNames, expectedMethodNames, 'Incorrect implicitly private method names found');
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
    });
};

export default createMethodsSuite;