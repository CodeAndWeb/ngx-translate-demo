import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription | undefined;

    idFromCode = _('demo.text-in-code');

    translatedMessageFromCode = "";
    continuouslyTranslatedMessage = "";

    constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    ngOnInit() {
        // translate message once
        this.translate.get('demo.greeting', {name: 'John'}).subscribe((res: string) => {
            this.translatedMessageFromCode = res;
        });

        // continuously update the property
        this.subscription = this.translate.stream('demo.greeting', {name: 'John'}).subscribe((res: string) => {
            this.continuouslyTranslatedMessage = res;
        });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe()
    }

    useLanguage(language: string) {
        this.translate.use(language);
    }
}
