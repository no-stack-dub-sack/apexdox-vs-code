import { basename } from 'path';

class ClassGroup {
    private name: string;
    private contentSource: string;

    public constructor(name: string, contentSource: string) {
        this.name = name;
        this.contentSource = contentSource;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getContentSource(): string {
        return this.contentSource;
    }

    public setContentSource(contentSource: string): void {
        this.contentSource = contentSource;
    }

    public getContentFilename(): string {
        if (this.contentSource) {
            return basename(this.contentSource);
        }

        return '';
    }
}

export default ClassGroup;