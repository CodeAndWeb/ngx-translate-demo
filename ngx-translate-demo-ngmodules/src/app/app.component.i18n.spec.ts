import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {} from 'jasmine';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {StaticTranslationLoader} from "./static-translations-loader";
import {AppModule} from "./app.module";

describe('AppComponent Localized', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: StaticTranslationLoader,
          },
        })],
      providers: []
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