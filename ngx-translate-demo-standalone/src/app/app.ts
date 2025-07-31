import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {_, TranslateDirective, TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  imports: [TranslateDirective, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy{
  public name = "Andreas";

  private subscription?: Subscription;
  private translate = inject(TranslateService);

  ngOnInit(): void
  {
    this.translate.get(_("demo.interpolation.pipe-with-parameters"), {name: "John"})
        .subscribe((text: string) =>
        {
          console.log(`using get(): ${text}`);
        });

    this.translate.use(this.translate.getCurrentLang())
        .subscribe(() =>
        {
          // instant can be used after the language is loaded
          const text2 = this.translate.instant(_("demo.interpolation.pipe-with-parameters"), {name: "John"});
          console.log(`using instant() inside the promise: ${text2}`);
        });

    this.subscription = this.translate.stream(_("demo.interpolation.pipe-with-parameters"), {name: "John"})
                            .subscribe((text: string) =>
                            {
                              console.log(`using stream(): ${text}`);
                            });
  }

  ngOnDestroy(): void
  {
    this.subscription?.unsubscribe();
  }

  useLanguage(language: string): void
  {
    this.translate.use(language);
  }
}
