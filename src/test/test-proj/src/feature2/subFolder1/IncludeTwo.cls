/**
 * This class should be included by `apexdox.engine.includes` setting
 * @author P. Weinberg
 * @since 2019-01-01 Created
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 */
@isTest
class IncludeTwo {
    // use this at some point to test paramsFromNameLine method model getter
    public static Map<String, Database.DeleteResult> myFunkyMethod(
        String str,
        Map<String, Map<String, Map<String, List<Database.DeleteResult>>>> ridicMap,
        List<Map<String, Map<Integer, List<Database.DeleteResult>>>> ridicList,
        Set<Map<Integer, List<Map<String, String>>>> ridicSet) {
            return;
    }
}