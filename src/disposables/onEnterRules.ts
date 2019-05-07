import langConfig from '../doc-block/onEnterRules.config';
import { Disposable, languages } from 'vscode';

export default function(): Disposable {
    return languages.setLanguageConfiguration('apex', langConfig);
}