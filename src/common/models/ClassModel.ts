import ApexDoc from '../../engine/ApexDoc';
import { EnumModel } from './EnumModel';
import { MethodModel } from './MethodModel';
import { ModelType, TopLevelModel } from './TopLevelModel';
import { Option } from '../Utils';
import { PropertyModel } from './PropertyModel';

class ClassModel extends TopLevelModel {

    private _childClassMap: Map<string, ClassModel>;
    private _cModelParent?: ClassModel;
    private _enums: Array<EnumModel>;
    private _isInterface: boolean = false;
    private _methods: Array<MethodModel>;
    private _properties: Array<PropertyModel>;

    public constructor(cModelParent: Option<ClassModel>, comments: string[], nameLine: string, lineNum: number, sourceUrl: Option<string>) {
        super(comments, ModelType.CLASS, sourceUrl);
        super.setNameLine(nameLine, lineNum);

        this.setIsInterface(nameLine);
        this._childClassMap = new Map<string, ClassModel>();
        this._cModelParent = cModelParent;
        this._properties = [];
        this._methods = [];
        this._enums = [];
    }

    public addChildClass(child: ClassModel): void {
        this._childClassMap.set(child.name.toLowerCase(), child);
    }

    public get childClasses(): Array<ClassModel> {
        return Array.from(this._childClassMap.values());
    }

    public get childClassesSorted(): Array<ClassModel> {
        return this.childClasses
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    public get childClassMap(): Map<string, ClassModel> {
        return this._childClassMap;
    }

    public get enums(): Array<EnumModel> {
        return this._enums;
    }

    public get enumsSorted(): Array<EnumModel> {
        let sorted = [...this._enums];
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        return sorted;
    }

    public get groupName(): string {
        let group: string;
        if (this._cModelParent) {
            group = this._cModelParent.groupName;
        } else {
            group = this._groupName;
        }

        return group;
    }

    public get isInterface(): boolean {
        return this._isInterface;
    }

    public get methods(): Array<MethodModel> {
        // interface methods do not have access modifiers.
        // ensure that they take the scope of their defining
        // type and are not treated as private which is the
        // default for methods w/o access mods
        if (this._isInterface) {
            for (let method of this._methods) {
                method.scope = this._scope;
            }
        }

        return this._methods;
    }

    public get methodsSorted(): Array<MethodModel> {
        let sorted = [...this._methods];
        sorted.sort((a, b) => {
            let nameA = a.name;
            let nameB = b.name;
            let className = this.name;

            if (nameA && nameA === className) {
                return -1;
            } else if (nameB && nameB === className) {
                return 1;
            }

            return nameA.localeCompare(nameB);
        });

        // replace overloaded methods with their 'logical' order methods
        // to ensure overload selectors work as expected. e.g. overloaded
        // methods, once sorted, will appear in the order they appear in
        // in the class's source file.
        let methodsCopy = [...this._methods];
        sorted.forEach((method, i, arr) => {
            const matchingMethodIdx = methodsCopy.findIndex((m) => m.name === method.name);
            arr[i] = methodsCopy[matchingMethodIdx];
            methodsCopy.splice(matchingMethodIdx, 1);
        });

        return sorted;
    }

    public get name(): string {
        let nameLine = this.nameLine;
        let parent = !this._cModelParent ? '' : this._cModelParent.name + '.';

        if (nameLine) {
            nameLine = nameLine.trim();
        }

        if (nameLine && nameLine.trim().length > 0) {
            let keywordAt = nameLine.toLowerCase().indexOf(ApexDoc.CLASS + ' ');

            let offset = 6;
            if (keywordAt === -1) {
                keywordAt = nameLine.toLowerCase().indexOf(ApexDoc.INTERFACE + ' ');
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
                return (parent + nameLine.substring(nameLine.lastIndexOf(' ') + 1)).trim();
            }
        } else {
            return '';
        }
    }

    public get properties(): Array<PropertyModel> {
        return this._properties;
    }

    public get propertiesSorted(): Array<PropertyModel> {
        let sorted = [...this._properties];
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        return sorted;
    }

    public get topMostClassName(): string {
        if (this._cModelParent) {
            return this._cModelParent.name;
        } else {
            return this.name;
        }
    }

    private setIsInterface(nameLine: string): void {
        if (/\s?\binterface\s/i.test(nameLine.toLowerCase())) {
            this._isInterface = true;
        }
    }
}

export { ClassModel };