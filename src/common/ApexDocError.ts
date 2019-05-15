class ApexDocError extends Error {
    public static INVALID_SCOPE = 'Please provide an array of valid scopes. Valid scopes include: global, public, protected, private, testMethod, and webService';
    public static SCOPE_ENTRIES_MAX = `scope' parameter has too many entries. ${ApexDocError.INVALID_SCOPE}`;
    public static SCOPE_ENTRIES_MIN = `'scope' parameter must have at least one entry. ${ApexDocError.INVALID_SCOPE}`;

    public static INVALID_DIRECTORY = (arg: string, path: string) =>
        `Value for '${arg}' parameter: '${path}' is invalid. Please provide a valid directory.`

    public static INVALID_SORT_ORDER = (sortOrder: string) =>
        `Value for 'sortOrder' parameter '${sortOrder}' is invalid. Options for this parameter are: 'logical' or 'alpha'.`

    public static INVALID_PORT = (port: number) =>
        `Value for 'port' parameter '${port}' is invalid. Please provide a valid port number.`

    public static INVALID_SOURCE_URL = (url: string) =>
        `Value for 'source.sourceUrl' parameter '${url}' is invalid. Please provide a valid URL where your source ` +
        'code is hosted, e.g.: \'https://github.com/no-stack-dub-sack/salesforce-project/tree/master/src/classes\''

    public static INVALID_TARGET_DIRECTORY = (path: string) =>
        `Value for 'targetDirectory' parameter: '${path}' is invalid. Please provide a valid path.`

    public static ONLY_STRINGS = (arg: string) => `'${arg}' parameter's array may only contain strings.`;

    public static SCOPE_ENTRY_INVALID = (entry: string) =>
        `Entry for 'scope' parameter: '${entry}' is invalid. ${ApexDocError.INVALID_SCOPE}`

    public static INVALID_TYPE = (arg: string, type: string) =>
        `Value for '${arg}' parameter is incorrect type. Expected '${type}'`

    public static NO_FILES_FOUND = (sourceDirs: string) => `No .cls files found in ${sourceDirs}`;

    public static ASSET_NOT_FOUND = (asset: string) =>
        `Asset '${asset}' could not be copied to the target directory. Did you provide a fully qualified file name?`

    public static INVALID_EXTENSION = (arg: string, path: string, extension: string) =>
        `Expected a '${extension}' file for paramter '${arg}'. Instead got '${path}'`

    public static INVALID_SEE_QUALIFIER =
        'The value for each @see tag must be a URL, markdown URL or fully qualified class or method name ' +
        '(e.g. MyClass, MyClass.MyMethod, MyClass.MyInnerClass.MyInnerClassMethod).';
}

export default ApexDocError;