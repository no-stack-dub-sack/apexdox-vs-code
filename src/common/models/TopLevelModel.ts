import { ApexModel } from './ApexModel';
import { Option } from '../..';

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

    public get groupContentPath(): string {
        return this._groupContentPath;
    }

    public get modelType(): ModelType {
        return this._modelType;
    }
}

export { TopLevelModel };