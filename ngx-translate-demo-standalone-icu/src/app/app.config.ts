import {ApplicationConfig, provideZoneChangeDetection} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateCompiler, provideTranslateService} from "@codeandweb/ngx-translate";
import {TranslateHttpLoader} from '@codeandweb/http-loader';
import {HttpClient} from '@angular/common/http';

import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';


const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideTranslateService({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler
        }
    })
  ],
};