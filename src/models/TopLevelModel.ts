import { ApexModel } from './ApexModel';
import { Option } from '../utils/Utils';

export enum ModelType {
    CLASS,
    ENUM
}

abstract class TopLevelModel extends ApexModel {
    public modelType: ModelType;

    constructor(comments: string[], modelType: ModelType, sourceUrl: Option<string>) {
        super(comments, sourceUrl);
        this.modelType = modelType;
    }

    public abstract getGroupName(): string;

    public getAuthor(): string {
        return !this.author ? '' : this.author;
    }

    public getSince(): string {
        return !this.since ? '' : this.since;
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

export { TopLevelModel };