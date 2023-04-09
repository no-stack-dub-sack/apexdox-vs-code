import { ApexModel } from './ApexModel';
import { Option } from '../..';

export enum ModelType {
    CLASS,
    ENUM
}

abstract class TopLevelModel extends ApexModel {
    protected _modelType: ModelType;
    protected _relativeFilePath: string;

    constructor(comments: string[], modelType: ModelType, sourceUrl: Option<string>, relativeFilePath: string) {
        super(comments, sourceUrl);
        this._modelType = modelType;
        this._relativeFilePath = relativeFilePath;
    }

    public abstract get groupName(): string;

    public get groupContentPath(): string {
        return this._groupContentPath;
    }

    public get modelType(): ModelType {
        return this._modelType;
    }

    public get relativeFilePath(): string {
        return this._relativeFilePath;
    }
}

export { TopLevelModel };