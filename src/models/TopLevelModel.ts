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

    public abstract getGroupName(): string;

    public getAuthor(): string {
        return !this.author ? '' : this.author;
    }

    public getDate(): string {
        return !this.date ? '' : this.date;
    }

    public getDeprecated(): string {
        return !this.deprecated ? '' : this.deprecated;
    }

    public getExample(): string {
        // return example and remove trailing white space which
        // may have built up due to the allowance of preserving
        // white pace in complex code example blocks for methods
        return !this.example ? '' : this.example.trimRight();
    }

    public getGroupContentPath(): string {
        return this.groupContentPath;
    }

    public getModelType(): ModelType {
        return this.modelType;
    }

    public getSee(): string[] {
        return this.see;
    }
}

export default TopLevelModel;