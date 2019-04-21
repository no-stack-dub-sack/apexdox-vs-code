import ApexModel from './ApexModel';
import Utils from '../utils/Utils';

class MethodModel extends ApexModel {

    public constructor(comments: string[], nameLine: string, lineNum: number) {
        super(comments);
        this.setNameLine(nameLine, lineNum);
    }

    public getAuthor(): string {
        return !this.author ? '' : this.author;
    }

    public getSince(): string {
        return !this.since ? '' : this.since;
    }

    public getDeprecated(): string {
        return !this.deprecated ? '' : this.deprecated;
    }

    public getExample(): string {
        // return example and remove trailing white space which
        // may have built up due to the allowance of preserving
        // white pace in complex code example blocks for methods
        return !this.example ? '' : this.example.trimRight();
    }

    public getException(): string {
        return !this.exception ? '' : this.exception;
    }

    public getName(): string {
        let nameLine = this.getNameLine();
        if (nameLine) {
            nameLine = nameLine.trim();
            let lastIndex = nameLine.indexOf('(');
            if (lastIndex >= 0) {
                return Utils.previousWord(nameLine, lastIndex);
            }
        }

        return '';
    }

    public getParams(): string[] {
        return this.params;
    }

    public getParamsFromNameLine(): string[] {
        const nameLine = this.getNameLine();
        const paramsList = nameLine.substring(nameLine.indexOf('(') + 1, nameLine.indexOf(')'));
        let params = paramsList.includes(',') ? paramsList.split(',') : [];

        const result = params.map(param => {
            let paramPair = param.trim().split(/\s+/);
            return paramPair.length === 2 ? paramPair[1] : null;
        }).filter(param => param !== null);

        return <string[]>result;
    }

    public getReturns(): string {
        return !this.returns ? '' : this.returns;
    }

    public getSee(): string[] {
        return this.see;
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

    public setScope(scope: string): void {
        this.scope = scope;
    }
}

export default MethodModel;