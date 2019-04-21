import langConfig from '../syntaxes/apex.onEnterRules.config';
import { Disposable, languages } from 'vscode';

export default function(): Disposable {
    return languages.setLanguageConfiguration('apex', langConfig);
}