import { ApexDoc2Config } from '../extension';
import Config from './Config';
import Guards from '../utils/Guards';
import TopLevelModel from '../models/TopLevelModel';
import FileManager from './FileManager';
import * as vscode from 'vscode';
import { readFileSync } from 'fs';
import ClassModel from '../models/ClassModel';
import Utils from '../utils/Utils';

class ApexDoc {
    // constants
    private static COMMENT_CLOSE: string = "*/";
    private static COMMENT_OPEN: string = "/**";

    public static GLOBAL: string = "global";
    public static PUBLIC: string = "public";
    public static PROTECTED: string = "protected";
    public static PRIVATE: string = "private";
    public static TEST_METHOD: string = "testMethod";
    public static WEB_SERVICE: string = "webService";

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
    public static SCOPES: string[] = [ApexDoc.GLOBAL, ApexDoc.PUBLIC, ApexDoc.PRIVATE, ApexDoc.PROTECTED, ApexDoc.WEB_SERVICE, ApexDoc.TEST_METHOD];

    // non-constant properties

    // TODO: rename this!
    public static registerScope: string[];
    // private static FileManager fileManager;
    public static targetDirectory: string;
    private static numProcessed: number = 0;

    // public main routine which is used by both command line invocation and
    // Eclipse PlugIn invocation
    public static runApexDoc(config: Config): void {
        // TODO: replace StopWatch functionality

        // prepare arguments, ensure compliant
        let includes = config.includes || [];
        let excludes = config.excludes || [];
        this.registerScope = Guards.scope(config.scope);
        let sortOrder = Guards.sortOrder(config.sortOrder);
        let sourceControlURL = Guards.sourceURL(config.sourceControlURL);
        let showTOCSnippets = Guards.showTOCSnippets(config.showTOCSnippets);
        let targetDirectory = Guards.targetDirectory(config.targetDirectory);
        let homePagePath = Guards.directory(config.homePagePath, 'home_page');
        let bannerPagePath = Guards.directory(config.bannerPagePath, 'banner_page');
        let sourceDirectory = Guards.directory(config.sourceDirectory, 'source_directory');
        let documentTitle = Guards.typeGuard('string', config.title, 'title') ? config.title : '';

        // find all the files to parse`
        // TODO: implement file manager!
        let fileManager = new FileManager(targetDirectory);
        let files = fileManager.getFiles(sourceDirectory, includes, excludes);
        let modelMap = new Map<string, TopLevelModel>();
        let models: Array<TopLevelModel> = [];
        // fileManager.setDocumentTitle(documentTitle);

        // // set up document generator
        // DocGen.sortOrderStyle = sortOrder;
        // DocGen.sourceControlURL = sourceControlURL;
        // DocGen.showTOCSnippets = showTOCSnippets;
        console.log('sourceDirectory: ' + sourceDirectory);
        // // parse each file, creating a class or enum model for it
        files.forEach(fileName => {
            let filePath = sourceDirectory + '/' + fileName;
            // let model: TopLevelModel = parseFileContents(filePath);
            // modelMap.set(model.getName().toLowerCase(), model);
            // if (model) {
            //     models.push(model);
            //     this.numProcessed++;
            // }
        });

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
    //         if (contentPath !== null && !contentPath.isEmpty()) {
    //             contentPath = sourceDirectory + "/" + contentPath;
    //         }

    //         ClassGroup cg;
    //         if (group !== null) {
    //             cg = map.get(group);
    //             if (cg === null) {
    //                 cg = new ClassGroup(group, contentPath);
    //             } else if (cg.getContentSource() === null) {
    //                 cg.setContentSource(contentPath);
    //             }
    //             // put the new or potentially modified ClassGroup back in the map
    //             map.put(group, cg);
    //         }
    //     });

    //     return map;
    // }

    public static parseFileContents(filePath: string): TopLevelModel | void {
        try {
            // Get the object of DataInputStream
            let reader: string[] = readFileSync(filePath).toString('utf8').split(/(?:\r\n|\r|\n)/g);

            let nestedCurlyBraceDepth = 0, lineNum = 0;
            let line, originalLine, previousLine = '';
            let commentsStarted = false, docBlockStarted = false;

            let cModel: ClassModel, cModelParent: ClassModel;
            let comments: string[] = [];
            let cModels: Array<ClassModel> = [];

            for (line of reader) {
                originalLine = line;
                line = line.trim();
                lineNum++;

                if (line.length === 0) {
                    continue;
                }

                // ignore anything after // style comments. this allows hiding
                // of tokens from ApexDoc. However, don't ignore when line
                // doesn't start with //, we want to preserver @example comments
                let offset = line.indexOf("//");
                if (offset === 0) {
                    line = line.substring(0, offset);
                }

                // gather up our comments
                if (line.startsWith("/*")) {
                    commentsStarted = true;
                    let commentEnded = false;
                    if (line.startsWith(this.COMMENT_OPEN)) {
                        if (line.endsWith(this.COMMENT_CLOSE)) {
                            line = line.replace(this.COMMENT_CLOSE, this.DOC_BLOCK_BREAK);
                            commentEnded = true;
                        }
                        comments.push(line);
                        docBlockStarted = true;
                    }
                    if (line.endsWith(this.COMMENT_CLOSE) || commentEnded) {
                        commentsStarted = false;
                        docBlockStarted = false;
                    }
                    continue;
                }

                if (commentsStarted && line.endsWith(this.COMMENT_CLOSE)) {
                    line = line.replace(this.COMMENT_CLOSE, this.DOC_BLOCK_BREAK);
                    if (docBlockStarted) {
                        comments.push(line);
                        docBlockStarted = false;
                    }
                    commentsStarted = false;
                    continue;
                }

                if (commentsStarted) {
                    if (docBlockStarted) {
                        comments.push(line);
                    }
                    continue;
                }

                // keep track of our nesting so we know which class we are in
                let openCurlies = Utils.countChars(line, '{');
                let closeCurlies = Utils.countChars(line, '}');
                nestedCurlyBraceDepth += openCurlies;
                nestedCurlyBraceDepth -= closeCurlies;

                // if we are in a nested class, and we just got back to nesting level 1,
                // then we are done with the nested class, and should set its props and methods.
                if (nestedCurlyBraceDepth === 1 && openCurlies !== closeCurlies && cModels.length > 1 && cModel !== null) {
                    cModels.pop();
                    cModel = cModels[cModels.length - 1];
                    continue;
                }

                // ignore anything after an =. this avoids confusing properties with methods.
                offset = line.indexOf('=');
                if (offset > -1) {
                    line = line.substring(0, offset);
                }

                // ignore anything after an '{' (if we're not dealing with an enum)
                // this avoids confusing properties with methods.
                offset = !Utils.isEnum(line) ? line.indexOf("{") : -1;
                if (offset > -1) {
                    line = line.substring(0, offset);
                }
            } // DELETE THIS BRACKET TO PICKUP WHERE YOU LEFT OFF!

            //     // skip lines not dealing with scope that are not inner
            //     // classes, interface methods, or (assumed to be) @isTest
            //     if (Utils.shouldSkipLine(line, cModel)) {
            //         // preserve skipped line, it may be an annotation
            //         // line for a class, method, prop, or enum (though
            //         // enums support few and are unlikely to have any)
            //         previousLine = originalLine;
            //         continue;
            //     }

            //     // look for a class.
            //     if (Utils.isClassOrInterface(line)) {
            //         // create the new class
            //         ClassModel cModelNew = new ClassModel(cModelParent, comments, line, lineNum);
            //         Utils.parseAnnotations(previousLine, line, cModelNew);
            //         comments.clear();

            //         // keep track of the new class, as long as it wasn't a single liner {}
            //         // but handle not having any curlies on the class line!
            //         if (openCurlies === 0 || openCurlies !== closeCurlies) {
            //             cModels.push(cModelNew);
            //             cModel = cModelNew;
            //         }

            //         // add it to its parent (or track the parent)
            //         if (cModelParent !== null) {
            //             cModelParent.addChildClass(cModelNew);
            //         } else {
            //             cModelParent = cModelNew;
            //         }

            //         previousLine = null;
            //         continue;
            //     }

            //     // look for an enum
            //     if (Utils.isEnum(line)) {
            //         EnumModel eModel = new EnumModel(comments, line, lineNum);
            //         Utils.parseAnnotations(previousLine, line, eModel);
            //         comments.clear();

            //         ArrayList<string> values = new ArrayList<string>();
            //         string nameLine = eModel.getNameLine();
            //         // one-liner enum
            //         if (line.endsWith("}")) {
            //             line = line.replace("}", "");
            //             line = line.replace("{", "");
            //             // isolate values of one-liner, split at comma & add to list
            //             line = line.substring(line.indexOf(nameLine) + nameLine.length());
            //             values.addAll(Arrays.asList(line.trim().split(",")));
            //         }
            //         // enum is over multiple lines
            //         else {
            //             // handle fist line, there may be multiple values on it
            //             line = line.replace("{", "");
            //             line = line.substring(line.indexOf(nameLine) + nameLine.length());
            //             values.addAll(Arrays.asList(line.trim().split(",")));

            //             // handle each additional line of enum
            //             while (!line.contains("}")) {
            //                 line = reader.readLine();
            //                 lineNum++;
            //                 // in case opening curly is on the second line
            //                 // also handle replacing closing curly for last line
            //                 string valLine = line.replace("{", "");
            //                 valLine = valLine.replace("}", "");
            //                 values.addAll(Arrays.asList(valLine.trim().split(",")));
            //             }
            //         }

            //         // add all enum values to model
            //         values.stream().forEach(value -> {
            //             if (!value.trim().isEmpty()) {
            //                 eModel.getValues().add(value.trim());
            //             }
            //         });

            //         // if no class models have been created, and we see an
            //         // enum, we must be dealing with a class level enum and
            //         // should return early, otherwise we're dealing with
            //         // an inner enum and should add to our class model.
            //         if (cModel === null && cModels.length === 0) {
            //             reader.close();
            //             inputStream.close();
            //             return eModel;
            //         } else {
            //             cModel.getEnums().add(eModel);
            //             previousLine = null;
            //             continue;
            //         }
            //     }

            //     // look for a method
            //     if (line.contains("(")) {
            //         int startingLine = lineNum;

            //         // deal with a method over multiple lines.
            //         while (!line.contains(")")) {
            //             line += reader.readLine();
            //             lineNum++;
            //         }

            //         MethodModel mModel = new MethodModel(comments, line, startingLine);
            //         Utils.parseAnnotations(previousLine, line, mModel);
            //         cModel.getMethods().add(mModel);
            //         comments.clear();
            //         previousLine = null;
            //         continue;
            //     }

            //     // handle set & get within the property
            //     if (line.contains(" get ") ||
            //         line.contains(" set ") ||
            //         line.contains(" get;") ||
            //         line.contains(" set;") ||
            //         line.contains(" get{") ||
            //         line.contains(" set{")) {
            //         previousLine = null;
            //         continue;
            //     }

            //     // must be a property
            //     PropertyModel pModel = new PropertyModel(comments, line, lineNum);
            //     Utils.parseAnnotations(previousLine, line, pModel);
            //     cModel.getProperties().add(pModel);
            //     comments.clear();
            //     previousLine = null;
            //     continue;
            // }

            // // Close the input stream
            // inputStream.close();
            // // we only want to return the parent class
            // return cModelParent;
        } catch (ex) { // Catch exception if any
            // Utils.log(ex);
            // return null;
        }
    }

    // argument guards


}

export default ApexDoc;