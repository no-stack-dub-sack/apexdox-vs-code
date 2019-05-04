import DocGen from '../DocGen';
import { ClassModel, MethodModel, TopLevelModel } from '../../models';
import { last, Option } from '../../utils/Utils';
import { MarkupGenerator } from './MarkupGenerator';

class MethodMarkupGenerator extends MarkupGenerator<MethodModel> {

    public constructor(model: MethodModel) {
        super(model);
    }

    private markupTemplate(label: string, contents: string, titleClass = '', contentClass = 'methodSubDescription', tag = 'div') {
        return `<div class="methodSubTitle ${titleClass}">${label}</div>
                <${tag} class="${contentClass}">${contents}</${tag}>`;
    }

    public formatConstructorName(classModel: ClassModel): string {
        let methodName = this.model.name;
        // split class model name on '.' and take last, in case class is inner. otherwise
        // we'd be comparing a to its fully qualified class name, e.g. MyClass.SomeMethod
        if (methodName.toLowerCase() === last(classModel.name.split('.')).toLowerCase()) {
            methodName += '.&lt;init&gt;';
        }

        return methodName;
    }

    public getAuthor(): string {
        if (!this.model.author) {
            return '';
        } else {
            return this.markupTemplate('Author', DocGen.escapeHTML(this.model.author));
        }
    }

    public getHeader(id: string, name: string): string {
       return  `<h2 class="methodHeader ${(this.model.deprecated ? 'deprecated' : '')}" id="${id}">${name}</h2>`;
    }

    public getSince(): string {
        if (!this.model.since) {
            return '';
        } else {
            return this.markupTemplate('Since', DocGen.escapeHTML(this.model.since));
        }
    }

    public getDeprecated(): string {
        if (!this.model.deprecated) {
            return '';
        } else {
            return this.markupTemplate('Deprecated', DocGen.escapeHTML(this.model.deprecated, true), 'deprecated');
        }
    }

    public getExample(): string {
        // return example and remove trailing white space which
        // may have built up due to the allowance of preserving
        // white pace in complex code example blocks for methods
        if (!this.model.example) {
            return '';
        } else {
            return this.markupTemplate(
                'Example',
                `<code>${DocGen.escapeHTML(this.model.example.trimRight())}</code>`,
                '',
                'codeExample',
                'pre'
            );
        }
    }

    public getException(): string {
        if (!this.model.exception) {
            return '';
        } else {
            return this.markupTemplate('Exceptions', DocGen.escapeHTML(this.model.exception, true));
        }
    }

    public getParams(): string {
        let markup = '';
        if (this.model.params.length) {
            // @param someParam This is the params description.
            markup += '<div class="methodSubTitle">Parameters</div>';
            for (let param of this.model.params) {
                param = DocGen.escapeHTML(param, true).trim();
                if (param) {
                    let paramName: string;
                    let paramDescription: string;
                    const match: Option<RegExpExecArray, null> = /\s/.exec(param);

                    if (match !== null) {
                        const idx = match.index;
                        paramName = param.substring(0, idx);
                        paramDescription = param.substring(idx + 1);
                    } else {
                        paramName = param;
                        paramDescription = '';
                    }

                    markup += `<div class="paramName">${paramName}</div>`;

                    if (paramDescription) {
                        markup += `<div class="paramDescription">${paramDescription}</div>`;
                    }
                }
            }
        }

        return markup;
    }

    public getReturns(): string {
        if (!this.model.returns) {
            return '';
        } else {
            return this.markupTemplate('Returns', DocGen.escapeHTML(this.model.returns, true));
        }
    }

    public getScope(tag = 'div'): string {
        return `<${tag} class="method ${this.model.scope}">`;
    }

    public getSee(models: Map<string, TopLevelModel>): string {
        if (!this.model.see.length) {
            return '';
        } else {
            return this.markupTemplate('See', DocGen.makeSeeLinks(models, this.model.see));
        }
    }

    public getTOCEntry(showTOCSnippets: boolean, name: string, id: string): string {
        let entry =
            `${this.getScope('li')}
                <a class="methodTOCEntry ${(this.model.deprecated ? 'deprecated' : '')}" href="#${id}">
                    ${name}
                </a>`;

        if (showTOCSnippets && this.model.description) {
            entry += this.getDescription('methodTOCDescription');
        }

        return entry += '</li>';
    }

    public maybeMakeSourceLink(className: string, title: string): string {
        return `<div class="methodSignature">${super.maybeMakeSourceLink(className, title)}</div>`;
    }

    /**
     * See if method ID has been used previously in this class
     * (must be an overloaded method or constructor) and amend
     * as needed to ensure all of our methods have unique IDs
     */
    public generateMethodId(idCountMap: Map<string, number>,  classModel: ClassModel): string {
        let methodId = classModel.name + '.' + this.model.name;
        let count: Option<number>;
        if ((count = idCountMap.get(methodId)) === undefined) {
            idCountMap.set(methodId, 1);
        } else {
            idCountMap.set(methodId, count + 1);
            methodId += '_' + count;
        }
        return methodId;
    }
}

export { MethodMarkupGenerator };