import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {_, TranslateDirective, TranslatePipe, TranslateService} from "@ngx-translate/core";


@Component({
    selector: "app-root",
    imports: [
        TranslatePipe,
        TranslateDirective
    ],
    templateUrl: "./app.html",
    styleUrl: "./app.scss"
})
export class App implements OnInit, OnDestroy
{
    private translate = inject(TranslateService);
    name = "Andreas";

    private subscription?: Subscription;

    ngOnInit(): void
    {
        this.translate.get(_("demo.interpolation.instant"), {name: "John"})
            .subscribe((text: string) =>
            {
                console.log(`using get(): ${text}`);
            });

        const text2 = this.translate.instant(_("demo.interpolation.instant"), {name: "John"});
        console.log(`using instant() too early: ${text2}`);

        this.translate.use(this.translate.getCurrentLang())
            .subscribe(() =>
            {
                // instant can be used after the language is loaded
                // we wait for it by setting the current language again
                // the observable emits as soon as the language is loaded
                const text2 = this.translate.instant(_("demo.interpolation.instant"), {name: "John"});
                console.log(`using instant() after loading is done: ${text2}`);
            });

        this.subscription = this.translate.stream(_("demo.interpolation.instant"), {name: "John"})
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
