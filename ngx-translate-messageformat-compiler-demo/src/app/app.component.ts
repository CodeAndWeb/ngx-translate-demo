import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    subscription: Subscription | undefined;

    constructor(private translate: TranslateService) {
        translate.setDefaultLang('en');
        translate.use('en');
    }

    useLanguage(language: string) {
        this.translate.use(language);
    }
}
