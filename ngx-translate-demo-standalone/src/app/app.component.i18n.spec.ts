import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {} from 'jasmine';
import {provideTranslateService, TranslateLoader, TranslateService} from "@codeandweb/ngx-translate";
import {StaticTranslationLoader} from "./static-translations-loader";

describe('AppComponent Localized', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
      ],
      providers: [
        provideTranslateService({
          loader: {
            provide: TranslateLoader,
            useClass: StaticTranslationLoader,
          },
        })
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in english (default)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Translation Demo');
  });

  it('should render title in german', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const translateService = TestBed.inject(TranslateService);
    translateService.use('de');

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Übersetzungs Demo');
  });
});