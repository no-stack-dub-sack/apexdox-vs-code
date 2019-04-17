import langConfig from '../docBlock/apex.config';
import { Disposable, languages } from 'vscode';

export default function(): Disposable {
    return languages.setLanguageConfiguration('apex', langConfig);
}