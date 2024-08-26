import {Component, OnDestroy} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {

  name = "Andreas";

  private subscription: Subscription;

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['de', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang() || "en");

    translate.get(_('demo.interpolation.pipe-with-parameters'), {name: 'John'}).subscribe((text: string) => {
      console.log(`using get(): ${text}`);

      // translations are already loaded - you can now use instant()
      const text2 = translate.instant(_('demo.interpolation.pipe-with-parameters'), {name: 'John'})
      console.log(`using instant() inside the promise: ${text2}`);
    });

    // using instant will not work since the translations are not loaded yet
    const text = translate.instant(_('demo.interpolation.pipe-with-parameters'), {name: 'John'})
    console.log(`using instant(): ${text}`);

    this.subscription = translate.stream(_('demo.interpolation.pipe-with-parameters'), {name: 'John'}).subscribe((text: string) => {
      console.log(`using stream(): ${text}`);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
