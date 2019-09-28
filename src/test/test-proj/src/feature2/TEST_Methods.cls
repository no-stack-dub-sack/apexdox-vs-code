/**
 * Test for method parsing / visibility.
 * @group Assertions
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
     * @returns `Integer`
     */
    private Integer method11(Map<String, Map<SomeCustomClass.InnerClass, Map<Int, List<Map<String, Integer>>>>> crazyType, List<String> int2, OuterClass.InnerType int3, Integer int22) {
        return MY_INT + int;
    }

    /**
     * @param crazyType a
     * @param int22 d
     * @returns `Integer`
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
}