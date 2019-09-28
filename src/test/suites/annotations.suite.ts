import * as assert from 'assert';
import cheerio from 'cheerio';
import { ITestFile } from '../..';
import { last, only } from '../../common/ArrayUtils';

export const createAnnotationsSuite = (files: ITestFile[]) => {
    suite('Annotations', function() {
        test('Should correctly capture method annotations over multiple lines', function() {
            const testFile = last(only(files, ['TEST_Annotations.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const annotations = last(
                $('.method-signature').toArray()
                    .filter(el => $(el).text().trim() === 'public static Integer method1()')
                    .map(el => $(el).prev().text())
            );

            const expectedAnnotations = '@FirstAnnotation @SecondAnnotation @ThirdAnnotation';
            assert.deepEqual(annotations, expectedAnnotations, 'Annotations do not match.');
        });

        test('Should correctly capture class annotations over multiple lines', function() {
            const testFile = last(only(files, ['TEST_Annotations.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const annotations = $('.class-annotations').text();

            const expectedAnnotations = `@FirstAnnotation(param=true) @SecondAnnotation(paramWithValue='/value/*') @ThirdAnnotation`;
            assert.deepEqual(annotations, expectedAnnotations, 'Annotations do not match.');
        });

        test('Should correctly capture annotations with params', function() {
            const testFile = last(only(files, ['TEST_Annotations.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const methods = $('.method-signature').toArray();
            const annotations1 = last(methods.filter(el => $(el).text().trim() === 'Integer method2()').map(el => $(el).prev().text()));
            const annotations2 = last(methods.filter(el => $(el).text().trim() === 'public static void method3()').map(el => $(el).prev().text()));
            const annotations3 = last(methods.filter(el => $(el).text().trim() === 'public static void method4()').map(el => $(el).prev().text()));

            const expected1 = `@InvocableMethod(label='Get Account Names' description='Returns the list of account names corresponding to the specified account IDs.')`;
            const expected2 = `@AuraEnabled(cacheable=true)`;
            const expected3 = `@AuraEnabled (cacheable=true)`;

            assert.deepEqual(annotations1, expected1, 'Annotation does not match.');
            assert.deepEqual(annotations2, expected2, 'Annotation does not match.');
            assert.deepEqual(annotations3, expected3, 'Annotation does not match.');
        });
    });
};
