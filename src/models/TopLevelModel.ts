import { ApexModel } from './ApexModel';
import { Option } from '../utils/Utils';

export enum ModelType {
    CLASS,
    ENUM
}

abstract class TopLevelModel extends ApexModel {
    protected _modelType: ModelType;

    constructor(comments: string[], modelType: ModelType, sourceUrl: Option<string>) {
        super(comments, sourceUrl);
        this._modelType = modelType;
    }

    public abstract get groupName(): string;

    public get author(): string {
        return this._author;
    }

    public get since(): string {
        return this._since;
    }

    public get deprecated(): string {
        return this._deprecated;
    }

    public get example(): string {
        // remove trailing white space which may have built
        // up due to the allowance of preserving white pace
        return this._example.trimRight();
    }

    public get groupContentPath(): string {
        return this._groupContentPath;
    }

    public get modelType(): ModelType {
        return this._modelType;
    }

    public get see(): string[] {
        return this._see;
    }
}

export { TopLevelModel };