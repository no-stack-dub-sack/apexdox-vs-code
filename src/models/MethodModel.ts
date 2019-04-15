import ApexModel from './ApexModel';
import Utils from '../utils/Utils';

class MethodModel extends ApexModel {

    public constructor(comments: string[], nameLine: string, lineNum: number) {
        super(comments);
        this.setNameLine(nameLine, lineNum);
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

    public getParams(): string[] {
        return this.params;
    }

    public getException(): string {
        return !this.exception ? '' : this.exception;
    }

    public getReturns(): string {
        return !this.returns ? '' : this.returns;
    }

    public setScope(scope: string): void {
        this.scope = scope;
    }

    public getMethodName(): string {
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
}

export default MethodModel;