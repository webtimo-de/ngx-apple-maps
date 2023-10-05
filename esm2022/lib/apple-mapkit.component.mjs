import { Component, ContentChildren, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as i0 from "@angular/core";
import * as i1 from "./apple-maps.service";
export class AppleMapkitComponent {
    constructor(differs, appleMapsService, viewTemplateRef, cdr) {
        this.differs = differs;
        this.appleMapsService = appleMapsService;
        this.viewTemplateRef = viewTemplateRef;
        this.cdr = cdr;
        this.logging = false;
        this.onLoaded = new EventEmitter();
        this.loaded = null;
        // @ContentChildren(TemplateRef, {descendants: true}) template: QueryList<TemplateRef<any>>;
        // private templates: QueryList<TemplateRef<any>>;
        this.defaultOptions = { language: 'en' };
        // annotations = [];
        this.defaultSettings = {
            colorScheme: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
            isZoomEnabled: true,
            mapType: 'standard',
            showsZoomControl: true,
            showsMapTypeControl: true
        };
        this.keySource = new BehaviorSubject(-1);
        this.key = this.keySource.asObservable();
        this.settings = {};
    }
    init() {
        if (this.language && typeof this.language === "string") {
            this.defaultOptions.language = this.language;
        }
        const settings = Object.assign({ ...this.defaultSettings, ...this.settings });
        const options = Object.assign({ ...this.defaultOptions, ...this.options });
        this.appleMapsService.init(options, settings, (data) => {
            if (this.logging) {
                console.log("[ngx-apple-mapkit] Init", data);
            }
            if (!this.loaded) {
                this.onLoaded.emit(data);
                this.loaded = data;
            }
            this.keyValue = data.key;
            this.keySource.next(data.key);
        });
    }
    optionsChanged(changes) {
        this.appleMapsService.optionsChanged(changes);
    }
    settingsChanged(changes) {
        this.appleMapsService.settingsChanged(changes, this.keyValue);
    }
    // ngAfterContentInit(): void {
    //     this.template.forEach(item => {
    //         const template = this.viewTemplateRef.createEmbeddedView(item);
    //         this.viewTemplateRef.remove(this.viewTemplateRef.indexOf(template));
    //         template.detectChanges();
    //         this.annotations.push(item);
    //         this.viewTemplateRef.clear();
    //     });
    // }
    ngOnInit() {
        if (!this.options) {
            throw new Error('You must provide JWT token');
        }
        else {
            this._options = this.differs.find(this.options).create();
            this.init();
        }
        if (this.settings) {
            this._settings = this.differs.find(this.settings).create();
        }
    }
    ngDoCheck() {
        if (this.options) {
            const options = this._options.diff(this.options);
            if (options) {
                this.optionsChanged(options);
            }
        }
        if (this.settings) {
            const settings = this._settings.diff(this.settings);
            if (settings) {
                this.settingsChanged(settings);
            }
        }
    }
    ngAfterViewInit() {
        this.cdr.detectChanges();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitComponent, deps: [{ token: i0.KeyValueDiffers }, { token: i1.AppleMapsService }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.3", type: AppleMapkitComponent, selector: "ngx-apple-mapkit", inputs: { options: "options", settings: "settings", logging: "logging", language: "language", height: "height" }, outputs: { onLoaded: "onLoaded" }, queries: [{ propertyName: "annotations", predicate: ["apple-mapkit-annotation"], descendants: true }], ngImport: i0, template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: AppleMapkitComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-apple-mapkit', template: "<div class=\"ngx-apple-mapkit\">\r\n    <div class=\"ngx-apple-mapkit__map\"></div>\r\n</div>\r\n<ng-content></ng-content>\r\n<ng-container></ng-container>\r\n", styles: [".ngx-apple-mapkit{height:100%;position:relative}.ngx-apple-mapkit .ngx-apple-mapkit__map{inset:0;position:absolute}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.KeyValueDiffers }, { type: i1.AppleMapsService }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { options: [{
                type: Input
            }], settings: [{
                type: Input
            }], logging: [{
                type: Input
            }], language: [{
                type: Input
            }], height: [{
                type: Input
            }], onLoaded: [{
                type: Output
            }], annotations: [{
                type: ContentChildren,
                args: ['apple-mapkit-annotation', { descendants: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGUtbWFwa2l0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBraXQvc3JjL2xpYi9hcHBsZS1tYXBraXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWFwcGxlLW1hcGtpdC9zcmMvbGliL2FwcGxlLW1hcGtpdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0gsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUlMLE1BQU0sRUFHVCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sTUFBTSxDQUFDOzs7QUFTckMsTUFBTSxPQUFPLG9CQUFvQjtJQTRCN0IsWUFBb0IsT0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLGVBQWlDLEVBQ2pDLEdBQXNCO1FBSHRCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQ2pDLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBNUJqQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBR3hCLGFBQVEsR0FBK0IsSUFBSSxZQUFZLEVBQWdCLENBQUM7UUFDMUUsV0FBTSxHQUFpQixJQUFJLENBQUM7UUFFcEMsNEZBQTRGO1FBQzVGLGtEQUFrRDtRQUMzQyxtQkFBYyxHQUFHLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDO1FBQ3pDLG9CQUFvQjtRQUNiLG9CQUFlLEdBQUc7WUFDckIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQzlHLGFBQWEsRUFBRSxJQUFJO1lB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QUksT0FBTyxFQUFFO2dCQUNULElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDaEM7U0FDSjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwRCxJQUFJLFFBQVEsRUFBRTtnQkFDVixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQzs4R0FyR1Esb0JBQW9CO2tHQUFwQixvQkFBb0Isb1RDekJqQyxpS0FLQTs7MkZEb0JhLG9CQUFvQjtrQkFMaEMsU0FBUzsrQkFDSSxrQkFBa0I7b01BS25CLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQUUwRCxXQUFXO3NCQUEzRSxlQUFlO3VCQUFDLHlCQUF5QixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBBZnRlclZpZXdJbml0LFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBDb21wb25lbnQsXHJcbiAgICBDb250ZW50Q2hpbGRyZW4sXHJcbiAgICBEb0NoZWNrLFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgSW5wdXQsXHJcbiAgICBLZXlWYWx1ZUNoYW5nZXMsXHJcbiAgICBLZXlWYWx1ZURpZmZlcnMsXHJcbiAgICBPbkluaXQsXHJcbiAgICBPdXRwdXQsXHJcbiAgICBRdWVyeUxpc3QsXHJcbiAgICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TWFwQ29uc3RydWN0b3JPcHRpb25zLCBNYXBLaXRJbml0T3B0aW9ucywgTWFwS2l0TG9hZGVkfSBmcm9tIFwiLi9kZWNsYXJhdGlvbnNcIjtcclxuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCB7QXBwbGVNYXBzU2VydmljZX0gZnJvbSBcIi4vYXBwbGUtbWFwcy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7QXBwbGVNYXBraXRBbm5vdGF0aW9uQ29tcG9uZW50fSBmcm9tIFwiLi9jb21wb25lbnRzL2FwcGxlLW1hcGtpdC1hbm5vdGF0aW9uL2FwcGxlLW1hcGtpdC1hbm5vdGF0aW9uLmNvbXBvbmVudFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ25neC1hcHBsZS1tYXBraXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2FwcGxlLW1hcGtpdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9hcHBsZS1tYXBraXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBsZU1hcGtpdENvbXBvbmVudCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcbiAgICBASW5wdXQoKSBvcHRpb25zOiBNYXBLaXRJbml0T3B0aW9ucztcclxuICAgIEBJbnB1dCgpIHNldHRpbmdzOiBNYXBDb25zdHJ1Y3Rvck9wdGlvbnM7XHJcbiAgICBASW5wdXQoKSBsb2dnaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBsYW5ndWFnZTogXCJlblwiIHwgXCJkZVwiIHwgXCJlc1wiIHwgXCJpdFwiIHwgIFwiZnJcIiB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGhlaWdodDogc3RyaW5nO1xyXG4gICAgQE91dHB1dCgpIG9uTG9hZGVkOiBFdmVudEVtaXR0ZXI8TWFwS2l0TG9hZGVkPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWFwS2l0TG9hZGVkPigpO1xyXG4gICAgcHJpdmF0ZSBsb2FkZWQ6IE1hcEtpdExvYWRlZCA9IG51bGw7XHJcbiAgICBAQ29udGVudENoaWxkcmVuKCdhcHBsZS1tYXBraXQtYW5ub3RhdGlvbicsIHtkZXNjZW5kYW50czogdHJ1ZX0pIGFubm90YXRpb25zOiBRdWVyeUxpc3Q8QXBwbGVNYXBraXRBbm5vdGF0aW9uQ29tcG9uZW50PjtcclxuICAgIC8vIEBDb250ZW50Q2hpbGRyZW4oVGVtcGxhdGVSZWYsIHtkZXNjZW5kYW50czogdHJ1ZX0pIHRlbXBsYXRlOiBRdWVyeUxpc3Q8VGVtcGxhdGVSZWY8YW55Pj47XHJcbiAgICAvLyBwcml2YXRlIHRlbXBsYXRlczogUXVlcnlMaXN0PFRlbXBsYXRlUmVmPGFueT4+O1xyXG4gICAgcHVibGljIGRlZmF1bHRPcHRpb25zID0ge2xhbmd1YWdlOiAnZW4nfTtcclxuICAgIC8vIGFubm90YXRpb25zID0gW107XHJcbiAgICBwdWJsaWMgZGVmYXVsdFNldHRpbmdzID0ge1xyXG4gICAgICAgIGNvbG9yU2NoZW1lOiB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXMgPyAnZGFyaycgOiAnbGlnaHQnLFxyXG4gICAgICAgIGlzWm9vbUVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgbWFwVHlwZTogJ3N0YW5kYXJkJyxcclxuICAgICAgICBzaG93c1pvb21Db250cm9sOiB0cnVlLFxyXG4gICAgICAgIHNob3dzTWFwVHlwZUNvbnRyb2w6IHRydWVcclxuICAgIH07XHJcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxyXG4gICAgcHJpdmF0ZSBfb3B0aW9uczogYW55O1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnZhcmlhYmxlLW5hbWVcclxuICAgIHByaXZhdGUgX3NldHRpbmdzOiBhbnk7XHJcbiAgICBwcml2YXRlIGtleVZhbHVlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMga2V5U291cmNlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KC0xKTtcclxuICAgIHB1YmxpYyBrZXkgPSB0aGlzLmtleVNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRpZmZlcnM6IEtleVZhbHVlRGlmZmVycyxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXBwbGVNYXBzU2VydmljZTogQXBwbGVNYXBzU2VydmljZSxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdmlld1RlbXBsYXRlUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5sYW5ndWFnZSAmJiB0eXBlb2YgdGhpcy5sYW5ndWFnZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRPcHRpb25zLmxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHsuLi50aGlzLmRlZmF1bHRTZXR0aW5ncywgLi4udGhpcy5zZXR0aW5nc30pO1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHsuLi50aGlzLmRlZmF1bHRPcHRpb25zLCAuLi50aGlzLm9wdGlvbnN9KTtcclxuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2UuaW5pdChvcHRpb25zLCBzZXR0aW5ncywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubG9nZ2luZykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbbmd4LWFwcGxlLW1hcGtpdF0gSW5pdFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMubG9hZGVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZGVkLmVtaXQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRlZCA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5rZXlWYWx1ZSA9IGRhdGEua2V5O1xyXG4gICAgICAgICAgICB0aGlzLmtleVNvdXJjZS5uZXh0KGRhdGEua2V5KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9wdGlvbnNDaGFuZ2VkKGNoYW5nZXM6IEtleVZhbHVlQ2hhbmdlczxzdHJpbmcsIGFueT4pIHtcclxuICAgICAgICB0aGlzLmFwcGxlTWFwc1NlcnZpY2Uub3B0aW9uc0NoYW5nZWQoY2hhbmdlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXR0aW5nc0NoYW5nZWQoY2hhbmdlczogS2V5VmFsdWVDaGFuZ2VzPHN0cmluZywgYW55Pikge1xyXG4gICAgICAgIHRoaXMuYXBwbGVNYXBzU2VydmljZS5zZXR0aW5nc0NoYW5nZWQoY2hhbmdlcywgdGhpcy5rZXlWYWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xyXG4gICAgLy8gICAgIHRoaXMudGVtcGxhdGUuZm9yRWFjaChpdGVtID0+IHtcclxuICAgIC8vICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5jcmVhdGVFbWJlZGRlZFZpZXcoaXRlbSk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMudmlld1RlbXBsYXRlUmVmLnJlbW92ZSh0aGlzLnZpZXdUZW1wbGF0ZVJlZi5pbmRleE9mKHRlbXBsYXRlKSk7XHJcbiAgICAvLyAgICAgICAgIHRlbXBsYXRlLmRldGVjdENoYW5nZXMoKTtcclxuICAgIC8vICAgICAgICAgdGhpcy5hbm5vdGF0aW9ucy5wdXNoKGl0ZW0pO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnZpZXdUZW1wbGF0ZVJlZi5jbGVhcigpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG11c3QgcHJvdmlkZSBKV1QgdG9rZW4nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5vcHRpb25zKS5jcmVhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzID0gdGhpcy5kaWZmZXJzLmZpbmQodGhpcy5zZXR0aW5ncykuY3JlYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nRG9DaGVjaygpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLl9vcHRpb25zLmRpZmYodGhpcy5vcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uc0NoYW5nZWQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLl9zZXR0aW5ncy5kaWZmKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NDaGFuZ2VkKHNldHRpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJuZ3gtYXBwbGUtbWFwa2l0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LWFwcGxlLW1hcGtpdF9fbWFwXCI+PC9kaXY+XHJcbjwvZGl2PlxyXG48bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbjxuZy1jb250YWluZXI+PC9uZy1jb250YWluZXI+XHJcbiJdfQ==