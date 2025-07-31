import {Component, inject, signal} from "@angular/core";
import {_, TranslateDirective, TranslatePipe, TranslateService} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";

type Gender = 'male'|'female'|'other';

@Component({
  selector: 'app-root',
  imports: [TranslateDirective, TranslatePipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public count = signal(0);
  public gender   = signal<Gender>('other');

  private translate = inject(TranslateService);

  useLanguage(language: string) {
    this.translate.use(language);
  }

  onGenderChange(event: Event) {
    this.gender.set((event.target as HTMLSelectElement).value as Gender);
  }

  onCountChange(event: Event)
  {
    this.count.set(parseInt((event.target as HTMLSelectElement).value));
  }
}
