import ApexDoc from '../apexDoc/ApexDoc';
import { ModelType, TopLevelModel } from './TopLevelModel';
import { Option } from '../utils/Utils';

class EnumModel extends TopLevelModel {

    private _values: string[] = [];

    public constructor(comments: string[], nameLine: string, lineNum: number, sourceUrl: Option<string>) {
        super(comments, ModelType.ENUM, sourceUrl);
        this.setNameLine(nameLine, lineNum);
        this.setValues(nameLine);
    }

    public get groupName(): string {
        return this._groupName;
    }

    public get name(): string {
        let nameLine = this.nameLine;
        let i = nameLine.indexOf(ApexDoc.ENUM);
        return nameLine.slice(i + ApexDoc.ENUM.length).trim();
    }

    public get values(): string[] {
        return this._values;
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
}

export { EnumModel };