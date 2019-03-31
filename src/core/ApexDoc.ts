import { last } from 'lodash';
import { readFileSync } from 'fs';
import ClassModel from '../models/ClassModel';
import Config from './Config';
import EnumModel from '../models/EnumModel';
import FileManager from './FileManager';
import Guards, { ApexDocError } from '../utils/Guards';
import MethodModel from '../models/MethodModel';
import PropertyModel from '../models/PropertyModel';
import TopLevelModel from '../models/TopLevelModel';
import Utils from '../utils/Utils';
import ClassGroup from '../models/ClassGroup';
import LineReader from '../utils/LineReader';

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
    public static currentFile: string;
    private static numProcessed: number = 0;

    // public main routine which is used by both command line invocation and
    // Eclipse PlugIn invocation
    public static runApexDoc(config: Config): void {
        // TODO: replace StopWatch functionality

        // prepare arguments, ensure compliant
        this.registerScope = Guards.scope(config.scope);
        this.targetDirectory = Guards.targetDirectory(config.targetDirectory);

        let includes = config.includes || [];
        let excludes = config.excludes || [];
        let sortOrder = Guards.sortOrder(config.sortOrder);
        let sourceControlURL = Guards.sourceURL(config.sourceControlURL);
        let showTOCSnippets = Guards.showTOCSnippets(config.showTOCSnippets);
        let homePagePath = Guards.directory(config.homePagePath, 'home_page');
        let bannerPagePath = Guards.directory(config.bannerPagePath, 'banner_page');
        let sourceDirectory = Guards.directory(config.sourceDirectory, 'source_directory');
        let documentTitle = Guards.typeGuard('string', config.title, 'title') ? config.title : '';

        // find all the files to parse`
        // TODO: implement file manager!
        let fileManager = new FileManager(this.targetDirectory);
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
            this.currentFile = fileName;
            let filePath = sourceDirectory + '/' + fileName;
            let model: TopLevelModel = this.parseFileContents(filePath);
            modelMap.set(model.getName().toLowerCase(), model);
            if (model) {
                models.push(model);
                this.numProcessed++;
            }
        });

        console.log('lets check these models out!');

        // // create our Groups
        const classGroupMap: Map<string, ClassGroup> = this.createClassGroupMap(models, sourceDirectory);

        // // load up optional specified file templates
        // string bannerContents = fileManager.parseHTMLFile(bannerPagePath);
        // string homeContents = fileManager.parseHTMLFile(homePagePath);

        // // create our set of HTML files
        // fileManager.createDocs(classGroupMap, modelMap, models, bannerContents, homeContents);

        // // we are done!
        // timer.stop();
        // Utils.log('ApexDoc2 complete! " + numProcessed + " Apex files processed in " + timer.getTime() + " ms.');
        // System.exit(0);
    }

    private static createClassGroupMap(models: Array<TopLevelModel>, sourceDirectory: string): Map<string, ClassGroup> {
        const map: Map<string, ClassGroup> = new Map<string, ClassGroup>();

        models.forEach(model => {
            let group = model.getGroupName();
            let contentPath = model.getGroupContentPath();
            if (contentPath) {
                contentPath = sourceDirectory + "/" + contentPath;
            }

            let cg: ClassGroup | undefined;
            if (group) {
                cg = map.get(group);
                if (!cg) {
                    cg = new ClassGroup(group, contentPath);
                } else if (!cg.getContentSource()) {
                    cg.setContentSource(contentPath);
                }
                map.set(group, cg);
            }
        });

        return map;
    }

    public static parseFileContents(filePath: string): TopLevelModel {
        const reader = new LineReader(filePath);

        let nestedCurlyBraceDepth = 0, lineNum = 0;
        let line: string | null;
        let commentsStarted = false, docBlockStarted = false;

        const cModels: Array<ClassModel> = [];
        let cModel: ClassModel | undefined, cModelParent: ClassModel | undefined;
        let comments: string[] = [];

        while ((line = reader.readLine()) !== null) {
            // skip empty lines and rogue undefined strings
            if (typeof line !== 'string' || !line.trim()) {
                continue;
            }

            line = line.trim();
            lineNum++;

            // ignore anything after // style comments. this allows hiding
            // of tokens from ApexDoc. However, don't ignore when line
            // doesn't start with //, we want to preserver @example comments
            let offset = line.indexOf('//');
            if (offset === 0) {
                line = line.substring(0, offset);
                if (!line.trim()) {
                    continue;
                }
            }

            // gather up our comments
            if (line.startsWith('/*')) {
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
            if (nestedCurlyBraceDepth === 1 && openCurlies !== closeCurlies && cModels.length > 1 && cModel) {
                cModels.pop();
                cModel = last(cModels);
                continue;
            }

            // ignore anything after an =. this avoids confusing properties with methods.
            offset = line.indexOf('=');
            if (offset > -1) {
                line = line.substring(0, offset);
            }

            // ignore anything after an '{' (if we're not dealing with an enum)
            // this avoids confusing properties with methods.
            offset = !Utils.isEnum(line) ? line.indexOf('{') : -1;
            if (offset > -1) {
                line = line.substring(0, offset);
            }

            // skip lines not dealing with scope that are not inner
            // classes, interface methods, or (assumed to be) @isTest
            if (Utils.shouldSkipLine(line, cModel)) {
                continue;
            }

            // look for a class.
            if (Utils.isClassOrInterface(line)) {
                // create the new class
                let cModelNew: ClassModel = new ClassModel(cModelParent, comments, line, lineNum);
                Utils.parseAnnotations(<string>reader.peekPrevLine(), line, cModelNew);
                comments = [];

                // keep track of the new class, as long as it wasn't a single liner {}
                // but handle not having any curlies on the class line!
                if (openCurlies === 0 || openCurlies !== closeCurlies) {
                    cModels.push(cModelNew);
                    cModel = cModelNew;
                }

                // add it to its parent (or track the parent)
                if (cModelParent) {
                    cModelParent.addChildClass(cModelNew);
                } else {
                    cModelParent = cModelNew;
                }

                // previousLine = '';
                continue;
            }

            // look for an enum
            if (Utils.isEnum(line)) {
                let startingLine = lineNum;

                // handle enums over multiple lines
                while (!line.includes('}')) {
                    line += reader.readLine();
                    lineNum++;
                }

                let eModel: EnumModel = new EnumModel(comments, line, startingLine);
                Utils.parseAnnotations(<string>reader.peekPrevLine(), line, eModel);

                // if no class models have been created, and we see an
                // enum, we must be dealing with a class level enum and
                // should return early, otherwise we're dealing with
                // an inner enum and should add to our class model.
                if (cModel && cModels.length === 0) {
                    return eModel;
                } else {
                    cModel && cModel.getEnums().push(eModel);
                    // previousLine = '';
                    comments = [];
                    continue;
                }
            }

            // look for a method
            if (line.includes('(')) {
                let startingLine = lineNum;

                // handle methods over multiple lines.
                while (!line.includes(')')) {
                    line += reader.readLine();
                    lineNum++;
                }

                let mModel: MethodModel = new MethodModel(comments, line, startingLine);
                Utils.parseAnnotations(<string>reader.peekPrevLine(), line, mModel);
                cModel && cModel.getMethods().push(mModel);
                comments = [];
                // previousLine = '';
                continue;
            }

            // handle set & get within the property
            // TODO: none of these should ever evaluate to true!
            // shouldSkipLne should skip these lines. test this.
            if (line.includes(' get ') ||
                line.includes(' set ') ||
                line.includes(' get;') ||
                line.includes(' set;') ||
                line.includes(' get{') ||
                line.includes(' set{')) {
                // previousLine = '';
                continue;
            }

            // must be a property
            let pModel: PropertyModel = new PropertyModel(comments, line, lineNum);
            Utils.parseAnnotations(<string>reader.peekPrevLine(), line, pModel);
            cModel && cModel.getProperties().push(pModel);
            comments = [];
            // previousLine = '';
            continue;
        }

        return <TopLevelModel>cModelParent;
    }

    // private static makeLineReader(filePath: string): LineReader {
    //     try {
    //         let lines: string[] = readFileSync(filePath).toString('utf8').split(/(?:\r\n|\r|\n)/g);
    //         let nextIndex = 0, end = lines.length;

    //         const lineReader: LineReader = {
    //             readLine: function() {
    //                 let result;
    //                 if (nextIndex <= end) {
    //                     result = lines[nextIndex];
    //                     nextIndex++;
    //                     return result;
    //                 }

    //                 lines = [];
    //                 return null;
    //             }
    //         };

    //         return lineReader;
    //     } catch (e) {
    //         throw new ApexDocError(e);
    //     }
    // }
}

export default ApexDoc;