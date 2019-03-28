import { ApexDoc2Config } from '../extension';
import { existsSync } from 'fs';
import Utils from './Utils';

export class ApexDocError extends Error {}

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
    private static numProcessed: number = 0;

    public static main(config: ApexDoc2Config): void {
        try {
            // runApexDoc(config);
        } catch (ex) {
            console.log(ex);
            // Utils.printHelp();
        }
    }

    private static directoryGuard(path: string, arg: string): string {
        if (path && existsSync(path)) {
            return path;
        } else if (!path) {
            return ''; // DEFAULT
        } else {
            throw new ApexDocError(
                `Value for <${arg}> argument: '${path}' is invalid. Please provide a valid diectory.`
            );
        }
    }

    private static sortOrderGuard(sortOrder: string): string {
        if (sortOrder && (sortOrder.toLowerCase() === ApexDoc.ORDER_LOGICAL || sortOrder.toLowerCase() === ApexDoc.ORDER_ALPHA)) {
            return sortOrder.toLowerCase();
        } else if (!sortOrder) {
            return ApexDoc.ORDER_ALPHA; // DEFAULT
        } else {
            throw new ApexDocError(
                `Value for <sort_order> argument '${sortOrder}' is invalid. Options for this argument are: 'logical' or 'alpha'.`
            );
        }
    }

    private static sourceURLGuard(str: string): string {
        if (str && Utils.isURL(str)) {
            return str.trim();
        } else if (!str) {
            return ''; // DEFAULT
        } else {
            throw new ApexDocError(
                'Value for <source_url> argument: \'str\' is invalid. Please provide a valid URL where your source ' +
                'code is hosted, e.g.: \'https://github.com/no-stack-dub-sack/ApexDoc2/tree/master/src/main\''
            );
        }
    }

    // public main routine which is used by both command line invocation and
    // Eclipse PlugIn invocation
    public static runApexDoc(config: ApexDoc2Config): void {
        // TODO: replace StopWatch functionality

        let homePagePath = this.directoryGuard(config.homePagePath, 'home_page');
        let bannerPagePath = this.directoryGuard(config.bannerPagePath, 'banner_page');
        let hostedSourceURL = this.sourceURLGuard(config.sourceControlURL);
        let documentTitle = config.title;
        let includes = config.includes || [];
        let excludes = config.excludes || [];
        let sortOrder = this.sortOrderGuard(config.sortOrder);
        let sourceDirectory = this.directoryGuard(config.sourceDirectory, 'source_directory');

        let showMethodTOCDescription = true;

        // // parse command line parameters
        // for (let i = 0; i < args.length; i++) {
        //     if (args[i] == null) {
        //         continue;
        //     } else if (args[i].equalsIgnoreCase("-s")) {
        //         sourceDirectory = directoryGuard(args[++i]);
        //     } else if (args[i].equalsIgnoreCase("-u")) {
        //         hostedSourceURL = sourceURLGuard(args[++i]);
        //     } else if (args[i].equalsIgnoreCase("-t")) {
        //         targetDirectory = targetDirectoryGuard(args[++i]);
        //     } else if (args[i].equalsIgnoreCase("-h")) {
        //         homePagePath = args[++i];
        //     } else if (args[i].equalsIgnoreCase("-b")) {
        //         bannerPagePath = args[++i];
        //     } else if (args[i].equalsIgnoreCase("-p")) {
        //         string scope = args[++i];
        //         rgstrScope = scopeGuard(scope);
        //     } else if (args[i].equalsIgnoreCase("-d")) {
        //         documentTitle = args[++i];
        //     } else if (args[i].equalsIgnoreCase("-c")) {
        //         showMethodTOCDescription = showTOCGuard(args[++i]);
        //     } else if (args[i].equalsIgnoreCase("-o")) {
        //         sortOrder = sortOrderGuard(args[++i].trim());
        //     } else if (args[i].equalsIgnoreCase("-e")) {
        //         excludes = args[++i].trim();
        //     } else if (args[i].equalsIgnoreCase("-i")) {
        //         includes = args[++i].trim();
        //     } else {
        //         Utils.printHelp();
        //         System.exit(-1);
        //     }
        // }

        // // ensure our required arguments are present
        // directoryGuard(sourceDirectory);
        // targetDirectoryGuard(targetDirectory);

        // // default scope to global and public if not specified
        // if (rgstrScope == null || rgstrScope.length == 0) {
        //     rgstrScope = new string[3];
        //     rgstrScope[0] = GLOBAL;
        //     rgstrScope[1] = PUBLIC;
        //     rgstrScope[2] = WEB_SERVICE;
        // }

        // List<string> includeFiles = new ArrayList<string>();
        // List<string> excludeFiles = new ArrayList<string>();

        // if (!includes.equals("")) {
        //     includeFiles = Arrays.asList(includes.split(","));
        // }

        // if (!excludes.equals("")) {
        //     excludeFiles = Arrays.asList(excludes.split(","));
        // }

        // // find all the files to parse
        // fileManager = new FileManager(targetDirectory);
        // ArrayList<File> files = fileManager.getFiles(sourceDirectory, includeFiles, excludeFiles);
        // ArrayList<TopLevelModel> models = new ArrayList<TopLevelModel>();
        // TreeMap<string, TopLevelModel> modelMap = new TreeMap<string, TopLevelModel>();

        // fileManager.setDocumentTitle(documentTitle);

        // // set up document generator
        // DocGen.sortOrderStyle = sortOrder;
        // DocGen.hostedSourceURL = hostedSourceURL;
        // DocGen.showMethodTOCDescription = showMethodTOCDescription;

        // // parse each file, creating a class or enum model for it
        // files.stream().forEach(fromFile -> {
        //     string fromFileName = fromFile.getAbsolutePath();
        //     TopLevelModel model = parseFileContents(fromFileName);
        //     modelMap.put(model.getName().toLowerCase(), model);
        //     if (model != null) {
        //         models.add(model);
        //         numProcessed++;
        //     }
        // });

        // // create our Groups
        // TreeMap<string, ClassGroup> classGroupMap = createGroupNameMap(models, sourceDirectory);

        // // load up optional specified file templates
        // string bannerContents = fileManager.parseHTMLFile(bannerPagePath);
        // string homeContents = fileManager.parseHTMLFile(homePagePath);

        // // create our set of HTML files
        // fileManager.createDocs(classGroupMap, modelMap, models, bannerContents, homeContents);

        // // we are done!
        // timer.stop();
        // Utils.log("ApexDoc2 complete! " + numProcessed + " Apex files processed in " + timer.getTime() + " ms.");
        // System.exit(0);
    }

    // private static TreeMap<string, ClassGroup> createGroupNameMap(ArrayList<TopLevelModel> models,
    //         string sourceDirectory) {
    //     TreeMap<string, ClassGroup> map = new TreeMap<string, ClassGroup>();

    //     models.stream().forEach(model -> {
    //         string group = model.getGroupName();
    //         string contentPath = model.getGroupContentPath();
    //         if (contentPath != null && !contentPath.isEmpty()) {
    //             contentPath = sourceDirectory + "/" + contentPath;
    //         }

    //         ClassGroup cg;
    //         if (group != null) {
    //             cg = map.get(group);
    //             if (cg == null) {
    //                 cg = new ClassGroup(group, contentPath);
    //             } else if (cg.getContentSource() == null) {
    //                 cg.setContentSource(contentPath);
    //             }
    //             // put the new or potentially modified ClassGroup back in the map
    //             map.put(group, cg);
    //         }
    //     });

    //     return map;
    // }

    // public static TopLevelModel parseFileContents(string filePath) {
    //     try {
    //         // Get the object of DataInputStream
    //         FileInputStream fileStream = new FileInputStream(filePath);
    //         DataInputStream inputStream = new DataInputStream(fileStream);
    //         BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

    //         int nestedCurlyBraceDepth = 0, lineNum = 0;
    //         string line, originalLine, previousLine = "";
    //         boolean commentsStarted = false, docBlockStarted = false;

    //         ClassModel cModel = null, cModelParent = null;
    //         ArrayList<string> comments = new ArrayList<string>();
    //         Stack<ClassModel> cModels = new Stack<ClassModel>();

    //         // DH: Consider using java.io.StreamTokenizer to read the file a
    //         // token at a time?
    //         //
    //         // new strategy notes:
    //         // any line with " class " is a class definition
    //         // any line with scope (global, public, private) is a class, method,
    //         // or property definition.
    //         // you can detect a method vs. a property by the presence of ( )'s
    //         // you can also detect properties by get; or set;, though they may
    //         // not be on the first line.
    //         // in apex, methods that start with get and take no params, or set
    //         // with 1 param, are actually properties.
    //         //

    //         while ((line = reader.readLine()) != null) {
    //             originalLine = line;
    //             line = line.trim();
    //             lineNum++;

    //             if (line.length() == 0) {
    //                 continue;
    //             }

    //             // ignore anything after // style comments. this allows hiding
    //             // of tokens from ApexDoc. However, don't ignore when line
    //             // doesn't start with //, we want to preserver @example comments
    //             int offset = line.indexOf("//");
    //             if (offset == 0) {
    //                 line = line.substring(0, offset);
    //             }

    //             // gather up our comments
    //             if (line.startsWith("/*")) {
    //                 commentsStarted = true;
    //                 boolean commentEnded = false;
    //                 if (line.startsWith(COMMENT_OPEN)) {
    //                     if (line.endsWith(COMMENT_CLOSE)) {
    //                         line = line.replace(COMMENT_CLOSE, DOC_BLOCK_BREAK);
    //                         commentEnded = true;
    //                     }
    //                     comments.add(line);
    //                     docBlockStarted = true;
    //                 }
    //                 if (line.endsWith(COMMENT_CLOSE) || commentEnded) {
    //                     commentsStarted = false;
    //                     docBlockStarted = false;
    //                 }
    //                 continue;
    //             }

    //             if (commentsStarted && line.endsWith(COMMENT_CLOSE)) {
    //                 line = line.replace(COMMENT_CLOSE, DOC_BLOCK_BREAK);
    //                 if (docBlockStarted) {
    //                     comments.add(line);
    //                     docBlockStarted = false;
    //                 }
    //                 commentsStarted = false;
    //                 continue;
    //             }

    //             if (commentsStarted) {
    //                 if (docBlockStarted) {
    //                     comments.add(line);
    //                 }
    //                 continue;
    //             }

    //             // keep track of our nesting so we know which class we are in
    //             int openCurlies = Utils.countChars(line, '{');
    //             int closeCurlies = Utils.countChars(line, '}');
    //             nestedCurlyBraceDepth += openCurlies;
    //             nestedCurlyBraceDepth -= closeCurlies;

    //             // if we are in a nested class, and we just got back to nesting level 1,
    //             // then we are done with the nested class, and should set its props and methods.
    //             if (nestedCurlyBraceDepth == 1 && openCurlies != closeCurlies && cModels.size() > 1 && cModel != null) {
    //                 cModels.pop();
    //                 cModel = cModels.peek();
    //                 continue;
    //             }

    //             // ignore anything after an =. this avoids confusing properties with methods.
    //             offset = line.indexOf("=");
    //             if (offset > -1) {
    //                 line = line.substring(0, offset);
    //             }

    //             // ignore anything after an '{' (if we're not dealing with an enum)
    //             // this avoids confusing properties with methods.
    //             offset = !Utils.isEnum(line) ? line.indexOf("{") : -1;
    //             if (offset > -1) {
    //                 line = line.substring(0, offset);
    //             }

    //             // skip lines not dealing with scope that are not inner
    //             // classes, interface methods, or (assumed to be) @isTest
    //             if (Utils.shouldSkipLine(line, cModel)) {
    //                 // preserve skipped line, it may be an annotation
    //                 // line for a class, method, prop, or enum (though
    //                 // enums support few and are unlikely to have any)
    //                 previousLine = originalLine;
    //                 continue;
    //             }

    //             // look for a class.
    //             if (Utils.isClassOrInterface(line)) {
    //                 // create the new class
    //                 ClassModel cModelNew = new ClassModel(cModelParent, comments, line, lineNum);
    //                 Utils.parseAnnotations(previousLine, line, cModelNew);
    //                 comments.clear();

    //                 // keep track of the new class, as long as it wasn't a single liner {}
    //                 // but handle not having any curlies on the class line!
    //                 if (openCurlies == 0 || openCurlies != closeCurlies) {
    //                     cModels.push(cModelNew);
    //                     cModel = cModelNew;
    //                 }

    //                 // add it to its parent (or track the parent)
    //                 if (cModelParent != null) {
    //                     cModelParent.addChildClass(cModelNew);
    //                 } else {
    //                     cModelParent = cModelNew;
    //                 }

    //                 previousLine = null;
    //                 continue;
    //             }

    //             // look for an enum
    //             if (Utils.isEnum(line)) {
    //                 EnumModel eModel = new EnumModel(comments, line, lineNum);
    //                 Utils.parseAnnotations(previousLine, line, eModel);
    //                 comments.clear();

    //                 ArrayList<string> values = new ArrayList<string>();
    //                 string nameLine = eModel.getNameLine();
    //                 // one-liner enum
    //                 if (line.endsWith("}")) {
    //                     line = line.replace("}", "");
    //                     line = line.replace("{", "");
    //                     // isolate values of one-liner, split at comma & add to list
    //                     line = line.substring(line.indexOf(nameLine) + nameLine.length());
    //                     values.addAll(Arrays.asList(line.trim().split(",")));
    //                 }
    //                 // enum is over multiple lines
    //                 else {
    //                     // handle fist line, there may be multiple values on it
    //                     line = line.replace("{", "");
    //                     line = line.substring(line.indexOf(nameLine) + nameLine.length());
    //                     values.addAll(Arrays.asList(line.trim().split(",")));

    //                     // handle each additional line of enum
    //                     while (!line.contains("}")) {
    //                         line = reader.readLine();
    //                         lineNum++;
    //                         // in case opening curly is on the second line
    //                         // also handle replacing closing curly for last line
    //                         string valLine = line.replace("{", "");
    //                         valLine = valLine.replace("}", "");
    //                         values.addAll(Arrays.asList(valLine.trim().split(",")));
    //                     }
    //                 }

    //                 // add all enum values to model
    //                 values.stream().forEach(value -> {
    //                     if (!value.trim().isEmpty()) {
    //                         eModel.getValues().add(value.trim());
    //                     }
    //                 });

    //                 // if no class models have been created, and we see an
    //                 // enum, we must be dealing with a class level enum and
    //                 // should return early, otherwise we're dealing with
    //                 // an inner enum and should add to our class model.
    //                 if (cModel == null && cModels.size() == 0) {
    //                     reader.close();
    //                     inputStream.close();
    //                     return eModel;
    //                 } else {
    //                     cModel.getEnums().add(eModel);
    //                     previousLine = null;
    //                     continue;
    //                 }
    //             }

    //             // look for a method
    //             if (line.contains("(")) {
    //                 int startingLine = lineNum;

    //                 // deal with a method over multiple lines.
    //                 while (!line.contains(")")) {
    //                     line += reader.readLine();
    //                     lineNum++;
    //                 }

    //                 MethodModel mModel = new MethodModel(comments, line, startingLine);
    //                 Utils.parseAnnotations(previousLine, line, mModel);
    //                 cModel.getMethods().add(mModel);
    //                 comments.clear();
    //                 previousLine = null;
    //                 continue;
    //             }

    //             // handle set & get within the property
    //             if (line.contains(" get ") ||
    //                 line.contains(" set ") ||
    //                 line.contains(" get;") ||
    //                 line.contains(" set;") ||
    //                 line.contains(" get{") ||
    //                 line.contains(" set{")) {
    //                 previousLine = null;
    //                 continue;
    //             }

    //             // must be a property
    //             PropertyModel pModel = new PropertyModel(comments, line, lineNum);
    //             Utils.parseAnnotations(previousLine, line, pModel);
    //             cModel.getProperties().add(pModel);
    //             comments.clear();
    //             previousLine = null;
    //             continue;
    //         }

    //         // Close the input stream
    //         inputStream.close();
    //         // we only want to return the parent class
    //         return cModelParent;
    //     } catch (Exception ex) { // Catch exception if any
    //         Utils.log(ex);
    //         return null;
    //     }
    // }

    // argument guards


}

export default ApexDoc;