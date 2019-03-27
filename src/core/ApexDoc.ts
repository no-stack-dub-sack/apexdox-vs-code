class ApexDoc {
    // constants
    private static APEX_DOC_VERSION: string = "1.0.0";
    private static COMMENT_CLOSE: string = "*/";
    private static COMMENT_OPEN: string = "/**";
    private static GLOBAL: string = "global";
    private static PUBLIC: string = "public";
    private static WEB_SERVICE: string = "webService";
    private static PROTECTED: string = "protected";

    public static PRIVATE: string = "private";
    public static TEST_METHOD: string = "testMethod";
    public static CLASS: string = "class";
    public static ENUM: string = "enum";
    public static INTERFACE: string = "interface";
    public static ORDER_ALPHA: string = "alpha";
    public static ORDER_LOGICAL: string = "logical";

    // use special token for marking the end of a doc block
    // comment. Now that we're supporting multi-line for all
    // tokens and using a common comment parser, the parser
    // must know when a block ends in order to prevent weird
    // behavior when lesser scopes than available are indicated
    // e.g. private;public when there are protected methods
    public static DOC_BLOCK_BREAK: string = "@@BREAK@@";
    private static SCOPES: string[] = [ApexDoc.GLOBAL, ApexDoc.PUBLIC, ApexDoc.PRIVATE, ApexDoc.PROTECTED, ApexDoc.WEB_SERVICE, ApexDoc.TEST_METHOD];

    // non-constant properties
    public static rgstrScope: string[];
    // private static FileManager fileManager;
    public static targetDirectory: string;
    private static sourceDirectory: string;
    private static numProcessed: number = 0;
}

export default ApexDoc;