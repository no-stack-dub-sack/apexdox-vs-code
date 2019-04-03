import ApexDoc from "../core/ApexDoc";

class ApexDocError extends Error {
    public static INVALID_SCOPE = 'Please provide an array of valid scopes. Valid scopes include: ' + ['Cool!'].join(', ');
    public static SCOPE_ENTRIES_MAX = 'Argument <scope> has too many entries. ' + ApexDocError.INVALID_SCOPE;
    public static SCOPE_ENTRIES_MIN = 'Argument <scope> must have at least one entry. ' + ApexDocError.INVALID_SCOPE;

    public static INVALID_DIRECTORY = (arg: string, path: string) =>
        `Value for <${arg}> argument: '${path}' is invalid. Please provide a valid directory.`

    public static INVALID_SORT_ORDER = (sortOrder: string) =>
        `Value for <sort_order> argument '${sortOrder}' is invalid. Options for this argument are: 'logical' or 'alpha'.`

    public static INVALID_PORT = (port: number) =>
        `Value for <port> argument '${port}' is invalid. Please provide a valid port number.`

    public static INVALID_SOURCE_URL = (url: string) =>
        `Value for <source_url> argument '${url}' is invalid. Please provide a valid URL where your source ` +
        'code is hosted, e.g.: \'https://github.com/no-stack-dub-sack/salesforce-project/tree/master/src/classes\''

    public static INVALID_TARGET_DIRECTORY = (path: string) =>
        `Value for <target_directory> argument: '${path}' is invalid. Please provide a valid path.`

    public static ONLY_STRINGS = (arg: string) => `Argument <${arg}> array may only contain strings.`;

    public static SCOPE_ENTRY_INVALID = (entry: string) =>
        `Entry for <scope> argument: '${entry}' is invalid. ${ApexDocError.INVALID_SCOPE}`

    public static INVALID_TYPE = (arg: string, type: string) =>
        `Value for <${arg}> argument is incorrect type. Expected '${type}'`

    public static NO_FILES_FOUND = (sourceDir: string) => `No Apex files found in directory: ${sourceDir}`;

    public static ASSET_NOT_FOUND = (asset: string) =>
        `Asset '${asset}' could not be copied to the target directory. Did you provide a fully qualified file name?`

    public static INVALID_SEE_QUALIFIER =
        'Each comma separated qualifier of the @see token must be a URL (e.g. https://www.google.com), markdown URL' +
        ' (e.g [Google](https://www.google.com) ) or fully qualified class or method name, with a minimum of 1 part and ' +
        'a maximum of 3. (e.g. MyClassName, MyClassName.MyMethodName, MyClassName.MyInnerClassName.MyInnerClassMethodName).';
}

export default ApexDocError;