import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";
import {provideTranslateService, TranslateCompiler, TranslateService} from "@ngx-translate/core";
import {provideTranslateHttpLoader} from "@ngx-translate/http-loader";
import { TranslateMessageFormatCompiler, MESSAGE_FORMAT_CONFIG } from "ngx-translate-messageformat-compiler";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      compiler: {
        provide: TranslateCompiler,
        useClass: TranslateMessageFormatCompiler,
      },
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.addLangs(["de", "en"]);
    }),
  ]
};
