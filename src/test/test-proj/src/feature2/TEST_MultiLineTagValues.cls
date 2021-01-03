/**
 * Testing that the following tags support values of multiple
 * lines as they're supposed to. Doesn't matter if on class or
 * method, code that handles both is the same.
 * @group Assertions
 */
public class TEST_MultiLineTagValues {
    /**
     * @description Works
     * over multiple lines.
     * @param s2 Works
     * over multiple lines.
     * @exception Works
     * over multiple lines (exception).
     * @deprecated Works
     * over multiple lines (deprecated).
     * @return Works
     * over multiple lines (returns).
     * @author Works
     * over multiple lines (author).
     * @since Works
     * over multiple lines (since).
     */
    public String method1(String s2) {
      return s2;
    }
}