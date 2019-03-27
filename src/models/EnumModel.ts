import TopLevelModel, { ModelType } from './TopLevelModel';
import ApexDoc from '../core/ApexDoc';

class EnumModel extends TopLevelModel {

    private values: string[] = [];

    public constructor(comments: string[], nameLine: string, lineNum: number) {
        super(comments, ModelType.ENUM);
        this.setNameLine(nameLine, lineNum);
    }

    public getName(): string {
        let nameLine = this.getNameLine();
        let i = nameLine.indexOf(ApexDoc.ENUM);
        return nameLine.slice(i + ApexDoc.ENUM.length).trim();
    }

    public getGroupName(): string {
        return this.groupName;
    }

    protected setNameLine(nameLine: string, lineNum: number): void {
        if (nameLine) {
            // remove any trailing stuff after enum name
            let i = nameLine.indexOf('{');
            if (i > 0) {
                nameLine = nameLine.substring(0, i);
            }
        }

        super.setNameLine(nameLine.trim(), lineNum);
    }

    public getValues(): string[] {
        return this.values;
    }
}

export default EnumModel;