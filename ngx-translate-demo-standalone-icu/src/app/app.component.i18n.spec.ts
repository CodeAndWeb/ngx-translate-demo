import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {} from 'jasmine';
import {TranslateCompiler, TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {StaticTranslationLoader} from "./static-translations-loader";
import {TranslateMessageFormatCompiler} from "ngx-translate-messageformat-compiler";


describe('AppComponent Localized', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: StaticTranslationLoader,
          },
          compiler: {
            provide: TranslateCompiler,
            useClass: TranslateMessageFormatCompiler
          }
        })],
      providers: []
    }).compileComponents();

    const translateService = TestBed.inject(TranslateService);
    translateService.addLangs(["de", "en"]);
    translateService.setDefaultLang('en');
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should render pluralization for 0 in english (default)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#icuPluralization')?.textContent).toContain('There is no apple.');
  });


  it('should render pluralization for 0 in german', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const translateService = TestBed.inject(TranslateService);
    translateService.use('de');

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#icuPluralization')?.textContent).toContain('Da ist kein Apfel.');
  });


  it('should render pluralization for 1 in English (default) after selecting from combo box', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const selectElement = compiled.querySelector('#count-select') as HTMLSelectElement;
    selectElement.value = '1';
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(compiled.querySelector('#icuPluralization')?.textContent).toContain('There is one apple.');
  });
});
