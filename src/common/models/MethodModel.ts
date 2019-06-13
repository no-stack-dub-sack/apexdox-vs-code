import GeneratorUtils from '../../engine/generators/GeneratorUtils';
import Utils, { Option } from '../Utils';
import { ApexModel } from './ApexModel';
import { except, last } from '../ArrayUtils';

interface IParamModel {
    name: string;
    type?: string;
    description: string;
}

class MethodModel extends ApexModel {

    private _isConstructor: boolean;

    public constructor(comments: string[], nameLine: string, lineNum: number, className = '', sourceUrl?: Option<string>) {
        super(comments, sourceUrl);
        this.setNameLine(nameLine, lineNum);
        this._isConstructor = this.name.toLowerCase() === last(className.split('.')).toLowerCase();
    }

    public get author(): string {
        return this._author;
    }

    public get deprecated(): string {
        return this._deprecated;
    }

    public get example(): string {
        // remove trailing white space which may have built
        // up due to the allowance of preserving white space
        return this._example.trimRight();
    }

    public get exception(): string {
        return this._exception;
    }

    public get isConstructor(): boolean {
        return this._isConstructor;
    }

    public get name(): string {
        let nameLine = this.nameLine;
        if (nameLine) {
            nameLine = nameLine.trim();
            let lastIndex = nameLine.indexOf('(');
            if (lastIndex >= 0) {
                return Utils.previousWord(nameLine, lastIndex);
            }
        }

        return '';
    }

    public get params(): Array<IParamModel> {
        const params = new Array<IParamModel>();
        const typeMap = this.typesFromNameLine;

        for (let paramSignature of this._params) {
            const param = {} as IParamModel;
            paramSignature = GeneratorUtils.escapeHTML(paramSignature, true).trim();
            if (paramSignature) {
                const match: Option<RegExpExecArray, null> = /\s/.exec(paramSignature);

                if (match !== null) {
                    const idx = match.index;
                    param.name = paramSignature.substring(0, idx);
                    param.description = paramSignature.substring(idx + 1);
                } else {
                    param.name = paramSignature;
                    param.description = '';
                }

                const type = typeMap.get(param.name);
                param.type = type ? GeneratorUtils.escapeHTML(type) : type;

                params.push(param);
            }
        }

        return params;
    }

    public get typesFromNameLine(): Map<string, string> {
        const params = this.paramsFromNameLine;
        const paramToType = new Map<string, string>();

        for (let i = 0; i < params.length; i++) {
            const param = params[i];
            const prevParam = params[i-1];

            let type = '', sliceStart = 0;
            let reString = `[A-Za-z0-9_.<>,\\s]+\\s+${param}`;

            if (prevParam) {
                sliceStart = 1;
                reString = `${prevParam}\\s*,${reString}`;
            }

            const re = new RegExp(reString, 'g');
            const typeMatcher = this.nameLine.match(re);

            if (typeMatcher) {
                type = typeMatcher[0].split(' ').slice(sliceStart, -1).join(' ');
            }

            paramToType.set(param, type);
        }

        return paramToType;
    }

    public get paramsFromNameLine(): string[] {
        const nameLine = this.nameLine;
        const params = nameLine
            .substring(nameLine.indexOf('(') + 1, nameLine.indexOf(')'))
            .split(',');

        const result = except(params.map(param => {
            let paramPair = param.trim().split(/\s+/);
            return paramPair.length === 2 ? paramPair[1] : null;
        }), [null]);

        return <string[]>result;
    }

    public get returns(): string {
        return this._returns;
    }

    public get see(): string[] {
        return this._see;
    }

    // annotations will not exist when parseScope is first called
    // override parseAnnotations so we can call parseScope again after
    public parseAnnotations(line: string, previousLine: Option<string, null>): void {
        super.parseAnnotations(line, previousLine);
        this.parseScope();
    }

    // override parseScope so we can check if method is 'isTest'.
    // isTest methods will initially be recognized as implicitly private.
    protected parseScope(): void {
        super.parseScope();
        if (this._scope === 'private' && this._annotations.map(a => a.toLowerCase()).includes('@istest')) {
            this._scope = 'testmethod';
        }
    }

    protected setNameLine(nameLine: string, lineNum: number): void {
        // remove anything after param list
        if (nameLine) {
            let i = nameLine.lastIndexOf(')');
            if (i >= 0 && i < nameLine.length - 1) {
                nameLine = nameLine.substring(0, i + 1);
            }
        }

        super.setNameLine(nameLine, lineNum);
    }

    public get scope() {
        return this._scope;
    }

    public set scope(scope: string) {
        this._scope = scope;
    }

    public get since(): string {
        return this._since;
    }
}

export { MethodModel };