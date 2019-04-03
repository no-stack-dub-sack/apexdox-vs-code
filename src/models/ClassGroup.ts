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
            let idx1 = this.contentSource.lastIndexOf('/');
            let idx2 = this.contentSource.lastIndexOf('.');
            if (idx1 !== -1 && idx2 !== -1) {
                return this.contentSource.substring(idx1 + 1, idx2);
            }
        }
        // TODO: note that this used to return null. May need to fix a reference somewhere later in the translation!
        return '';
    }
}

export default ClassGroup;