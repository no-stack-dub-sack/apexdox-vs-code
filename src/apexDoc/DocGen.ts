import * as Models from '../models';
import * as templates from '../utils/Templates';
import ApexDoc from './ApexDoc';
import ApexDocError from '../utils/ApexDocError';
import escape from 'lodash.escape';
import Utils, { last, Option } from '../utils/Utils';
import { MethodMarkupGenerator } from './markupGenerators/MethodMarkupGenerator';

class DocGen {
    public static sortOrderStyle: string;
    public static showTOCSnippets: boolean;

    public static documentClass(cModel: Models.ClassModel, modelMap: Map<string, Models.TopLevelModel>): string {
        const hasSource = cModel.getSourceUrl() ? true : false;
        const sourceLinkIcon = hasSource ? `<span>${templates.EXTERNAL_LINK}</span>` : '';
        const sectionSourceLink = this.maybeMakeSourceLink(cModel, cModel.getTopmostClassName(), this.escapeHTML(cModel.getName()));
        const header = `<h2 class="sectionTitle" id="${cModel.getName()}">${sectionSourceLink + sourceLinkIcon}</h2>`;

        let contents = this.documentTopLevelAttributes(cModel, modelMap, cModel.getTopmostClassName(), '');

        if (cModel.getProperties().length) {
            contents += this.documentProperties(cModel);
        }

        if (cModel.getEnums().length) {
            contents += this.documentInnerEnums(cModel);
        }

        if (cModel.getMethods().length) {
            contents += this.documentMethods(cModel, modelMap);
        }

        return this.wrapInDetailsTag(contents, header, 'section');
    }

    public static documentEnum(eModel: Models.EnumModel, modelMap: Map<string, Models.TopLevelModel>): string {
        const hasSource = eModel.getSourceUrl() ? true : false
            , sourceLinkIcon = hasSource ? `<span>${templates.EXTERNAL_LINK}</span>` : ''
            , sectionSourceLink = this.maybeMakeSourceLink(eModel, eModel.getName(), this.escapeHTML(eModel.getName()));

        let contents =
            `<h2 class="sectionTitle" id="${eModel.getName()}">
                ${sectionSourceLink + sourceLinkIcon}
            </h2>`;

        let values =
            `<p />
            <table class="attrTable">
                <tr><th>Values</th></tr>
                <tr>
                    <td class="enumValues">${eModel.getValues().join(', ')}</td>
                </tr>
            </table>`;

        contents += this.documentTopLevelAttributes(eModel, modelMap, eModel.getName(), values);

        return contents;
    }

    private static documentTopLevelAttributes(model: Models.TopLevelModel, modelMap: Map<string, Models.TopLevelModel>, className: string, additionalContent: string): string {
        const classSourceLink = this.maybeMakeSourceLink(model, className, this.escapeHTML(model.getNameLine()));
        let contents = '';

        if (model.getAnnotations().length) {
            contents += `<div class="classAnnotations">${model.getAnnotations().join(' ')}</div>`;
        }

        contents += `<div class="classSignature">${classSourceLink}</div>`;

        if (model.getDescription()) {
            contents += `<div class="classDetails"><div>${this.escapeHTML(<string>model.getDescription(), true)}</div>`;
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

        if (model.getSee().length) {
            contents += '<div class="classSubtitle">See</div>';
            contents += `<div class="classSubDescription">${this.makeSeeLinks(modelMap, model.getSee())}</div>`;
        }

        if (model.getAuthor()) {
            contents += `<br/>${this.escapeHTML(model.getAuthor())}`;
        }

        if (model.getSince()) {
            contents += `<br/>${this.escapeHTML(model.getSince())}`;
        }

        if (model.getExample()) {
            contents += '<div class="classSubTitle">Example</div>';
            contents += `<pre class="codeExample"><code>${this.escapeHTML(model.getExample())}</code></pre>`;
        }

        contents += '</div><p/>';

        return contents;
    }

    private static documentProperties(cModel: Models.ClassModel): string {
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
            if (prop.getAnnotations().length) {
                annotationsCol = '<th>Annotations</th>';
            }
        }

        contents += `<tr><th>Name</th><th>Signature</th>${annotationsCol}${descriptionCol}</tr>`;

        for (let prop of properties) {
            const nameLine = Utils.highlightNameLine(prop.getNameLine());
            const propSourceLink = this.maybeMakeSourceLink(prop, cModel.getTopmostClassName(), nameLine);

            contents += `<tr class="property ${prop.getScope()}">`;
            contents += `<td class="attrName">${prop.getName()}</td>`;
            contents += `<td><div class="attrSignature">${propSourceLink}</div></td>`;

            if (annotationsCol) {
                contents += `<td><div class="propAnnotations">${prop.getAnnotations().join(', ')}</div></td>`;
            }

            // if any property has a description build out the third column
            if (descriptionCol) {
                const desc = prop.getDescription() || '';
                const escaped = desc ? this.escapeHTML(desc, true) : desc;
                contents += `<td><div class="attrDescription">${escaped}</div></td>`;
            }

            contents += '</tr>';
        }
        // end Properties
        contents += '</table></div>';
        contents += '<p/>';

        return this.wrapInDetailsTag(contents, '<h2 class="subsectionTitle properties">Properties</h2>', 'subSection properties');
    }

    private static documentInnerEnums(cModel: Models.ClassModel): string {
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
                const desc = Enum.getDescription() || '';
                const escaped = desc ? this.escapeHTML(desc, true) : desc;
                contents += `<td><div class="attrDescription">${escaped}</div></td>`;
            }

            contents += '</tr>';
        }
        // end Properties
        contents += '</table></div><p/>';

        return this.wrapInDetailsTag(contents, '<h2 class="subsectionTitle enums">Enums</h2>', 'subSection enums');
    }

    private static documentMethods(cModel: Models.ClassModel, modelMap: Map<string, Models.TopLevelModel>): string {
        // track Ids used to make sure we're not generating duplicate
        // ids within this class and so that overloaded methods each
        // have their own unique anchor to link to in the TOC.
        const idCountMap = new Map<string, number>();

        // retrieve methods to work with in the order user specifies
        const methods = this.sortOrderStyle === ApexDoc.ORDER_ALPHA
            ? cModel.getMethodsSorted()
            : cModel.getMethods();

        // initialize a couple of strings to house our markup
        let tocMarkup = '';
        let methodsMarkup = '';

        // full method display
        for (let method of methods) {
            // instantiate our markup generator
            const generator = new MethodMarkupGenerator(method);

            // get some variables we'll reuse a couple of times
            const methodId = generator.generateMethodId(idCountMap, cModel);
            const methodName = generator.formatConstructorName(cModel);
            const nameLine = generator.highlightNameLine(this.escapeHTML(method.getNameLine()));

            // make our TOC entry, we'll concat this with the rest of the markup in the proper order later
            tocMarkup += generator.getTOCEntry(this.showTOCSnippets, methodName, methodId);

            // run our generators in the desired order
            let methodMarkup = '';
            methodMarkup += generator.getHeader(methodId, methodName);
            methodMarkup += generator.getAnnotations('methodAnnotations');
            methodMarkup += generator.maybeMakeSourceLink(cModel.getTopmostClassName(), nameLine);
            methodMarkup += generator.getDescription('methodDescription');
            methodMarkup += generator.getDeprecated();
            methodMarkup += generator.getParams();
            methodMarkup += generator.getReturns();
            methodMarkup += generator.getException();
            methodMarkup += generator.getSee(modelMap);
            methodMarkup += generator.getAuthor();
            methodMarkup += generator.getSince();
            methodMarkup += generator.getExample();

            // add method markup to our running methodsMarkup string
            methodsMarkup += `<div class="method ${method.scope}">${methodMarkup}</div>`;
        }

        // concat and close TOC and full methods display HTML
        const markup =
            `<div class="methodsContainer">
                <ul class="methodTOC">${tocMarkup}</ul>
                ${methodsMarkup}
            </div>`;

        return this.wrapInDetailsTag(markup, '<h2 class="subsectionTitle methods">Methods</h2>', "subSection methods");
    }

    public static escapeHTML(str: string, wrapBackticks: boolean = false): string {
        let result = wrapBackticks ? this.wrapInlineCode(escape(str)) : escape(str);
        // unescape <br> tags, we want to keep these
        result = result.replace(/&lt;br\s?\/?&gt;/g, '<br>');

        return result;
    }

    private static wrapInDetailsTag(contents: string, header: string, className: string): string {
        return `<details class="${className}" open><summary>${header}</summary>${contents}</details>`;
    }

    private static wrapInlineCode(html: string): string {
        const codeWords: Option<RegExpMatchArray, null> = html.match(/(`|&#96;).+?(`|&#96;)/g);
        if (codeWords) {
            codeWords.forEach(word => {
                let codeWord = word.replace(/&#96;|`/, `<code class="inlineCode">`);
                codeWord = codeWord.replace(/&#96;|`/, '</code>');
                html = html.replace(word, codeWord);
            });
        }
        return html;
    }

    public static makeHTMLScopingPanel(): string {
        let str = '<tr><td colspan="2" style="text-align: center;">';
        str += 'Show: ';

        // add toggle all checkbox
        str += '<input type="checkbox" checked="true" id="cbx-all" ';
        str += 'onclick="toggleAllScopes(this.checked);" />';
        str += '<label for="cbx-all">All</label>&nbsp;&nbsp;';

        // add checkboxes for registered scopes
        const checkBoxes = ApexDoc.config.scope.map(scope =>
            `<input type="checkbox" checked="true" id="cbx-${scope}" ` +
            `onclick="toggleScope('${scope}', this.checked);" />` +
            `<label for="cbx-${scope}">${scope}</label>`
        );

        str += checkBoxes.join('&nbsp;&nbsp;');
        str += '</td></tr>';
        return str;
    }

    public static makeHeader(bannerPage: Option<string, void>, documentTitle: string): string {
        let header: string;

        if (bannerPage) {
            header = templates.headerOpen(documentTitle) + bannerPage;
        } else {
            header = templates.headerOpen(documentTitle) + templates.PROJECT_DETAIL + templates.HEADER_CLOSE;
        }

        return header;
    }

    public static makeMenu(classGroupMap: Map<string, Models.ClassGroup>, models: Map<string, Models.TopLevelModel>): string {
        // 22% width is to ensure menu is always wide
        // enough to handle 40 char class name limit
        let markup =
            `<td width="22%" vertical-align="top">
                <div class="navbar">
                    <nav role="navigation">
                        <a class="navHeader" id="home" href="javascript:void(0)"
                            onclick="goToLocation('index.html');">
                            Home
                        </a>`;

        const menuMarkupMap = new Map<string, string>()
            , sortedGroups = Array
                .from(classGroupMap.keys())
                .sort((a: string, b: string) =>  a.localeCompare(b));

        // iterate over groups and make our top level menu
        // items. store markup in map, we will concatenate
        // later once all of our list items are created.
        for (let group of sortedGroups) {
            const cg = classGroupMap.get(group);
            let groupId = group.replace(/\s+/g, "_");

            let markup =
                `<details id="${groupId}" class="groupName">
                    <summary onclick="toggleActiveClass(this);"
                             id="header-${groupId}"
                             class="navHeader">`;

            if (cg && cg.getContentFilename()) {
                let destination = cg.getContentFilename() + '.html';
                markup +=
                    `<a href="javascript:void(0)" title="See Class Group info"
                        onclick="goToLocation('${destination}');">${group}</a>`;
            } else {
                markup += `<span>${group}</span>`;
            }

            markup += '</summary><ul>';
            menuMarkupMap.set(group, markup);
        }

        // create our individual menu items and concatenate
        // them with their corresponding top level menu item
        for (let model of models.values()) {
            const group = model.getGroupName() || 'Miscellaneous';

            if (model.getNameLine()) {
                const fileName = model.getName()
                    , markup =
                        `<li id="item-${fileName}" class="navItem class ${model.getScope()}"
                            onclick="goToLocation('${fileName}.html');">
                            <a tabindex="1" href="javascript:void(0)">${fileName}</a>
                        </li>`;

                menuMarkupMap.set(group, menuMarkupMap.get(group) + markup);
            }
        }

        // iterate over map and concat each menu item with the
        // opening markup, closing each <details> tag along the way
        menuMarkupMap.forEach(menuItem => markup += menuItem + '</ul></details>');

        // close up our main div and return
        return markup + '</nav></div></td>';
    }

    private static maybeMakeSourceLink(model: Models.ApexModel, className: string, title: string): string {
        let sourceUrl = model.getSourceUrl();
        if (sourceUrl) {
            // if user leaves off trailing slash, save the day!
            if (!sourceUrl.endsWith('/')) {
                sourceUrl += '/';
            }
            let href = sourceUrl + className + '.cls#L' + model.getLineNum();
            return `<a target="_blank" title="Go to source" class="hostedSourceLink" href="${href}">${title}</a>`;
        } else {
            return `<span>${title}</span>`;
        }
    }

    public static makeSeeLinks(modelMap: Map<string, Models.TopLevelModel>, qualifiers: string[]): string {
        // initialize list to store created links
        const links = new Array<string>();

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
                else if (parts.length >= 2 && model.getModelType() !== Models.ModelType.ENUM) {
                    let Class = <Models.ClassModel>model;
                    let methods = Class.getMethods();
                    let childClasses = Class.getChildClassMap();

                    let methodNum = 0;
                    for (let method of methods) {
                        if (method.getName().toLowerCase() === parts[1]) {
                            // use actual class/method name to create link to avoid case issues
                            href = Class.getName() + '.html#' + Class.getName() + '.' + method.getName();
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
                                    if (method.getName().toLowerCase() === parts[2]) {
                                        // same as above, use actual name to avoid casing issues
                                        href = nameParts[0] + '.html#' + childClass.getName() + '.' + method.getName();
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