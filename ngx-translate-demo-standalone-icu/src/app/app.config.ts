import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {TranslateModule, TranslateLoader, TranslateCompiler} from "@codeandweb/ngx-translate";
import {TranslateHttpLoader} from '@codeandweb/http-loader';
import {HttpClient} from '@angular/common/http';

import {TranslateMessageFormatCompiler} from 'ngx-translate-messageformat-compiler';


const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
        compiler: {
          provide: TranslateCompiler,
          useClass: TranslateMessageFormatCompiler
        }
    })])
  ],
};