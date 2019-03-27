import ApexModel from './ApexModel';

class PropertyModel extends ApexModel {

    public constructor(comments: string[], nameLine: string, lineNum: number) {
        super(comments);
        this.setNameLine(nameLine, lineNum);
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

    public getPropertyName(): string {
        let nameLine = this.getNameLine().trim();
        if (nameLine) {
            let lastIndex = nameLine.lastIndexOf(' ');
            if (lastIndex >= 0) {
                let propertyName = nameLine.substring(lastIndex + 1);
                return propertyName;
            }
        }
        return '';
    }
}

export default PropertyModel;