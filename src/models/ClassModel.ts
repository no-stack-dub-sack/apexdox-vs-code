import ApexDoc from '../core/ApexDoc';
import EnumModel from './EnumModel';
import MethodModel from './MethodModel';
import PropertyModel from './PropertyModel';
import TopLevelModel, { ModelType } from './TopLevelModel';

class ClassModel extends TopLevelModel {

    private isInterface: boolean;
    private enums: Array<EnumModel>;
    private cmodelParent?: ClassModel;
    private methods: Array<MethodModel>;
    private childClasses: Array<ClassModel>;
    private properties: Array<PropertyModel>;
    private childClassMap: Map<string, ClassModel>;

    public constructor(cmodelParent: ClassModel | undefined, comments: string[], nameLine: string, lineNum: number) {
        super(comments, ModelType.CLASS);
        super.setNameLine(nameLine, lineNum);

        this.childClassMap = new Map<string, ClassModel>();
        this.isInterface = this.setIsInterface(nameLine);
        this.cmodelParent = cmodelParent;
        this.childClasses = [];
        this.properties = [];
        this.methods = [];
        this.enums = [];
    }

    private setIsInterface(nameLine: string): boolean {
        if (/\s?\binterface\s/i.test(nameLine.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    }

    public getIsInterface(): boolean {
        return this.isInterface;
    }

    public getSee(): string {
        return !this.see ? '' : this.see;
    }

    public getEnums(): Array<EnumModel> {
        return this.enums;
    }

    public getEnumsSorted(): Array<EnumModel> {
        let sorted = [...this.enums];
        sorted.sort((a, b) => a.getName().localeCompare(b.getName()));
        return sorted;
    }

    public getProperties(): Array<PropertyModel> {
        return this.properties;
    }

    public getPropertiesSorted(): Array<PropertyModel> {
        let sorted = [...this.properties];
        sorted.sort((a, b) => a.getPropertyName().localeCompare(b.getPropertyName()));
        return sorted;
    }

    public getMethods(): Array<MethodModel> {
        // ensure interface methods take the
        // scope of their defining type
        if (this.isInterface) {
            for (let method of this.methods) {
                method.setScope(this.getScope());
            }
        }

        return this.methods;
    }

    public getMethodsSorted(): Array<MethodModel> {
        let sorted = [...this.methods];
        sorted.sort((a, b) => {
            let nameA = a.getMethodName();
            let nameB = b.getMethodName();
            let className = this.getName();

            if (nameA && nameA === className) {
                return -1;
            } else if (nameB && nameB === className) {
                return 1;
            }

            return nameA.localeCompare(nameB);
        });

        return sorted;
    }

    public setMethods(methods: Array<MethodModel>): void {
        this.methods = methods;
    }

    public getChildClasses(): Array<ClassModel> {
        return this.childClasses;
    }

    public getChildClassesSorted(): Array<ClassModel> {
        let sorted = [...this.childClasses];
        sorted.sort((a, b) => a.getName().localeCompare(b.getName()));
        return sorted;
    }

    public addChildClass(child: ClassModel): void {
        this.childClasses.push(child);
        // also add child class to map for use in making @see links
        this.childClassMap.set(child.getName().toLowerCase(), child);
    }

    public getChildClassMap(): Map<string, ClassModel> {
        return this.childClassMap;
    }

    public getName(): string {
        let nameLine = this.getNameLine();
        let parent = !this.cmodelParent ? '' : this.cmodelParent.getName() + ".";

        if (nameLine) {
            nameLine = nameLine.trim();
        }

        if (nameLine && nameLine.trim().length > 0) {
            let keywordAt = nameLine.toLowerCase().indexOf(ApexDoc.CLASS + " ");

            let offset = 6;
            if (keywordAt === -1) {
                keywordAt = nameLine.toLowerCase().indexOf(ApexDoc.INTERFACE + " ");
                offset = 10;
            }

            if (keywordAt > -1) {
                nameLine = nameLine.substring(keywordAt + offset).trim();
            }

            let spaceAt = nameLine.indexOf(' ');
            if (spaceAt === -1) {
                return parent + nameLine;
            }

            // TODO: come back to this. Does this work as expected? Is it needed?
            try {
                let name = nameLine.substring(0, spaceAt);
                return (parent + name).trim();
            } catch (ex) {
                return (parent + nameLine.substring(nameLine.lastIndexOf(" ") + 1)).trim();
            }
        } else {
            return '';
        }
    }

    public getTopmostClassName(): string {
        if (this.cmodelParent) {
            return this.cmodelParent.getName();
        } else {
            return this.getName();
        }
    }

    // TODO: this used to return null if group was null. Make sure returning empty string is OK.
    public getGroupName(): string {
        let group: string;
        if (this.cmodelParent) {
            group = this.cmodelParent.getGroupName();
        } else {
            group = this.groupName;
        }

        return !group ? '' : group;
    }
}

export default ClassModel;