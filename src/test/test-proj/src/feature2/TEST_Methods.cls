/**
 * Test for method parsing / visibility.
 * 
 * @group Assertions
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 * @since 2022-10-12 Added method14 to test changelogs on methods
 */
public class TEST_Methods {
    public static String method1() {
        return '';
    }

    String method2() {
        return '';
    }

    protected static String method3() {
        return '';
    }

    global static String method4() {
        return '';
    }

    /** visible because starts with known keyword, despite implicit privacy */
    String method5() {
        return '';
    }

    /** visible because starts with known keyword, despite implicit privacy */
    Integer method6() {
        return 2;
    }

    /** visible because starts with known keyword, despite implicit privacy */
    Set<String> method7() {
        return new Set<String>();
    }

    /** visible because starts with known keyword, despite implicit privacy */
    List<String> method8() {
        return new List<String>();
    }

    /** visible because starts with known keyword, despite implicit privacy */
    Map<String, String> method9() {
        return new Map<String, String>();
    }

    /**
     * @param int a
     * @param int2 b
     * @param int3 c
     * @param int4 d
     */
    public static Integer method10(Integer int, String int2, Double int3, Set<String> int4) {
        return MY_INT + int;
    }

    /**
     * @param crazyType a
     * @param int2 b
     * @param int3 c
     * @param int22 d
     * @return `Integer`
     */
    private Integer method11(Map<String, Map<SomeCustomClass.InnerClass, Map<Int, List<Map<String, Integer>>>>> crazyType, List<String> int2, OuterClass.InnerType int3, Integer int22) {
        return MY_INT + int;
    }

    /**
     * @param crazyType a
     * @param int22 d
     * @return `Integer`
     */
    protected static Integer method12(Map<String, Map<SomeCustomClass.InnerClass, Map<Int, List<Map<String, Integer>>>>> crazyType, List<String> int2, OuterClass.InnerType int3, Integer int22) {
        return MY_INT + int;
    }

    // this method will be invisible
    // since it is implicitly private
    // and does not start with a known keyword
    SomeCustomClass method10() {
        return new SomeCustomClass();
    }

    /**
     * @description
     * Method to demonstrate changelogs.
     * 
     * @author Bill Riemers <briemers@redhat.com>
     * @since 2022-10-11 Added to test changelog
     * @since 2022-10-12 Revised to show second log entry
     * 
     * @author Jane Doe <jdoe@example.org>
     * @since 2022-10-31 Pretend update
     * 
     * @param int a
     * @param int2 b
     * @param int3 c
     * @param int4 d
     */
    public static Integer method14(Integer int, String int2, Double int3, Set<String> int4) {
        return MY_INT + int;
    }
}