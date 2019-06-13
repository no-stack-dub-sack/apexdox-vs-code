import ApexDoc from '../../ApexDoc';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import SeeLinkGenerator from '../SeeLinkGenerator';
import { ClassModel, MethodModel, TopLevelModel } from '../../../common/models';
import { last } from '../../../common/ArrayUtils';
import { Option } from '../../../common/Utils';

class MethodMarkupGenerator extends MarkupGenerator<MethodModel> {

    protected constructor(model: MethodModel) {
        super(model);
    }

    public static generate(cModel: ClassModel, modelMap: Map<string, TopLevelModel>): string {
        // retrieve methods to work with in the order user specifies
        const allMethods = ApexDoc.config.sortOrder === ApexDoc.ORDER_ALPHA
            ? cModel.methodsSorted
            : cModel.methods;

        const constructors = allMethods.filter(m => m.isConstructor);
        const methods = allMethods.filter(m => !m.isConstructor);

        const constructorsMarkup = constructors.length
            ? this.generateSection(
                'Contructors',
                constructors,
                cModel,
                modelMap
            ) : '';

        const methodsMarkup = methods.length
            ? this.generateSection(
                'Methods',
                methods,
                cModel,
                modelMap
            ) : '';

        return constructorsMarkup + methodsMarkup;
    }

    private static generateSection(section: string, methods: Array<MethodModel>, cModel: ClassModel, modelMap: Map<string, TopLevelModel>) {
        // track Ids used to make sure we're not generating duplicate
        // ids within this class and so that overloaded methods each
        // have their own unique anchor to link to in the TOC.
        const idCountMap = new Map<string, number>();

        // initialize a couple of strings to house our markup
        let tocMarkup = '';
        let methodsMarkup = '';

        // full method display
        for (let method of methods) {
            // instantiate our markup generator
            const generator = new MethodMarkupGenerator(method);

            // generate unique method id
            const methodId = generator.generateMethodId(idCountMap, cModel);

            // make our TOC entry, we'll concat this with the rest of the markup in the proper order later
            tocMarkup += generator.getTOCEntry(ApexDoc.config.showTOCSnippets, method.name, methodId);

            // run our generators in the desired order
            let methodMarkup = '';
            methodMarkup += generator.header(methodId, method.name);
            methodMarkup += generator.annotations('method-annotations');
            methodMarkup += generator.signatureLine(cModel.topMostClassName);
            methodMarkup += generator.description('method-description');
            methodMarkup += generator.deprecated();
            methodMarkup += generator.params();
            methodMarkup += generator.returns();
            methodMarkup += generator.exception();
            methodMarkup += generator.see(modelMap);
            methodMarkup += generator.author();
            methodMarkup += generator.since();
            methodMarkup += generator.example();

            // add method markup to our running methodsMarkup string
            methodsMarkup += `<div class="method ${method.scope}">${methodMarkup}</div>`;
        }

        // concat and close TOC and full methods display HTML
        const markup =
            `<div class="methods-container">
                <ul class="methods-toc">${tocMarkup}</ul>
                ${methodsMarkup}
            </div>`;

        return GeneratorUtils.wrapWithDetail(markup, `<h3 class="subsection-title methods">${cModel.name} ${section}</h2>`, 'subsection methods');
    }

    private markupTemplate(label: string, contents: string, titleClass = '', contentClass = 'method-subtitle__description', tag = 'div') {
        return `<div class="method-subtitle ${titleClass}">${label}</div>
                <${tag} class="${contentClass}">${contents}</${tag}>`;
    }

    // protected formatConstructorName(classModel: ClassModel): string {
    //     let methodName = this.model.name;
    //     // split class model name on '.' and take last, in case class is inner. otherwise
    //     // we'd be comparing a to its fully qualified class name, e.g. MyClass.SomeMethod
    //     if (methodName.toLowerCase() === last(classModel.name.split('.')).toLowerCase()) {
    //         methodName += '.&lt;init&gt;';
    //     }

    //     return methodName;
    // }

    protected author(): string {
        if (!this.model.author) {
            return '';
        } else {
            return this.markupTemplate('Author', GeneratorUtils.escapeHTML(this.model.author));
        }
    }

    protected header(id: string, name: string): string {
        return `
            <h2 class="method-header ${(this.model.deprecated ? 'deprecated' : '')}" id="${id}">
                ${name} (${this.model.paramsFromNameLine.join(', ')})
            </h2>`;
    }

    protected since(): string {
        if (!this.model.since) {
            return '';
        } else {
            return this.markupTemplate('Since', GeneratorUtils.escapeHTML(this.model.since));
        }
    }

    protected deprecated(): string {
        if (!this.model.deprecated) {
            return '';
        } else {
            return this.markupTemplate('Deprecated', GeneratorUtils.escapeHTML(this.model.deprecated, true), 'deprecated');
        }
    }

    protected example(): string {
        // return example and remove trailing white space which
        // may have built up due to the allowance of preserving
        // white pace in complex code example blocks for methods
        if (!this.model.example) {
            return '';
        } else {
            return this.markupTemplate(
                'Example',
                `<code>${GeneratorUtils.escapeHTML(this.model.example.trimRight())}</code>`,
                '',
                'codeExample',
                'pre'
            );
        }
    }

    protected exception(): string {
        if (!this.model.exception) {
            return '';
        } else {
            return this.markupTemplate('Exceptions', GeneratorUtils.escapeHTML(this.model.exception, true));
        }
    }

    protected params(): string {
        let markup = '';
        if (this.model.params.length) {
            markup += '<div class="method-subtitle">Parameters</div>';
            for (let { name, description, type } of this.model.params) {
                markup += `<div class="param-name">${name}</div>`;

                if (type) {
                    markup +=
                    `<div class="param-description">
                        Type: <code class="inline-code">${type}</code>
                    </div>`;
                }

                if (description) {
                    markup += `<div class="param-description">${description}</div>`;
                }
            }
        }

        return markup;
    }

    protected returns(): string {
        if (!this.model.returns) {
            return '';
        } else {
            return this.markupTemplate('Returns', GeneratorUtils.escapeHTML(this.model.returns, true));
        }
    }

    protected see(models: Map<string, TopLevelModel>): string {
        if (!this.model.see.length) {
            return '';
        } else {
            return this.markupTemplate('See', SeeLinkGenerator.makeLinks(models, this.model.see));
        }
    }

    protected getTOCEntry(showTOCSnippets: boolean, name: string, id: string): string {
        let entry =
            `<li class="method ${this.model.scope}">
                <a class="methods-toc__entry ${(this.model.deprecated ? 'deprecated' : '')}" href="#${id}">
                    ${name}
                </a>`;

        if (showTOCSnippets && this.model.description) {
            entry += this.description('methods-toc__description');
        }

        return entry += '</li>';
    }

    protected signatureLine(memberClassName: string): string {
        return `
            <div class="method-signature">
                ${super.signatureLine(GeneratorUtils.escapeHTML(this.model.nameLine), memberClassName, true)}
            </div>`;
    }

    /**
     * See if method ID has been used previously in this class
     * (must be an overloaded method or constructor) and amend
     * as needed to ensure all of our methods have unique IDs
     */
    protected generateMethodId(idCountMap: Map<string, number>,  classModel: ClassModel): string {
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

export default MethodMarkupGenerator;