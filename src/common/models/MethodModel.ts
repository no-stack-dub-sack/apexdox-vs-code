import Utils, { Option } from '../Utils';
import { ApexModel } from './ApexModel';

class MethodModel extends ApexModel {

    public constructor(comments: string[], nameLine: string, lineNum: number, sourceUrl?: Option<string>) {
        super(comments, sourceUrl);
        this.setNameLine(nameLine, lineNum);
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

    public get params(): string[] {
        return this._params;
    }

    public get paramsFromNameLine(): string[] {
        const nameLine = this.nameLine;
        let params = nameLine
            .substring(nameLine.indexOf('(') + 1, nameLine.indexOf(')'))
            .split(',');

        const result = params.map(param => {
            let paramPair = param.trim().split(/\s+/);
            return paramPair.length === 2 ? paramPair[1] : null;
        }).filter(param => param !== null);

        return <string[]>result;
    }

    public get returns(): string {
        return this._returns;
    }

    public get see(): string[] {
        return this._see;
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

    public set scope(scope: string) {
        this._scope = scope;
    }

    public get since(): string {
        return this._since;
    }
}

export { MethodModel };