import ApexDox from '../../ApexDox';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import { ClassModel, MethodModel, TopLevelModel } from '../../../common/models';
import { Option } from '../../..';

class MethodMarkupGenerator extends MarkupGenerator<MethodModel> {

    protected constructor(model: MethodModel, models: Map<string, TopLevelModel>) {
        super(model, models);
    }

    public static generate(cModel: ClassModel, models: Map<string, TopLevelModel>): string {
        // retrieve methods to work with in the order user specifies
        const allMethods = ApexDox.config.sortOrder === ApexDox.ORDER_ALPHA
            ? cModel.methodsSorted
            : cModel.methods;

        const constructors = allMethods.filter(m => m.isConstructor);
        const methods = allMethods.filter(m => !m.isConstructor);

        const constructorsMarkup = constructors.length
            ? this.generateSection(
                'Constructors',
                constructors,
                cModel,
                models
            ) : '';

        const methodsMarkup = methods.length
            ? this.generateSection(
                'Methods',
                methods,
                cModel,
                models
            ) : '';

        return constructorsMarkup + methodsMarkup;
    }

    private static generateSection(section: string, methods: Array<MethodModel>, cModel: ClassModel, models: Map<string, TopLevelModel>) {
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
            const generator = new MethodMarkupGenerator(method, models);

            // generate unique method id
            const methodId = generator.generateMethodId(idCountMap, cModel);

            // make our TOC entry, we'll concat this with the rest of the markup in the proper order later
            tocMarkup += generator.getTOCEntry(ApexDox.config.showTOCSnippets, methodId);

            // run our generators in the desired order
            let methodMarkup = '';
            methodMarkup += generator.header(methodId, cModel.relativeFilePath);
            methodMarkup += generator.description('method-description');
            methodMarkup += generator.signature('method');
            methodMarkup += generator.deprecated();
            methodMarkup += generator.params();
            methodMarkup += generator.returns();
            methodMarkup += generator.exception();
            methodMarkup += generator.see();
            methodMarkup += generator.changeLog();
            methodMarkup += generator.example();

            // add method markup to our running methodsMarkup string
            methodsMarkup += `<div class="method ${method.scope}">${methodMarkup}</div>`;
        }

        // concat and close TOC and full methods display HTML
        const markup =
            `<div class="subsection methods">
                <h3 class="subsection-title methods">${cModel.name} ${section}</h3>
                <div class="methods-container">
                    <ul class="methods-toc">${tocMarkup}</ul>
                    ${methodsMarkup}
                </div>
            </div>`;

        return markup;
    }

    protected markupTemplate(label: string, contents: string, titleClass = '', contentClass = 'method-subtitle-description', tag = 'div') {
        titleClass = titleClass ? `method-subtitle ${titleClass}` : 'method-subtitle';
        return super.markupTemplate(label, contents, titleClass, contentClass, tag);
    }

    protected header(id: string, relativeFilePath: string): string {
        return `
            <h4 class="method-title ${(this.model.deprecated ? 'deprecated' : '')}" id="${id}">
                ${super.linkToSource(`${this.model.name}(${this.model.paramsFromNameLine.join(', ')})`, relativeFilePath)}
            </h4>`
        ;
    }

    protected exception(): string {
        if (!this.model.exception) {
            return '';
        } else {
            return this.markupTemplate('Exceptions', GeneratorUtils.encodeText(this.model.exception, true, this.models));
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
                    `<div class="param-type">
                        Type: <code class="code-inline">${type}</code>
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
            return this.markupTemplate('Returns', GeneratorUtils.encodeText(this.model.returns, true, this.models));
        }
    }

    protected getTOCEntry(showTOCSnippets: boolean, id: string): string {
        let entry =
            `<li class="method ${this.model.scope}">
                <a class="methods-toc__entry ${(this.model.deprecated ? 'deprecated' : '')}" href="#${id}">
                    ${this.model.name} (${this.model.paramsFromNameLine.join(', ')})
                </a>
                ${showTOCSnippets && this.model.description ? this.description('methods-toc__description') : ''}
            </li>`;

        return entry;
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