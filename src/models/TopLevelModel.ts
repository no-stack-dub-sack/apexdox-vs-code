import ApexModel from './ApexModel';

export enum ModelType {
    CLASS,
    ENUM
}

abstract class TopLevelModel extends ApexModel {
    public modelType: ModelType;

    constructor(comments: string[], modelType: ModelType) {
        super(comments);
        this.modelType = modelType;
    }

    public abstract getName(): string;

    public abstract getGroupName(): string;

    public getGroupContentPath(): string {
        return this.groupContentPath;
    }

    public getModelType(): ModelType {
        return this.modelType;
    }
}

export default TopLevelModel;