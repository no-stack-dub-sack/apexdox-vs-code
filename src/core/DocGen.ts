import * as HTML from '../utils/HTML';
import ApexDoc from './ApexDoc';
import ApexDocError from '../utils/ApexDocError';
import ApexModel from '../models/ApexModel';
import ClassGroup from '../models/ClassGroup';
import ClassModel from '../models/ClassModel';
import EnumModel from '../models/EnumModel';
import escape from 'lodash.escape';
import MethodModel from '../models/MethodModel';
import TopLevelModel, { ModelType } from '../models/TopLevelModel';
import Utils from '../utils/Utils';

class DocGen {
    public static sortOrderStyle: string;
    public static sourceControlURL: string;
    public static showTOCSnippets: boolean;

    public static documentClass(cModel: ClassModel, modelMap: Map<string, TopLevelModel>, models: Array<TopLevelModel>): string {
        const hasSource = this.sourceControlURL ? true : false;
        const sourceLinkIcon = hasSource ? `<span>${HTML.EXTERNAL_LINK}</span>` : '';
        const sectionSourceLink = this.maybeMakeSourceLink(cModel, cModel.getTopmostClassName(), this.escapeHTML(cModel.getName(), false));
        const header = `<h2 class="sectionTitle" id="${cModel.getName()}">${sectionSourceLink + sourceLinkIcon}</h2>`;

        let contents = this.documentTopLevelAttributes(cModel, modelMap, models, cModel.getTopmostClassName(), '');

        if (cModel.getProperties().length > 0) {
            contents += this.documentProperties(cModel);
        }

        if (cModel.getEnums().length > 0) {
            contents += this.documentInnerEnums(cModel);
        }

        if (cModel.getMethods().length > 0) {
            contents += this.documentMethods(cModel, modelMap, models);
        }

        return this.wrapInDetailsTag(contents, header, 'section');
    }

    public static documentEnum(eModel: EnumModel, modelMap: Map<string, TopLevelModel>, models: Array<TopLevelModel>): string {
        const hasSource = this.sourceControlURL ? true : false;
        const sourceLinkIcon = hasSource ? `<span>${HTML.EXTERNAL_LINK}</span>` : '';
        const sectionSourceLink = this.maybeMakeSourceLink(eModel, eModel.getName(), this.escapeHTML(eModel.getName(), false));
        let contents = `<h2 class="sectionTitle" id="${eModel.getName()}">${sectionSourceLink + sourceLinkIcon}</h2>`;

        let values = '<p /><table class="attrTable">';
        values += '<tr><th>Values</th></tr><tr>';
        values += `<td class="enumValues">${eModel.getValues().join(', ')}</td>`;
        values += '</tr></table>';

        contents += this.documentTopLevelAttributes(eModel, modelMap, models, eModel.getName(), values);

        return contents;
    }

    private static documentTopLevelAttributes(model: TopLevelModel, modelMap: Map<string, TopLevelModel>, models: Array<TopLevelModel>, className: string, additionalContent: string): string {
        const classSourceLink = this.maybeMakeSourceLink(model, className, this.escapeHTML(model.getNameLine(), false));
        let contents = '';

        if (model.getAnnotations().length > 0) {
            contents += `<div class="classAnnotations">${model.getAnnotations().join(' ')}</div>`;
        }

        contents += `<div class="classSignature">${classSourceLink}</div>`;

        if (model.getDescription()) {
            contents += `<div class="classDetails"><div>${this.escapeHTML(model.getDescription(), true)}</div>`;
        }

        // add any additional content passed in from the caller. currently, only
        // use case is the values table used when documenting class-level enums
        if (additionalContent) {
            contents += additionalContent;
        }

        if (model.getDeprecated()) {
            contents +='<div class="classSubtitle deprecated">Deprecated</div>';
            contents += `<div class="classSubDescription">${this.escapeHTML(model.getDeprecated(), true)}</div>`;
        }

        if (model.getSee()) {
            contents += '<div class="classSubtitle">See</div>';
            contents += `<div class="classSubDescription">${this.makeSeeLinks(modelMap, models, model.getSee())}</div>`;
        }

        if (model.getAuthor()) {
            contents += `<br/>${this.escapeHTML(model.getAuthor(), false)}`;
        }

        if (model.getDate()) {
            contents += `<br/>${this.escapeHTML(model.getDate(), false)}`;
        }

        if (model.getExample()) {
            contents += '<div class="classSubTitle">Example</div>';
            contents += `<pre class="codeExample"><code>${this.escapeHTML(model.getExample(), false)}</code></pre>`;
        }

        contents += '</div><p/>';

        return contents;
    }

    private static documentProperties(cModel: ClassModel): string {
        let contents = '';
        // retrieve properties to work with in the order user specifies
        const properties = this.sortOrderStyle === ApexDoc.ORDER_ALPHA
            ? cModel.getPropertiesSorted()
            : cModel.getProperties();

        // start Properties
        contents += '<div class="subsectionContainer">';
        contents += '<table class="attrTable properties">';

        // iterate once first to determine if we need to
        // build annotations and and description columns
        let descriptionCol = '', annotationsCol = '';
        for (let prop of properties) {
            if (prop.getDescription()) {
                descriptionCol = '<th>Description</th>';
            }
            if (prop.getAnnotations().length > 0) {
                annotationsCol = '<th>Annotations</th>';
            }
        }

        contents += `<tr><th>Name</th><th>Signature</th>${annotationsCol}${descriptionCol}</tr>`;

        for (let prop of properties) {
            const nameLine = Utils.highlightNameLine(prop.getNameLine());
            const propSourceLink = this.maybeMakeSourceLink(prop, cModel.getTopmostClassName(), nameLine);

            contents += `<tr class="property ${prop.getScope()}">`;
            contents += `<td class="attrName">${prop.getPropertyName()}</td>`;
            contents += `<td><div class="attrSignature">${propSourceLink}</div></td>`;

            if (annotationsCol) {
                contents += `<td><div class="propAnnotations">${prop.getAnnotations().join(', ')}</div></td>`;
            }

            // if any property has a description build out the third column
            if (descriptionCol) {
                contents += `<td><div class="attrDescription">${this.escapeHTML(prop.getDescription(), true)}</div></td>`;
            }

            contents += '</tr>';
        }
        // end Properties
        contents += '</table></div>';
        contents += '<p/>';

        return this.wrapInDetailsTag(contents, '<h2 class="subsectionTitle properties">Properties</h2>', 'subSection');
    }

    private static documentInnerEnums(cModel: ClassModel): string {
        let contents = '';
        const enums = this.sortOrderStyle === ApexDoc.ORDER_ALPHA
            ? cModel.getEnumsSorted()
            : cModel.getEnums();

        // start Properties
        contents += '<div class="subsectionContainer">' +
                    '<table class="attrTable enums">';

        // iterate once first to determine if we need to build the third column in the table
        let descriptionCol = '';
        for (let Enum of enums) {
            if (Enum.getDescription()) {
                descriptionCol = '<th>Description</th>';
            }
        }

        contents += `<tr><th>Name</th><th>Signature</th><th>Values</th>${descriptionCol}</tr>`;

        for (let Enum of enums) {
            const nameLine = Utils.highlightNameLine(Enum.getNameLine());
            const propSourceLink = this.maybeMakeSourceLink(Enum, cModel.getTopmostClassName(), nameLine);
            contents += `<tr class="enum " ${Enum.getScope()}">`;
            contents += `<td class="attrName">${Enum.getName()}</td>`;
            contents += `<td><div class="attrSignature">${propSourceLink}</div></td>`;
            contents += `<td class="enumValues">${Enum.getValues().join(', ')}</td>`;

            // if any property has a description build out the third column
            if (descriptionCol) {
                contents += `<td><div class="attrDescription">${this.escapeHTML(Enum.getDescription(), true)}</div></td>`;
            }

            contents += '</tr>';
        }
        // end Properties
        contents += '</table></div><p/>';

        return this.wrapInDetailsTag(contents, '<h2 class="subsectionTitle enums">Enums</h2>', 'subSection');
    }

    private static documentMethods(cModel: ClassModel, modelMap: Map<string, TopLevelModel>, models: Array<TopLevelModel>): string {
        // track Ids used to make sure we're not generating duplicate
        // Ids within this class, and so that overloaded methods each
        // have their own unique anchor to link to in the TOC.
        const idCountMap = new Map<string, number>();

        // Local fucntion to make TOC entry and other variables we need to make HTML
        const describeMethod = (method: MethodModel): {
            tocEntry: string;
            isDeprecated: boolean;
            methodName: string;
            methodId: string;
        } => {
            // Get method id, i.e. the fully qualified method name.
            // Then see if this ID has been used previously in this class
            // (must be an overloaded method or constructor) and ammend
            // as needed to ensure all of our methods have unique IDs
            let methodId = cModel.getName() + '.' + method.getMethodName();
            let count: number | undefined;
            if ((count = idCountMap.get(methodId)) === undefined) {
                idCountMap.set(methodId, 1);
            } else {
                idCountMap.set(methodId, count + 1);
                methodId += '_' + count;
            }

            // if method is constructor, append <init>
            let methodName = method.getMethodName();
            if (methodName.toLowerCase() === cModel.getName().toLowerCase()) {
                methodName += '.&lt;init&gt;';
            }

            const isDeprecated = method.getDeprecated().length > 0;

            // make TOC entry with variables we just calculated
            let entry = `<li class="method ${method.getScope()}">` +
                `<a class="methodTOCEntry ${(isDeprecated ? 'deprecated' : '')}"` +
                `href="#${methodId}">${methodName}</a>`;

            // do not render description in TOC if user has indicated to hide
            if (this.showTOCSnippets && method.getDescription()) {
                entry += `<div class="methodTOCDescription">${method.getDescription()}</div>`;
            }

            return {
                tocEntry: entry += '</li>',
                isDeprecated,
                methodName,
                methodId,
            };
        };

        // retrieve methods to work with in the order user specifies
        const methods = this.sortOrderStyle === ApexDoc.ORDER_ALPHA
            ? cModel.getMethodsSorted()
            : cModel.getMethods();

        // start Methods
        let contents = '<div class="methodsContainer">';
        let tocHTML = '<ul class="methodTOC">';
        let methodsHTML = '';

        // full method display
        for (let method of methods) {
            // get the TOC entry and other variables we need to make HTML
            const { methodId, methodName, isDeprecated, tocEntry } = describeMethod(method);
            const nameLine = Utils.highlightNameLine(this.escapeHTML(method.getNameLine(), false));
            const methodSourceLink = this.maybeMakeSourceLink(method, cModel.getTopmostClassName(), nameLine);

            // concat entry HTML
            tocHTML += tocEntry;
            // open current method
            methodsHTML += `<div class="method ${method.getScope()}">`;
            // use fully qualified method name as ID to prevent from TOCs in the same file linking
            // to the same method. For example, an abstract class and a calss which extends that
            // class in the same file are likely to have the same methods and thus conflicting IDs.
            methodsHTML += `<h2 class="methodHeader ${(isDeprecated ? 'deprecated' : '')}" id="${methodId}">${methodName}</h2>`;

            if (method.getAnnotations().length > 0) {
                methodsHTML += `<div class="methodAnnotations">${method.getAnnotations().join(' ')}</div>`;
            }

            methodsHTML += `<div class="methodSignature">${methodSourceLink}</div>`;

            if (method.getDescription()) {
                methodsHTML += `<div class="methodDescription">${this.escapeHTML(method.getDescription(), true)}</div>`;
            }

            if (isDeprecated) {
                methodsHTML +='<div class="methodSubTitle deprecated">Deprecated</div>';
                methodsHTML += `<div class="methodSubDescription">${this.escapeHTML(method.getDeprecated(), true)}</div>`;
            }

            if (method.getParams().length > 0) {
                // @param someParam This is the params description.
                methodsHTML += '<div class="methodSubTitle">Parameters</div>';
                for (let param of method.getParams()) {
                    param = this.escapeHTML(param, true).trim();
                    if (param) {
                        let paramName: string;
                        let paramDescription: string;
                        const match: RegExpExecArray | null = /\s/.exec(param);

                        if (match !== null) {
                            const idx = match.index;
                            paramName = param.substring(0, idx);
                            paramDescription = param.substring(idx + 1);
                        } else {
                            paramName = param;
                            paramDescription = '';
                        }

                        methodsHTML += `<div class="paramName">${paramName}</div>`;

                        if (paramDescription) {
                            methodsHTML += `<div class="paramDescription">${paramDescription}</div>`;
                        }
                    }
                }
                // end Parameters
            }

            if (method.getReturns()) {
                methodsHTML += '<div class="methodSubTitle">Return Value</div>';
                methodsHTML += `<div class="methodSubDescription">${this.escapeHTML(method.getReturns(), true)}</div>`;
            }

            if (method.getException()) {
                methodsHTML += '<div class="methodSubTitle">Exceptions</div>';
                methodsHTML += `<div class="methodSubDescription">${this.escapeHTML(method.getException(), true)}</div>`;
            }

            if (method.getSee()) {
                methodsHTML += '<div class="methodSubTitle">See</div>';
                methodsHTML += `<div class="methodSubDescription">${this.makeSeeLinks(modelMap, models, method.getSee())}</div>`;
            }

            if (method.getAuthor()) {
                methodsHTML += '<div class="methodSubTitle">Author</div>';
                methodsHTML += `<div class="methodSubDescription">${this.escapeHTML(method.getAuthor(), false)}</div>`;
            }

            if (method.getDate()) {
                methodsHTML += '<div class="methodSubTitle">Date</div>';
                methodsHTML += `<div class="methodSubDescription">${this.escapeHTML(method.getDate(), false)}</div>`;
            }

            if (method.getExample()) {
                methodsHTML += '<div class="methodSubTitle">Example</div>';
                methodsHTML += `<pre class="codeExample"><code>${this.escapeHTML(method.getExample(), false)}</code></pre>`;
            }

            // end current method
            methodsHTML += '</div>';
        }

        // concat and close TOC and full methods display HTML
        contents += tocHTML;
        contents += '</ul>';
        contents += methodsHTML;
        contents += '</div>';

        return this.wrapInDetailsTag(contents, '<h2 class="subsectionTitle methods">Methods</h2>', "subSection");
    }

    public static escapeHTML(str: string, wrapBackticks: boolean): string {
        let result = wrapBackticks ? this.wrapInlineCode(escape(str)) : escape(str);
        // unescape <br> tags, we want to keep these
        result = result.replace(/&lt;br\s?\/?&gt;/g, '<br>');

        return result;
    }

    private static wrapInDetailsTag(contents: string, header: string, className: string): string {
        return `<details class="${className}" open><summary>${header}</summary>${contents}</details>`;
    }

    private static wrapInlineCode(html: string): string {
        const words = html.split(/\b\s{1,2}\b/)
            .map(word => {
                let firstIndex = word.indexOf(' ');
                let lastIndex = word.lastIndexOf(' ');
                if (firstIndex > -1 && lastIndex > -1 && firstIndex !== lastIndex) {
                    word = word.replace('`', `<code class="inlineCode">`);
                    word = word.replace('`', '</code>');
                    return word;
                }
                return word;
            });

        return words.join(' ');
    }

    public static makeHTMLScopingPanel(): string {
        let str = '<tr><td colspan="2" style="text-align: center;">';
        str += 'Show: ';

        // add toggle all checkbox
        str += '<input type="checkbox" checked="true" id="cbx-all" ';
        str += 'onclick="toggleAllScopes(this.checked);" />';
        str += '<label for="cbx-all">All</label>&nbsp;&nbsp;';

        // add checkboxes for registered scopes
        const checkBoxes = ApexDoc.registerScope.map(scope =>
            `<input type="checkbox" checked="true" id="cbx-${scope}" ` +
            `onclick="toggleScope('${scope}', this.checked);" />` +
            `<label for="cbx-${scope}">${scope}</label>`
        );

        str += checkBoxes.join('&nbsp;&nbsp;');
        str += '</td></tr>';
        return str;
    }

    public static makeHeader(bannerPage: string, documentTitle: string): string {
        let header =  '<html><head><title>' + documentTitle + '</title>';

        if (bannerPage) {
            header += HTML.HEADER_OPEN + bannerPage;
        } else {
            header += HTML.HEADER_OPEN + HTML.PROJECT_DETAIL + HTML.HEADER_CLOSE;
        }

        return header;
    }

    public static makeMenu(classGroupMap: Map<string, ClassGroup>, models: Array<TopLevelModel>): string {
        let createMiscellaneousGroup = false;

        // sort class models and establish if we need to create a misc. class group for un-grouped classes
        models.sort((a, b) => {
            if ((!a.getGroupName() || !b.getGroupName()) && !createMiscellaneousGroup) {
                createMiscellaneousGroup = true;
            }

            return a.getName().localeCompare(b.getName());
        });

        // make menu wide enough to always handle 40 char class name limit
        let contents = '<td width="22%" vertical-align="top">';
        contents += '<div class="navbar">';
        contents += '<nav role="navigation">';
        contents += `<a class="navHeader" id="home" href="javascript:void(0)" onclick="goToLocation('index.html');">`;
        contents += 'Home</a>';

        // add a bucket ClassGroup for all Classes without a ClassGroup specified
        if (createMiscellaneousGroup) {
            classGroupMap.set('Miscellaneous', new ClassGroup('Miscellaneous', ''));
        }

        // create a sorted list of ClassGroups
        for (let group of classGroupMap.keys()) {
            const cg = classGroupMap.get(group);
            let groupId = group.replace(/\s+/g, "_");

            contents += `<details id="${groupId}" class="groupName">`;
            contents += `<summary onclick="toggleActiveClass(this);" id="header-${groupId}" class="navHeader">`;

            if (cg && cg.getContentFilename()) {
                let destination = cg.getContentFilename() + '.html';
                // handle both onclick and onkeydown when tabbing to link
                contents += '<a href="javascript:void(0)" title="See Class Group info" ' +
                           `onclick="goToLocation('${destination}');">${group}</a>`;
            } else {
                contents += `<span>${group}</span>`;
            }

            contents += '</summary>';
            contents += '<ul>';

            for (let model of models) {
                if (group === model.getGroupName() || (!model.getGroupName() && group === 'Miscellaneous')) {
                    if (model.getNameLine()) {
                        let fileName = model.getName();
                        contents += `<li id="item-${fileName}" class="navItem class ${model.getScope()}" ` +
                                    `onclick="goToLocation('${fileName}.html');">` +
                                    `<a href="javascript:void(0)">${fileName}</a></li>`;
                    }
                }
            }

            contents += '</ul></details>';
        }

        contents += '</nav></div>';
        contents += '</td>';

        return contents;
    }

    private static maybeMakeSourceLink(model: ApexModel, className: string, modelName: string): string {
        if (this.sourceControlURL) {
            // if user leaves off trailing slash, save the day!
            if (!this.sourceControlURL.endsWith('/')) {
                this.sourceControlURL += '/';
            }
            let href = this.sourceControlURL + className + '.cls#L' + model.getLineNum();
            return `<a target="_blank" title="Go to source" class="hostedSourceLink" href="${href}">${modelName}</a>`;
        } else {
            return `<span>${modelName}</span>`;
        }
    }

    private static makeSeeLinks(modelMap: Map<string, TopLevelModel>, models: Array<TopLevelModel>, qualifiersStr: string): string {
        // the @see token may contain a comma separated list of fully qualified
        // method or class names. Start by splitting them into individual qualifiers.
        const qualifiers = qualifiersStr.split(',');

        // initialize list to store created links
        const links: string[] = [];

        // iterate over each qualifier and process
        // we could just take the users qualifiers and assume its a valid path
        // but this could easily result in dead links. This algorithm doesn't
        // exactly scream efficiency, but its still fast on moderate codebases
        // and its better than the alternative of dead links all over the place.
        for (let qualifier of qualifiers) {
            qualifier = qualifier.trim();

            // 1) continue if empty
            if (!qualifier) {
                continue;
            }

            // 2) check if URL, add to links and continue with loop if so
            if (Utils.isURL(qualifier)) {
                links.push(`<a target="_blank" href="${qualifier}">${qualifier}</a>`);
                continue;
            }

            // 3) check if markdown-formatted URL. add to links and continue.
            // markdown parsing function will detect if URL is valid and return
            // a span with tooltip indicating invalid link if not
            if (Utils.isMarkdownURL(qualifier)) {
                links.push(Utils.markdownUrlToLink(qualifier));
                continue;
            }

            // 4) if not URL or empty, must be a qualified class or method name.
            // First prepare the qualifier by stripping away and saving any method
            // overload selector for later. E.g. SomeClass.SomeMethod[4] means: link
            // to the 4th overload (zero-based) of that method. This syntax is only required
            // to specify a method other than the 1st. Otherwise SomeClass.SomeMethod is fine
            let overloadSelector = 0;
            if (/.*\[\d+\]$/.test(qualifier)) {
                let i = qualifier.lastIndexOf('[');
                // isolate the number inside the brackets
                let selector = qualifier.substring(i+1, qualifier.length - 1);
                overloadSelector = Number(selector);
                // strip away the suffix from the qualifier
                qualifier = qualifier.substring(0, i);
            }

            let parts = qualifier.split('.').map(p => p.toLowerCase());

            if (!parts.length || parts.length > 3) {
                throw new ApexDocError(`Qualifier '${qualifier}' is invalid. ${ApexDocError.INVALID_SEE_QUALIFIER}`);
            }

            let href = '';
            let foundMatch = false;

            // 4.A) if first qualifier matches class name, begin search: We've
            // made the model map in all lowercase to avoid case mis-matching
            let model = modelMap.get(parts[0]);

            if (model) {
                // if only a single qualifier, stop here
                if (parts.length === 1) {
                    href = model.getName() + '.html';
                    foundMatch = true;
                }

                // 4.B) otherwise keep searching for a match for the second qualifier as long as
                // model is not an enum model, in which case there is no searching left to do
                else if (parts.length >= 2 && model.getModelType() !== ModelType.ENUM) {
                    let Class = <ClassModel>model;
                    let methods = Class.getMethods();
                    let childClasses = Class.getChildClassMap();

                    let methodNum = 0;
                    for (let method of methods) {
                        if (method.getMethodName().toLowerCase() === parts[1]) {
                            // use actual class/method name to create link to avoid case issues
                            href = Class.getName() + '.html#' + Class.getName() + '.' + method.getMethodName();
                            // no overload selector, we've made a match!
                            if (overloadSelector === 0) {
                                foundMatch = true;
                                break;
                            }
                            // If there's an overload suffix to take into account
                            // ensure that many overloads of the method actually
                            // exist before committing to the method link.
                            else if (overloadSelector > 0 && methodNum !== overloadSelector) {
                                methodNum++;
                                continue;
                            }
                            // confirmed overload exists. Match!!
                            else if (methodNum === overloadSelector) {
                                href += '_' + overloadSelector;
                                foundMatch = true;
                                break;
                            }
                        }
                    }

                    // 4.C) if after searching methods a match hasn't been found
                    // yet see if child class name matches the second qualifier.
                    if (!foundMatch) {
                        // ApexDoc2 stores child class name as 'OuterClass.InnerClass'
                        // recreate that format below to try to make the match with
                        let childClassName = parts[0] + '.' + parts[1];
                        let childClass = childClasses.get(childClassName);

                        if (childClass) {
                            let nameParts = childClass.getName().split("\\.");
                            // 4.D) If match, and only 2 parts, stop here.
                            if (parts.length === 2) {
                                // to ensure the link works, use actual name rather than
                                // user provided parts in case casing doesn't match
                                href = nameParts[0] + '.html#' + nameParts[0] + '.' + nameParts[1];
                                foundMatch = true;
                            }
                            // 4.E) Otherwise, there must be 3 parts
                            // attempt to match on child class method.
                            else {
                                let childMethods = childClass.getMethods();
                                for (let method of childMethods) {
                                    if (method.getMethodName().toLowerCase() === parts[2]) {
                                        // same as above, use actual name to avoid casing issues
                                        href = nameParts[0] + '.html#' + childClass.getName() + '.' + method.getMethodName();
                                        foundMatch = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 5) if match made, create link with goToLocation function onclick
            // Otherwise, add span with Tooltip indicating no link could be made
            let link: string;
            if (foundMatch) {
                link = `<a href="javascript:void(0)" onclick="goToLocation('${href}')">${qualifier}</a>`;
            } else {
                link = `<span title="A matching reference could not be found!">${qualifier}</span>`;
            }

            links.push(link);
        }

        // 6) collect links / spans and join back into a single string
        return links.join(', ');
    }
}

export default DocGen;