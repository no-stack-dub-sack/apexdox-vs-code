import * as Models from '../../common/models';
import ApexDocError from '../../common/ApexDocError';
import Utils from '../../common/Utils';

interface IMatchResult {
    foundMatch: boolean;
    selector: string;
    methodName: string;
}

class SeeLinkGenerator {

    private static isMarkdownURL(str: string): boolean {
        return /^\[.*\]\(.*\)$/.test(str.trim());
    }

    private static markdownUrlToLink(str: string): string {
        str = str.trim();

        const linkName = str.substring(1, str.indexOf(']'));
        const url = str.substring(str.indexOf('](') + 2, str.length - 1);

        return Utils.isURL(url)
            ? `<a target="_blank" rel="noopener noreferrer" href="${url}">${linkName}</a>`
            : `<span title="URL is invalid!">${linkName}</span>`;
    }

    public static makeLinks(modelMap: Map<string, Models.TopLevelModel>, qualifiers: string[]): string {
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
                links.push(`<a target="_blank" rel="noopener noreferrer" href="${qualifier}">${qualifier}</a>`);
                continue;
            }

            // 3) check if markdown-formatted URL. add to links and continue.
            // markdown parsing function will detect if URL is valid and return
            // a span with tooltip indicating invalid link if not
            if (this.isMarkdownURL(qualifier)) {
                links.push(this.markdownUrlToLink(qualifier));
                continue;
            }

            // 4) if not URL or empty, must be a qualified class or method name.
            // First prepare the qualifier by stripping away and saving any method
            // overload selector for later. E.g. SomeClass.SomeMethod[4] means: link
            // to the 4th overload (zero-based) of that method. This syntax is only required
            // to specify a method other than the 1st. Otherwise SomeClass.SomeMethod is fine
            let overloadSelector = 0;
            if (/.*\[\d+\]$/.test(qualifier)) {
                const i = qualifier.lastIndexOf('[');
                // isolate the number inside the brackets
                const selector = qualifier.substring(i+1, qualifier.length - 1);
                overloadSelector = Number(selector);
                // strip away the suffix from the qualifier
                qualifier = qualifier.substring(0, i);
            }

            const parts = qualifier.split('.').map(p => p.toLowerCase());

            if (!parts.length || parts.length > 3) {
                throw new ApexDocError(`Qualifier '${qualifier}' is invalid. ${ApexDocError.INVALID_SEE_QUALIFIER}`);
            }

            let href = '';
            let foundMatch = false;

            // 4.A) if first qualifier matches class name, begin search: We've
            // made the model map in all lowercase to avoid case mis-matching
            const model = modelMap.get(parts[0]);

            if (model) {
                // if only a single qualifier, stop here
                if (parts.length === 1) {
                    href = model.name + '.html';
                    qualifier = model.name;
                    foundMatch = true;
                }

                // 4.B) otherwise keep searching for a match for the second qualifier as long as
                // model is not an enum model, in which case there is no searching left to do
                else if (parts.length >= 2 && model.modelType !== Models.ModelType.ENUM) {
                    const Class = <Models.ClassModel>model;
                    const methods = Class.methods;
                    const childClasses = Class.childClassMap;

                    // attempt to match method, and select correct overload if required
                    const matchResults = this.methodMatcher(methods, parts[1], overloadSelector);
                    if (matchResults.foundMatch) {
                        qualifier = `${Class.name}.${matchResults.methodName}`;
                        href = `${Class.name}.html#${Class.name}.${matchResults.methodName}`;
                        href += matchResults.selector; // append overload selector
                        foundMatch = true;
                    }

                    // 4.C) if after searching methods a match hasn't been found
                    // yet see if child class name matches the second qualifier.
                    if (!foundMatch) {
                        // ApexDoc2 stores child class name as 'OuterClass.InnerClass'
                        // recreate that format below to try to make the match with
                        const maybeChildClassName = parts[0] + '.' + parts[1];
                        const childClass = childClasses.get(maybeChildClassName);

                        if (childClass) {
                            const [ parentClassName, childClassName ] = childClass.name.split('.');
                            // 4.D) If match, and only 2 parts, stop here.
                            if (parts.length === 2) {
                                // to ensure the link works, use model names rather than user provided
                                // qualifiers in case casing doesn't match. Label will match user's
                                // qualifier, but by using model names, we ensure proper casing.
                                href = `${parentClassName}.html#${parentClassName}.${childClassName}`;
                                qualifier = `${parentClassName}.${childClassName}`;
                                foundMatch = true;
                            }
                            // 4.E) Otherwise, there must be 3 parts
                            // attempt to match on child class method.
                            else {
                                const matchResults = this.methodMatcher(childClass.methods, parts[2], overloadSelector);
                                if (matchResults.foundMatch) {
                                    qualifier = `${childClass.name}.${matchResults.methodName}`;
                                    href = `${parentClassName}.html#${childClass.name}.${matchResults.methodName}`;
                                    href += matchResults.selector; // append overload selector
                                    foundMatch = true;
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

    /**
     * Search through methods for a match to the provided qualifier. If a match is made
     * and an overload selector is provided, continue iterating to see if that overload
     * exists, and match on it if it does. If it does not, report that no match is made.
     *
     * @param methods The methods to search for a match through
     * @param matcher The user provided qualifier to match against a method name
     * @param overloadSelector The user provided indicator of the method overload number
     */
    private static methodMatcher(methods: Models.MethodModel[], matcher: string, overloadSelector: number): IMatchResult {
        let methodNum = 0;
        let foundMatch = false;
        let selector = '', methodName = '';

        for (let method of methods) {
            if ((methodName = method.name.toLowerCase()) === matcher) {
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
                    selector = '_' + overloadSelector;
                    foundMatch = true;
                    break;
                }
            }
        }

        return {
            foundMatch,
            methodName,
            selector
        };
    }
}

export default SeeLinkGenerator;