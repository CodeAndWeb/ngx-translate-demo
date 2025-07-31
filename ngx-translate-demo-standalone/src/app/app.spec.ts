import {TestBed} from "@angular/core/testing";
import {App} from "./app";
import {provideTranslateLoader, provideTranslateService, TranslateService} from "@ngx-translate/core";
import {StaticTranslationLoader} from "./static-translation-loader";


describe("App", () =>
{
    beforeEach(async () =>
    {
        await TestBed.configureTestingModule({
            imports: [App],
            providers: [
                provideTranslateService({
                    loader: provideTranslateLoader(StaticTranslationLoader),
                    lang: "en"
                })
            ]
        }).compileComponents();
    });

    it("should create the app", () =>
    {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it("should render title in english (default)", () =>
    {
        const fixture = TestBed.createComponent(App);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("Translation Demo");
    });

    it("should render title in german", () =>
    {
        const fixture = TestBed.createComponent(App);

        const translateService = TestBed.inject(TranslateService);
        translateService.use("de");

        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("Übersetzungs Demo");
    });

});
