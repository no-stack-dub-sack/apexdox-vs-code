import * as assert from 'assert';
import cheerio from 'cheerio';
import { ITestFile } from '../..';
import { last, only } from '../../common/ArrayUtils';

export const createEnumsSuite = (files: ITestFile[]) => {
  suite('Enums', function () {
    test('Should correctly parse enum values (inner)', function () {
      const testFile = last(only(files, ['TEST_EnumInner.html'], 'name'));
      const $ = cheerio.load(testFile.snapshot);

      const enums = $('td.enum-values').toArray();
      const days = $(enums[0])
        .text()
        .split(',')
        .map((m) => m.trim());
      const months = $(enums[1])
        .text()
        .split(',')
        .map((m) => m.trim());
      const numbers = $(enums[2])
        .text()
        .split(',')
        .map((m) => m.trim());
      const rgb = $(enums[3])
        .text()
        .split(',')
        .map((m) => m.trim());

      const expectedMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const expectedDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
      const expectedNumbers = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];
      const expectedRgb = ['RED', 'GREEN', 'BLUE'];

      assert.deepEqual(months, expectedMonths, 'Enum values do not match.');
      assert.deepEqual(days, expectedDays, 'Enum values do not match.');
      assert.deepEqual(numbers, expectedNumbers, 'Enum values do not match.');
      assert.deepEqual(rgb, expectedRgb, 'Enum values do not match.');
    });

    test('Should correctly parse enum values (.cls)', function () {
      const testFile = last(only(files, ['TEST_EnumClass.html'], 'name'));
      const $ = cheerio.load(testFile.snapshot);

      const statuses = $('td.enum-values')
        .toArray()
        .map((el) => $(el).text().trim());
      const expectedStatuses = ['QUEUED', 'PROCESSING', 'COMPLETE', 'COMPLETE_WITH_ERRORS', 'FAILED'];
      assert.deepEqual(statuses, expectedStatuses, 'Enum values do not match.');
    });
  });
};
