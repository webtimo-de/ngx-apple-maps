import { MapKitInitOptions } from "./declarations";
import * as i0 from "@angular/core";
declare global {
    interface Window {
        mapkit: any;
    }
}
export declare class NgxAppleMapsService {
    private platformId;
    isBrowser: boolean;
    maps: any[];
    mapsQueue: any[];
    initialized: string;
    annotations: {};
    private options;
    location: any;
    region: any;
    center: any;
    constructor(platformId: Object);
    private static settingsLoadedTransform;
    init(options: MapKitInitOptions, settings?: any, cb?: (data: any) => void): void;
    private createMaps;
    createMap(element: any): void;
    private addMapInitOptionsListeners;
    getUserLocation(timeout?: number): Promise<unknown>;
    optionsChanged(changes: any): void;
    settingsChanged(changes: any, key: any): void;
    setAnnotation(annotation: any, key: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxAppleMapsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<NgxAppleMapsService>;
}
