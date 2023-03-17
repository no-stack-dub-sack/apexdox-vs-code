/**
 * @group Assertions
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 */
global interface TEST_InterfaceClass {
    Integer doIt(Object object1, Object object2);

    MyCustomClass.MyInnerClass doSomething(Object object1, Object object2);

    Map<String, Map<String, List<String>>> doSomethingElse(Integer myInt, String myString);
}