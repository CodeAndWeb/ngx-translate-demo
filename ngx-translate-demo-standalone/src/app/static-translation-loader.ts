import {TranslateLoader, TranslationObject} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

import * as TranslationsDE from "../../public/i18n/de.json";
import * as TranslationsEN from "../../public/i18n/en.json";


const TRANSLATIONS: Record<string, TranslationObject> = {
    en: TranslationsEN,
    de: TranslationsDE
};


export class StaticTranslationLoader implements TranslateLoader
{
    public getTranslation(lang: string): Observable<TranslationObject>
    {
        const translation = TRANSLATIONS[lang];
        if (translation)
        {
            return of(translation);
        }
        else
        {
            console.error(`Unknown language: ${lang}`);
            return of({});
        }
    }
}
