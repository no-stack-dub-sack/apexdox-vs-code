import { basename } from 'path';

class ClassGroup {
    private _name: string;
    private _contentSource: string;

    public constructor(name: string, contentSource: string) {
        this._name = name;
        this._contentSource = contentSource;
    }

    public get name(): string {
        return this._name;
    }


    public get contentSource(): string {
        return this._contentSource;
    }

    public set contentSource(contentSource: string) {
        this._contentSource = contentSource;
    }

    public get contentFileName(): string {
        if (this._contentSource) {
            let fileName = basename(this._contentSource);
            let idx = fileName.lastIndexOf('.');
            return fileName.substring(0, idx);
        }

        return '';
    }
}

export { ClassGroup };