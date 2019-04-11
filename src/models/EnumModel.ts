import ApexDoc from '../apexDoc/ApexDoc';
import TopLevelModel, { ModelType } from './TopLevelModel';

class EnumModel extends TopLevelModel {

    private values: string[] = [];

    public constructor(comments: string[], nameLine: string, lineNum: number) {
        super(comments, ModelType.ENUM);
        this.setNameLine(nameLine, lineNum);
        this.setValues(nameLine);
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

    private setValues(line: string): void {
        line = line.substring(line.indexOf('{') + 1, line.indexOf('}'));
        line.trim()
            .split(',')
            .forEach(value => value.trim()
                && this.values.push(value.trim()));
    }

    public getValues(): string[] {
        return this.values;
    }
}

export default EnumModel;