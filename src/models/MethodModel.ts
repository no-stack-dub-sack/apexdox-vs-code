import ApexModel from './ApexModel';
import Utils from '../core/Utils';

class MethodModel extends ApexModel {

    public constructor(comments: string[], nameLine: string, lineNum: number) {
        super(comments);
        this.setNameLine(nameLine, lineNum);
    }

    protected setNameLine(nameLine: string, lineNum: number): void {
        // remove anything after param list
        if (nameLine) {
            let i = nameLine.lastIndexOf(')');
            if (i >= 0) {
                nameLine = nameLine.substring(0, i + 1);
            }
        }

        super.setNameLine(nameLine, lineNum);
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