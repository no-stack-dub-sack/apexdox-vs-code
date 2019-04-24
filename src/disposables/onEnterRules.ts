import langConfig from '../docBlock/onEnterRules.config';
import { Disposable, languages } from 'vscode';

export default function(): Disposable {
    return languages.setLanguageConfiguration('apex', langConfig);
}