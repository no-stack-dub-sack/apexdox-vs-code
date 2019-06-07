/**
 * @group Assertions
 */
global interface TEST_InterfaceClass {
    Integer doIt(Object object1, Object object2);

    MyCustomClass.MyInnerClass doSomething(Object object1, Object object2);

    Map<String, Map<String, List<String>>> doSomethingElse(Integer myInt, String myString);
}