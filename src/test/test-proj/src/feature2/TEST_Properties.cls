/**
 * @group Assertions
 * 
 * @author Bill C Riemers
 * @since 2022-10-05 Added changelog
 */
public class TEST_Properties {
    public String outer_one {get;set;}
    public static final String outer_two { get; set; }
    public static String outer_three { get; }
    private String outer_four { set; }
    private String outer_five {get; }
    private String outer_six {set;}
    private String outer_seven;
    protected static Map<String,String> outer_eight {get;set;}
    protected Map<String,String> outer_nine = new Map<String, String>();
    protected List<Integer> outer_ten = new List<Integer>();
    protected Set<String> outer_eleven {get;set;}

    private String outer_twelve {
        set {
            twelve = 'twelve';
        }
    }

    private String outer_thirteen {
        get {
            return 'thirteen';
        }
    }

    private Integer outer_fourteen {
        get {
            return 4;
        }
        set {
            fourteen = value;
        }
    }

    // not visible since prop w/o access modifer
    Integer String invisible = 'invisible';

    public class InnerOne {
        /** Description for inner_one */
        public String inner_one;
        public static final String inner_two;
        public static String inner_three;
        private String inner_four;
    }

    public class InnerTwo {
        @TestVisible
        public String inner_one;
        public static final String inner_two;
        public static String inner_three;
        private String inner_four;
    }

    public class InnerThree {
        /** Description for inner_one */
        public String inner_one;
        @TestVisible
        public static final String inner_two;
        public static String inner_three;
        private String inner_four;
    }
}