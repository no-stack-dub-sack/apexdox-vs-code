import * as assert from 'assert';
import cheerio from 'cheerio';
import { ITestFile } from '../extension.test';
import { last, only } from '../../common/ArrayUtils';

export const createClassesSuite = (files: ITestFile[]) => {
    suite('Classes and Interfaces', function() {
        test('Should treat @isTest classes without an explicit access modifier as private', function() {
            const testFile = last(only(files, ['TEST_InterfaceClass.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            assert.equal($('#item-IncludeTwo').attr('class').includes('private'), true, 'IncludeTwo.cls @isTest class not found or not private.');
        });

        test('Should correctly parse inner classes', function() {
            const testFile = last(only(files, ['TEST_NestedClasses.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const innerClasses = $('h2.sectionTitle')
                .toArray()
                .map(el => $(el).attr('id'))
                .filter(id => id.startsWith('TEST_NestedClasses.'));

            const expectedInnerClasses =
                ['TEST_NestedClasses.AbstractChildClass',
                'TEST_NestedClasses.AnotherChildClass',
                'TEST_NestedClasses.ConcreteChildClass',
                'TEST_NestedClasses.InnerClass',
                'TEST_NestedClasses.MyException',
                'TEST_NestedClasses.MyInterface',
                'TEST_NestedClasses.MySecondException',
                'TEST_NestedClasses.MySecondInterface'];

            assert.deepEqual(innerClasses, expectedInnerClasses, 'Expected inner classes do not match actual.');
        });

        test('Interface methods should inherit access modifier from parent type', function() {
            const testFile = last(only(files, ['TEST_InterfaceClass.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);
            let foundMethods = false;

            $('.methods-toc__entry').parent().toArray().forEach(el => {
                foundMethods = true;
                let classNames = $(el).attr('class');
                assert.equal(classNames, 'method global', 'Interface methods not inheriting access modifier from parent type.');
            });

            assert.equal(foundMethods, true, 'Interface methods not found.');
        });

        test('Should correctly parse interface methods', function() {
            const testFile = last(only(files, ['TEST_InterfaceClass.html'], 'name'));
            const $ = cheerio.load(testFile.snapshot);

            const methods = $('.methods-toc__entry').toArray().map(el => $(el).text().trim());
            const expectedMethods = ['doIt', 'doSomething', 'doSomethingElse'];

            assert.deepEqual(methods, expectedMethods, 'Unexpected interface methods found.');
        });
    });
};
