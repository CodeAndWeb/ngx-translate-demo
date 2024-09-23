import { TranslateLoader } from '@codeandweb/ngx-translate';
import { Observable, of } from 'rxjs';

import * as TranslationsDE from '../../public/i18n/de.json';
import * as TranslationsEN from '../../public/i18n/en.json';

interface Translation {
    [key: string]: string | Translation;
}

const TRANSLATIONS: Record<string, Translation> = {
    en: TranslationsEN,
    de: TranslationsDE
};

export class StaticTranslationLoader implements TranslateLoader {
    public getTranslation(lang: string): Observable<Translation> {
        const translation = TRANSLATIONS[lang];
        if (translation) {
            return of(translation);
        } else {
            console.error(`Unknown language: ${lang}`);
            return of({});
        }
    }
}
