/**
 * @group Assertions
 */
public class TEST_EnumInner {
    /**
     * Documentation Engine should parse inner enum values.
     */
    public enum Months { JAN, FEB,
        MAR,
        APR,
        MAY, JUN, JUL,
        AUG, SEP
        , OCT
        , NOV
        , DEC
    }

    /**
     * Documentation Engine should parse inner enum values.
     */
    public enum Days { MONDAY, TUESDAY,
        WEDNESDAY,
        THURSDAY,
        FRIDAY, SATURDAY, SUNDAY }

    /**
     * Documentation Engine should parse inner enum values.
     */
    public enum Numbers {
        ONE,
        TWO,
        THREE,
        FOUR,
        FIVE
    }

    /**
     * Documentation Engine should parse inner enum values.
     */
    public enum Rgb { RED, GREEN, BLUE }
}