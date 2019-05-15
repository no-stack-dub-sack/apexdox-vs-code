import * as Models from '../common/models';
import FileManager from './FileManager';
import GeneratorUtils from './generators/GeneratorUtils';
import LineReader from './LineReader';
import Utils, { last, Option } from '../common/Utils';
import { basename } from 'path';
import { IApexDocConfig } from '../common/Settings';
import { performance } from 'perf_hooks';
import { window } from 'vscode';

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
    // tags and using a common comment parser, the parser
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

    // flag will be set to true when we're
    // running the comment stubbing command
    public static isStub: boolean = false;

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
            const files = fileManager.getFiles(config.source, config.includes, config.excludes);
            const models = new Map<string, Models.TopLevelModel>();

            // track the number of files we've processed
            let numProcessed = 0;

            // parse our top-level class files
            files.forEach(entry => {
                this.currentFile = basename(entry.path);

                const model = this.parseFileContents(entry.path, entry.sourceUrl);

                if (model) {
                    models.set(model.name.toLowerCase(), model);
                    numProcessed++;
                }
            });

            // load up optional templates and create class groups for menu
            const bannerContents = fileManager.parseHTMLFile(config.bannerPagePath);
            const supplementaryPages = [config.homePagePath, ...config.pages];
            const classGroupMap = this.createClassGroupMap(models);

            // run our documentation engine and create set of HTML files
            fileManager.createDocs(classGroupMap, models, bannerContents, supplementaryPages);

            // we are done!
            const endElapsed = performance.now();
            const elapsed = ((endElapsed - beginElapsed) / 1000).toFixed(2);
            window.showInformationMessage(`ApexDoc2 complete! ${numProcessed} Apex files documented in ${elapsed}s.`);
        } catch (err) {
            throw err;
        }
    }

    private static createClassGroupMap(models: Map<string, Models.TopLevelModel>): Map<string, Models.ClassGroup> {
        const classGroupMap: Map<string, Models.ClassGroup> = new Map<string, Models.ClassGroup>();

        models.forEach(model => {
            // if group name is falsy, default to this misc bucket
            // un-grouped classes will be placed under this menu
            const group = model.groupName || 'Miscellaneous'
                , contentPath = model.groupContentPath;

            let classGroup = classGroupMap.get(group);

            if (!classGroup) {
                classGroup = new Models.ClassGroup(group, contentPath);
            } else if (!classGroup.contentSource) {
                classGroup.contentSource = contentPath;
            }

            classGroupMap.set(group, classGroup);
        });

        return classGroupMap;
    }

    /**
     * The main routine for parsing our Apex files. Here we collect ApexDoc comments, and create
     * models of our top-level types (Classes and Enums) and their members (Enum values, Methods,
     * Properties, Inner Classes, etc.).
     *
     * @param filePath The path of the file being parsed
     */
    public static parseFileContents(filePath: string, sourceUrl: Option<string>): Models.TopLevelModel {
        const reader = new LineReader(filePath);
        const cModels = new Array<Models.ClassModel>();

        let line: Option<string, null>;
        let comments = new Array<string>();
        let lineNum = 0, nestedCurlyBraceDepth = 0;
        let commentsStarted = false, docBlockStarted = false;
        let cModel: Option<Models.ClassModel>, cModelParent: Option<Models.ClassModel>;

        while ((line = reader.readLine()) !== null) {
            line = line.trim();
            lineNum++;

            // skip empty lines
            if (!line.trim()) {
                continue;
            }

            // ignore anything after // style comments. this allows hiding
            // of tags from ApexDoc. However, don't ignore when line
            // doesn't start with //, we want to preserve comments within
            // @example code examples
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
                let cModelNew: Models.ClassModel = new Models.ClassModel(cModelParent, comments, line, lineNum, sourceUrl);
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

                let eModel: Models.EnumModel = new Models.EnumModel(comments, line, startingLine, sourceUrl);
                Utils.parseAnnotations(<string>reader.peekPrevLine(), line, eModel);

                // if no class models have been created, and we see an
                // enum, we must be dealing with a class level enum and
                // should return early, otherwise we're dealing with
                // an inner enum and should add to our class model.
                if (!cModel && cModels.length === 0) {
                    return eModel;
                } else {
                    cModel && cModel.enums.push(eModel);
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

                let mModel: Models.MethodModel = new Models.MethodModel(comments, line, startingLine, sourceUrl);
                Utils.parseAnnotations(<string>reader.peekPrevLine(), line, mModel);
                cModel && cModel.methods.push(mModel);
                comments = [];
                continue;
            }

            // must be a property
            let pModel: Models.PropertyModel = new Models.PropertyModel(comments, line, lineNum, sourceUrl);
            Utils.parseAnnotations(<string>reader.peekPrevLine(), line, pModel);
            cModel && cModel.properties.push(pModel);
            comments = [];
            continue;
        }

        return <Models.TopLevelModel>cModelParent;
    }
}

export default ApexDoc;