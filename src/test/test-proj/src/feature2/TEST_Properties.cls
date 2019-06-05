/**
 * @group Assertions
 */
public class TEST_Properties {
    public String one {get;set;}
    public static final String two { get; set; }
    public static String three { get; }
    private String four { set; }
    private String five {get; }
    private String six {set;}
    private String seven;
    protected static Map<String,String> eight {get;set;}
    protected Map<String,String> nine = new Map<String, String>();
    protected List<Integer> ten = new List<Integer>();
    protected Set<String> eleven {get;set;}

    private String twelve {
        set {
            twelve = 'twelve';
        }
    }

    private String thirteen {
        get {
            return 'thirteen';
        }
    }

    private Integer fourteen {
        get {
            return 4;
        }
        set {
            fourteen = value;
        }
    }

    Integer String invisible = 'invisible'; // not visible since prop w/o access modifer
}