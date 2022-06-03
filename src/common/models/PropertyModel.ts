import { ApexModel } from './ApexModel';
import { Option } from '../..';

class PropertyModel extends ApexModel {
    public constructor(comments: string[], nameLine: string, lineNum: number, sourceUrl: Option<string>) {
        super(comments, sourceUrl);
        this.setNameLine(nameLine, lineNum);
    }

    public get name(): string {
        let nameLine = this.nameLine.trim();
        if (nameLine) {
            let lastIndex = nameLine.lastIndexOf(' ');
            if (lastIndex >= 0) {
                let propertyName = nameLine.substring(lastIndex + 1);
                return propertyName;
            }
        }
        return '';
    }

    protected setNameLine(nameLine: string, lineNum: number): void {
        if (nameLine) {
            // remove any trailing stuff after property name. { =
            let i = nameLine.indexOf('{');
            if (i === -1) {
                i = nameLine.indexOf('=');
            }
            if (i === -1) {
                i = nameLine.indexOf(';');
            }
            if (i >= 0) {
                nameLine = nameLine.substring(0, i);
            }
        }

        super.setNameLine(nameLine, lineNum);
    }
}

export { PropertyModel };
