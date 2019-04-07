import * as vscode from 'vscode';
import ClassGroup from '../models/ClassGroup';
import ClassModel from '../models/ClassModel';
import DocGen from './DocGen';
import EnumModel from '../models/EnumModel';
import FileManager from './FileManager';
import LineReader from '../utils/LineReader';
import MethodModel from '../models/MethodModel';
import PropertyModel from '../models/PropertyModel';
import TopLevelModel from '../models/TopLevelModel';
import Utils, { last } from '../utils/Utils';
import { IApexDocConfig } from './Config';
import { performance } from 'perf_hooks';
import { resolve } from 'path';

class ApexDoc {
    // constants
    public static readonly GLOBAL: string = "global";
    public static readonly PUBLIC: string = "public";
    public static readonly PROTECTED: string = "protected";
    public static readonly PRIVATE: string = "private";
    public static readonly TEST_METHOD: string = "testMethod";
    public static readonly WEB_SERVICE: string = "webService";
    public static readonly SCOPES: string[] = [
        ApexDoc.GLOBAL, ApexDoc.PUBLIC, ApexDoc.PRIVATE,
        ApexDoc.PROTECTED, ApexDoc.WEB_SERVICE, ApexDoc.TEST_METHOD
    ];

    public static readonly CLASS: string = "class";
    public static readonly ENUM: string = "enum";
    public static readonly INTERFACE: string = "interface";
    public static readonly ORDER_ALPHA: string = "alpha";
    public static readonly ORDER_LOGICAL: string = "logical";

    // use special token for marking the end of a doc block
    // comment. Now that we're supporting multi-line for all
    // tokens and using a common comment parser, the parser
    // must know when a block ends in order to prevent weird
    // behavior when lesser scopes than available are indicated
    // e.g. private;public when there are protected methods
    public static readonly DOC_BLOCK_BREAK: string = "@@BREAK@@";
    private static readonly COMMENT_CLOSE: string = "*/";
    private static readonly COMMENT_OPEN: string = "/**";

    // static members
    public static extensionRoot: string;
    public static currentFile: string;
    public static config: IApexDocConfig;

    /**
     * Entry point for the program. Called by VSCode on extension activation.
     *
     * @param config The configuration collected from the users config,
     * supplemented with any defaults if user did not include them.
     */
    public static runApexDoc(config: IApexDocConfig): void {
        try {
            // time ApexDoc2
            const beginElapsed = performance.now();

            this.config = config;
            const fileManager = new FileManager(config.targetDirectory, config.title, config.assets);
            const files = fileManager.getFiles(config.sourceDirectory, config.includes, config.excludes);
            const modelMap = new Map<string, TopLevelModel>();
            const models: Array<TopLevelModel> = [];

            // set up document generator
            DocGen.sortOrderStyle = config.sortOrder;
            DocGen.sourceControlURL = config.sourceControlURL;
            DocGen.showTOCSnippets = config.showTOCSnippets;

            // track the number of files we've processed
            let numProcessed = 0;

            // parse our top-level class files
            files.forEach(fileName => {
                this.currentFile = fileName;
                const filePath = resolve(...[config.sourceDirectory, fileName]);
                const model = this.parseFileContents(filePath);
                modelMap.set(model.getName().toLowerCase(), model);
                if (model) {
                    models.push(model);
                    numProcessed++;
                }
            });

            // load up optional specified file templates and create class groups for menu
            const homeContents = fileManager.parseHTMLFile(config.homePagePath);
            const bannerContents = fileManager.parseHTMLFile(config.bannerPagePath);
            const classGroupMap = this.createClassGroupMap(models, config.sourceDirectory);

            // create our set of HTML files
            fileManager.createDocs(classGroupMap, modelMap, models, bannerContents, homeContents);

            // we are done!
            const endElapsed = performance.now();
            vscode.window.showInformationMessage(
                `ApexDoc2 complete! ${numProcessed} Apex files processed in ${endElapsed - beginElapsed} ms.`
            );
        } catch (err) {
            throw err;
        }
    }

    private static createClassGroupMap(models: Array<TopLevelModel>, sourceDirectory: string): Map<string, ClassGroup> {
        const map: Map<string, ClassGroup> = new Map<string, ClassGroup>();

        models.forEach(model => {
            const group = model.getGroupName();
            let contentPath = model.getGroupContentPath();
            if (contentPath) {
                contentPath = resolve(...[sourceDirectory, contentPath]);
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

    /**
     * The main routine for parsing our Apex files. Here we collect ApexDoc comments, and create
     * models of our top-level types (Classes and Enums) and their members (Enum values, Methods,
     * Properties, Inner Classes, etc.).
     *
     * @param filePath The path of the file being parsed
     */
    public static parseFileContents(filePath: string): TopLevelModel {
        const reader = new LineReader(filePath);

        let nestedCurlyBraceDepth = 0, lineNum = 0;
        let line: string | null;
        let commentsStarted = false, docBlockStarted = false;

        const cModels: Array<ClassModel> = [];
        let cModel: ClassModel | undefined, cModelParent: ClassModel | undefined;
        let comments: string[] = [];

        while ((line = reader.readLine()) !== null) {
            line = line.trim();
            lineNum++;

            // skip empty lines
            if (!line.trim()) {
                continue;
            }

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
                continue;
            }

            // must be a property
            let pModel: PropertyModel = new PropertyModel(comments, line, lineNum);
            Utils.parseAnnotations(<string>reader.peekPrevLine(), line, pModel);
            cModel && cModel.getProperties().push(pModel);
            comments = [];
            continue;
        }

        return <TopLevelModel>cModelParent;
    }
}

export default ApexDoc;