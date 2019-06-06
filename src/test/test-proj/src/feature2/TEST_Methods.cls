/**
 * Test for method parsing / visibility.
 * @group Assertions
 */
public class TEST_Methods {
    public static String method1() {
        return '';
    }

    private static String method2() {
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

    // this method will be invisible
    // since it is implicitly private
    // and does not start with a known keyword
    SomeCustomClass method10() {
        return new SomeCustomClass();
    }
}