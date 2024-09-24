import {Component} from "@angular/core";
import {TranslateDirective, TranslatePipe, TranslateService} from "@codeandweb/ngx-translate";
import {FormsModule} from "@angular/forms";

type Gender = 'male'|'female'|'other';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslatePipe, TranslateDirective, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  count = 0;
  gender:Gender  = 'other';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(["de", "en"]);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  onGenderChange(event: Event) {
    this.gender = (event.target as HTMLSelectElement).value as Gender;
  }

  onCountChange(event: Event)
  {
      this.count = parseInt((event.target as HTMLSelectElement).value);
  }
}
