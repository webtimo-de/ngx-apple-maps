import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
export class NgxAppleMapsService {
    constructor(platformId) {
        this.platformId = platformId;
        this.maps = [];
        this.mapsQueue = [];
        this.initialized = 'STOPPED';
        this.annotations = {};
        this.isBrowser = isPlatformBrowser(this.platformId);
    }
    static settingsLoadedTransform(settings = {}) {
        const newSettings = {};
        for (const item in settings) {
            if (settings[item]) {
                switch (item) {
                    case 'center':
                        newSettings[item] = new window.mapkit.Coordinate(settings[item].latitude, settings[item].longitude);
                        break;
                    case 'region':
                        const regionCenter = new window.mapkit.Coordinate(settings[item].center.latitude, settings[item].center.longitude);
                        if (settings[item].span) {
                            const regionSpan = new window.mapkit.CoordinateSpan(settings[item].span.from, settings[item].span.to);
                            newSettings[item] = new window.mapkit.CoordinateRegion(regionCenter, regionSpan);
                            break;
                        }
                        newSettings[item] = new window.mapkit.CoordinateRegion(regionCenter);
                        break;
                    case 'padding':
                        newSettings[item] = new window.mapkit.Padding(settings[item]);
                        break;
                    default:
                        newSettings[item] = settings[item];
                        break;
                }
            }
        }
        return newSettings;
    }
    init(options, settings = {}, cb = (data) => { }) {
        if (!options.JWT || !this.isBrowser) {
            return;
        }
        this.mapsQueue.push({ settings, cb });
        if (this.initialized === 'STOPPED') {
            this.initialized = 'PENDING';
            this.options = options;
            window.mapkit.init({
                authorizationCallback: (done) => {
                    done(options.JWT);
                },
                language: this.options.language
            });
            this.addMapInitOptionsListeners(options);
        }
        if (this.initialized === 'FINISHED') {
            this.createMaps();
        }
    }
    createMaps() {
        const maps = document.querySelectorAll('ngx-apple-maps');
        maps.forEach(element => {
            const mapContainer = element.childNodes[0].childNodes[0];
            if (!mapContainer.innerHTML) {
                this.createMap(mapContainer);
            }
        });
    }
    createMap(element) {
        const options = this.mapsQueue.shift();
        // noinspection TypeScriptValidateJSTypes
        const index = this.maps.push(new window.mapkit.Map(element, NgxAppleMapsService.settingsLoadedTransform(options.settings)));
        const object = {
            key: index - 1,
            map: this.maps[index - 1],
            isRotationAvailable: () => {
                return this.maps[index - 1].isRotationAvailable;
            },
            isRotationEnabled: () => {
                return this.maps[index - 1].isRotationEnabled;
            },
            isScrollEnabled: () => {
                return this.maps[index - 1].isScrollEnabled;
            },
            isZoomEnabled: () => {
                return this.maps[index - 1].isZoomEnabled;
            },
            getCenter: () => {
                const { latitude, longitude } = this.maps[index - 1].center;
                return { latitude, longitude };
            },
            // setCenter: (latitude: number, longitude: number) => {
            //   this.maps[index - 1].center = new window.mapkit.Coordinate(latitude, longitude);
            // },
            setCenterAnimated: (latitude, longitude, animate = true) => {
                this.maps[index - 1].setCenterAnimated(new window.mapkit.Coordinate(latitude, longitude), animate);
            },
            getRegion: () => {
                return this.maps[index - 1].region;
            },
            setRegionAnimated: (center, span = null, animate = true) => {
                const regionCenter = new window.mapkit.Coordinate(center.latitude, center.longitude);
                if (span) {
                    const regionSpan = new window.mapkit.CoordinateSpan(span.from, span.to);
                    this.maps[index - 1].setRegionAnimated(new window.mapkit.CoordinateRegion(regionCenter, regionSpan), animate);
                    return;
                }
                this.maps[index - 1].setRegionAnimated(new window.mapkit.CoordinateRegion(regionCenter), animate);
            },
            getRotation: () => {
                return this.maps[index - 1].rotation;
            },
            setRotationAnimated: (degrees, animate = true) => {
                this.maps[index - 1].setRotationAnimated(degrees, animate);
            },
            // getVisibleMapRect: () => {
            //   return this.maps[index - 1].visibleMapsRect;
            // },      // setVisibleMapRectAnimated: () => {
            // }
            getCameraDistance: () => {
                return this.maps[index - 1].cameraDistance;
            }, setCameraDistanceAnimated: (distance, animate = true) => {
                this.maps[index - 1].setCameraDistanceAnimated(distance, animate);
            }, getCameraZoomRange: () => {
                const { minCameraDistance, maxCameraDistance } = this.maps[index - 1].cameraZoomRange;
                return { minCameraDistance, maxCameraDistance };
            }, setCameraZoomRangeAnimated: (minCameraDistance, maxCameraDistance, animate = true) => {
                this.maps[index - 1].setCameraZoomRangeAnimated(new window.mapkit.CameraZoomRange(minCameraDistance, maxCameraDistance), animate);
            }, getColorScheme: () => {
                return this.maps[index - 1].colorScheme;
            }, setColorScheme: (scheme = 'light') => {
                this.maps[index - 1].colorScheme = scheme;
            }, getDistances: () => {
                return this.maps[index - 1].distances;
            }, setDistances: (distance) => {
                this.maps[index - 1].distances = distance;
            }, getMapType: () => {
                return this.maps[index - 1].mapType;
            }, setMapType: (type) => {
                this.maps[index - 1].mapType = type;
            }, getPadding: () => {
                return this.maps[index - 1].padding;
            }, setPadding: (padding) => {
                this.maps[index - 1].padding = new window.mapkit.Padding(padding);
            }, getShowsMapTypeControl: () => {
                return this.maps[index - 1].showsMapTypeControl;
            }, setShowsMapTypeControl: (value) => {
                this.maps[index - 1].showsMapTypeControl = value;
            }, getShowsZoomControl: () => {
                return this.maps[index - 1].showsZoomControl;
            }, setShowsZoomControl: (value) => {
                this.maps[index - 1].showsZoomControl = value;
            }, getShowsUserLocationControl: () => {
                return this.maps[index - 1].showsUserLocationControl;
            }, setShowsUserLocationControl: (value) => {
                this.maps[index - 1].showsUserLocationControl = value;
            }, getShowsPointsOfInterest: () => {
                return this.maps[index - 1].showsPointsOfInterest;
            }, setShowsPointsOfInterest: (value) => {
                this.maps[index - 1].showsPointsOfInterest = value;
            }, getShowsScale: () => {
                return this.maps[index - 1].showsScale;
            }, setShowsScale: (value) => {
                this.maps[index - 1].showsScale = value;
            }, getTintColor: () => {
                return this.maps[index - 1].tintColor;
            }, setTintColor: (color) => {
                this.maps[index - 1].tintColor = color;
            }, showItems: (items, mapShowItemOptions = {}) => {
                const passingOptions = { animate: options.animate || true };
                if (mapShowItemOptions.span) {
                    // @ts-ignore
                    passingOptions.minimumSpan = new window.mapkit.CoordinateSpan(mapShowItemOptions.span.from, mapShowItemOptions.span.to);
                }
                if (mapShowItemOptions.padding) {
                    // @ts-ignore
                    passingOptions.padding = new window.mapkit.Padding(mapShowItemOptions.padding);
                }
                const passingItems = Array.isArray(items) ? items : [items];
                this.maps[index - 1].showItems(passingItems, passingOptions);
            }, getAnnotations: () => {
                return new Promise(resolve => {
                    if (this.annotations[index - 1]) {
                        resolve(this.annotations[index - 1]);
                    }
                    else {
                        setTimeout(() => {
                            if (this.annotations[index - 1]) {
                                resolve(this.annotations[index - 1]);
                            }
                            else {
                                resolve([]);
                            }
                        }, 500);
                    }
                });
                // return this.annotations[index - 1];
            }, getSelectedAnnotations: () => {
                return this.maps[index - 1].selectedAnnotation;
            }, set zoom(value) {
                this.map._impl.zoomLevel = value;
            }, get zoom() {
                return this.map._impl.zoomLevel;
            }, set showComass(value) {
                this.map.showsCompass = value;
            }, get showCompass() {
                return this.showCompass;
            }
        };
        options.cb(object);
    }
    addMapInitOptionsListeners(options) {
        window.mapkit.addEventListener('configuration-change', (event) => {
            if (options.callback) {
                options.callback(event);
            }
            switch (event.status) {
                case 'Initialized':
                    // MapKit JS initialized and configured.
                    this.initialized = 'FINISHED';
                    this.createMaps();
                    // this.createMap(settings);
                    break;
                case 'Refreshed':
                    // MapKit JS configuration updated.
                    break;
            }
        });
        window.mapkit.addEventListener('error', (event) => {
            this.initialized = 'STOPPED';
            if (options.callback) {
                options.callback(event);
            }
        });
    }
    getUserLocation(timeout = 5000) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((result) => {
                this.location = result;
                resolve(result);
            }, (err) => {
                reject(err);
            }, { timeout });
        });
    }
    optionsChanged(changes) {
        changes.forEachItem((item) => {
            if (item.previousValue !== item.currentValue) {
                switch (item.key) {
                    case 'language':
                        window.mapkit.language = item.currentValue;
                        break;
                    case 'JWT':
                        break;
                    default:
                        break;
                }
            }
        });
    }
    settingsChanged(changes, key) {
        if (key >= 0) {
            changes.forEachItem((item) => {
                if (item.previousValue !== item.currentValue) {
                    switch (item.key) {
                        case 'colorScheme':
                            this.maps[key][item.key] = item.currentValue;
                            break;
                        case 'center':
                            this.maps[key].setCenterAnimated(new window.mapkit.Coordinate(item.currentValue.latitude, item.currentValue.longitude), true);
                            break;
                        case 'region':
                            // tslint:disable-next-line:max-line-length
                            const regionCenter = new window.mapkit.Coordinate(item.currentValue.center.latitude, item.currentValue.center.longitude);
                            if (item.currentValue.span) {
                                const regionSpan = new window.mapkit.CoordinateSpan(item.currentValue.span.from, item.currentValue.span.to);
                                this.maps[key].setRegionAnimated(new window.mapkit.CoordinateRegion(regionCenter, regionSpan));
                                break;
                            }
                            this.maps[key].setRegionAnimated(new window.mapkit.CoordinateRegion(regionCenter));
                            break;
                        case 'padding':
                            this.maps[key] = new window.mapkit.Padding(item.currentValue);
                            break;
                        default:
                            this.maps[key][item.key] = item.currentValue;
                            break;
                    }
                }
            });
        }
    }
    setAnnotation(annotation, key) {
        if (!this.annotations[key]) {
            this.annotations[key] = [];
        }
        if (!this.annotations[key].includes(annotation)) {
            this.annotations[key].push(annotation);
            this.maps[key].addAnnotation(annotation);
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsService, deps: [{ token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.3", ngImport: i0, type: NgxAppleMapsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGxlLW1hcHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1hcHBsZS1tYXBzL3NyYy9saWIvbmd4LWFwcGxlLW1hcHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBb0JsRCxNQUFNLE9BQU8sbUJBQW1CO0lBVzVCLFlBQXlDLFVBQWtCO1FBQWxCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFUcEQsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixnQkFBVyxHQUFHLFNBQVMsQ0FBQztRQUN4QixnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQU9wQixJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsR0FBRyxFQUFFO1FBQ2hELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRTtZQUN6QixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEIsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxRQUFRO3dCQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNwRyxNQUFNO29CQUNWLEtBQUssUUFBUTt3QkFDVCxNQUFNLFlBQVksR0FBRyxJQUFJ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b3J0IHtJbmplY3QsIEluamVjdGFibGUsIFBMQVRGT1JNX0lEfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7aXNQbGF0Zm9ybUJyb3dzZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1xuICAgIENvb3JkaW5hdGVzSW50ZXJmYWNlLFxuICAgIERpc3RhbmNlc1N0cmluZywgTWFwS2l0SW5pdE9wdGlvbnMsXG4gICAgTWFwU2hvd0l0ZW1PcHRpb25zSW50ZXJmYWNlLFxuICAgIE1hcFR5cGVTdHJpbmcsXG4gICAgUGFkZGluZ0ludGVyZmFjZSxcbiAgICBTY2hlbWVTdHJpbmcsXG4gICAgU2hvd3NTY2FsZVN0cmluZyxcbiAgICBTcGFuSW50ZXJmYWNlXG59IGZyb20gXCIuL2RlY2xhcmF0aW9uc1wiO1xuXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAgICAgbWFwa2l0OiBhbnk7XG4gICAgfVxufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBOZ3hBcHBsZU1hcHNTZXJ2aWNlIHtcbiAgICBwdWJsaWMgaXNCcm93c2VyOiBib29sZWFuO1xuICAgIHB1YmxpYyBtYXBzID0gW107XG4gICAgcHVibGljIG1hcHNRdWV1ZSA9IFtdO1xuICAgIHB1YmxpYyBpbml0aWFsaXplZCA9ICdTVE9QUEVEJztcbiAgICBwdWJsaWMgYW5ub3RhdGlvbnMgPSB7fTtcbiAgICBwcml2YXRlIG9wdGlvbnM6IGFueTtcbiAgICBwdWJsaWMgbG9jYXRpb246IGFueTtcbiAgICBwdWJsaWMgcmVnaW9uOiBhbnk7XG4gICAgcHVibGljIGNlbnRlcjogYW55O1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QpIHtcbiAgICAgICAgdGhpcy5pc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc3RhdGljIHNldHRpbmdzTG9hZGVkVHJhbnNmb3JtKHNldHRpbmdzID0ge30pIHtcbiAgICAgICAgY29uc3QgbmV3U2V0dGluZ3MgPSB7fTtcbiAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBpZiAoc2V0dGluZ3NbaXRlbV0pIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShzZXR0aW5nc1tpdGVtXS5sYXRpdHVkZSwgc2V0dGluZ3NbaXRlbV0ubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWdpb24nOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShzZXR0aW5nc1tpdGVtXS5jZW50ZXIubGF0aXR1ZGUsIHNldHRpbmdzW2l0ZW1dLmNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNldHRpbmdzW2l0ZW1dLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4oc2V0dGluZ3NbaXRlbV0uc3Bhbi5mcm9tLCBzZXR0aW5nc1tpdGVtXS5zcGFuLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdTZXR0aW5nc1tpdGVtXSA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyLCByZWdpb25TcGFuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NldHRpbmdzW2l0ZW1dID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BhZGRpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBuZXcgd2luZG93Lm1hcGtpdC5QYWRkaW5nKHNldHRpbmdzW2l0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2V0dGluZ3NbaXRlbV0gPSBzZXR0aW5nc1tpdGVtXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U2V0dGluZ3M7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQob3B0aW9uczogTWFwS2l0SW5pdE9wdGlvbnMsIHNldHRpbmdzOiBhbnkgPSB7fSwgY2IgPSAoZGF0YSkgPT4ge30pIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLkpXVCB8fCAhdGhpcy5pc0Jyb3dzZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcHNRdWV1ZS5wdXNoKHtzZXR0aW5ncywgY2J9KTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbGl6ZWQgPT09ICdTVE9QUEVEJykge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9ICdQRU5ESU5HJztcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgICAgICB3aW5kb3cubWFwa2l0LmluaXQoe1xuICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25DYWxsYmFjazogKGRvbmU6ICh0b2tlbjogc3RyaW5nKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUob3B0aW9ucy5KV1QpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMub3B0aW9ucy5sYW5ndWFnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFkZE1hcEluaXRPcHRpb25zTGlzdGVuZXJzKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxpemVkID09PSAnRklOSVNIRUQnKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTWFwcygpIHtcbiAgICAgICAgY29uc3QgbWFwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ25neC1hcHBsZS1tYXBzJyk7XG4gICAgICAgIG1hcHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1hcENvbnRhaW5lciA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCFtYXBDb250YWluZXIuaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVNYXAobWFwQ29udGFpbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU1hcChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLm1hcHNRdWV1ZS5zaGlmdCgpO1xuICAgICAgICAvLyBub2luc3BlY3Rpb24gVHlwZVNjcmlwdFZhbGlkYXRlSlNUeXBlc1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMubWFwcy5wdXNoKG5ldyB3aW5kb3cubWFwa2l0Lk1hcChlbGVtZW50LCBOZ3hBcHBsZU1hcHNTZXJ2aWNlLnNldHRpbmdzTG9hZGVkVHJhbnNmb3JtKG9wdGlvbnMuc2V0dGluZ3MpKSk7XG4gICAgICAgIGNvbnN0IG9iamVjdCA9IHtcbiAgICAgICAgICAgIGtleTogaW5kZXggLSAxLFxuICAgICAgICAgICAgbWFwOiB0aGlzLm1hcHNbaW5kZXggLSAxXSxcbiAgICAgICAgICAgIGlzUm90YXRpb25BdmFpbGFibGU6ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNSb3RhdGlvbkF2YWlsYWJsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1JvdGF0aW9uRW5hYmxlZDogKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5pc1JvdGF0aW9uRW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpc1Njcm9sbEVuYWJsZWQ6ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNTY3JvbGxFbmFibGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzWm9vbUVuYWJsZWQ6ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uaXNab29tRW5hYmxlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRDZW50ZXI6ICgpOiBvYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlcjtcbiAgICAgICAgICAgICAgICByZXR1cm4ge2xhdGl0dWRlLCBsb25naXR1ZGV9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIHNldENlbnRlcjogKGxhdGl0dWRlOiBudW1iZXIsIGxvbmdpdHVkZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvLyAgIHRoaXMubWFwc1tpbmRleCAtIDFdLmNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUobGF0aXR1ZGUsIGxvbmdpdHVkZSk7XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgc2V0Q2VudGVyQW5pbWF0ZWQ6IChsYXRpdHVkZTogbnVtYmVyLCBsb25naXR1ZGU6IG51bWJlciwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDZW50ZXJBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGxhdGl0dWRlLCBsb25naXR1ZGUpLCBhbmltYXRlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRSZWdpb246ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucmVnaW9uO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFJlZ2lvbkFuaW1hdGVkOiAoY2VudGVyOiBDb29yZGluYXRlc0ludGVyZmFjZSwgc3BhbjogU3BhbkludGVyZmFjZSA9IG51bGwsIGFuaW1hdGU6IGJvb2xlYW4gPSB0cnVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVnaW9uQ2VudGVyID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZShjZW50ZXIubGF0aXR1ZGUsIGNlbnRlci5sb25naXR1ZGUpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFuKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvblNwYW4gPSBuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlU3BhbihzcGFuLmZyb20sIHNwYW4udG8pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRSZWdpb25BbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlUmVnaW9uKHJlZ2lvbkNlbnRlciwgcmVnaW9uU3BhbiksIGFuaW1hdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0Um90YXRpb246ICgpOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5yb3RhdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRSb3RhdGlvbkFuaW1hdGVkOiAoZGVncmVlczogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldFJvdGF0aW9uQW5pbWF0ZWQoZGVncmVlcywgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gZ2V0VmlzaWJsZU1hcFJlY3Q6ICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnZpc2libGVNYXBzUmVjdDtcbiAgICAgICAgICAgIC8vIH0sICAgICAgLy8gc2V0VmlzaWJsZU1hcFJlY3RBbmltYXRlZDogKCkgPT4ge1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgZ2V0Q2FtZXJhRGlzdGFuY2U6ICgpOiBudW1iZXIgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5jYW1lcmFEaXN0YW5jZTtcbiAgICAgICAgICAgIH0sIHNldENhbWVyYURpc3RhbmNlQW5pbWF0ZWQ6IChkaXN0YW5jZTogbnVtYmVyLCBhbmltYXRlOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNldENhbWVyYURpc3RhbmNlQW5pbWF0ZWQoZGlzdGFuY2UsIGFuaW1hdGUpO1xuICAgICAgICAgICAgfSwgZ2V0Q2FtZXJhWm9vbVJhbmdlOiAoKTogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7bWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlfSA9IHRoaXMubWFwc1tpbmRleCAtIDFdLmNhbWVyYVpvb21SYW5nZTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge21pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZX07XG4gICAgICAgICAgICB9LCBzZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZDogKG1pbkNhbWVyYURpc3RhbmNlLCBtYXhDYW1lcmFEaXN0YW5jZSwgYW5pbWF0ZTogYm9vbGVhbiA9IHRydWUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zZXRDYW1lcmFab29tUmFuZ2VBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5DYW1lcmFab29tUmFuZ2UobWluQ2FtZXJhRGlzdGFuY2UsIG1heENhbWVyYURpc3RhbmNlKSwgYW5pbWF0ZSk7XG4gICAgICAgICAgICB9LCBnZXRDb2xvclNjaGVtZTogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmNvbG9yU2NoZW1lO1xuICAgICAgICAgICAgfSwgc2V0Q29sb3JTY2hlbWU6IChzY2hlbWU6IFNjaGVtZVN0cmluZyA9ICdsaWdodCcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5jb2xvclNjaGVtZSA9IHNjaGVtZTtcbiAgICAgICAgICAgIH0sIGdldERpc3RhbmNlczogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLmRpc3RhbmNlcztcbiAgICAgICAgICAgIH0sIHNldERpc3RhbmNlczogKGRpc3RhbmNlOiBEaXN0YW5jZXNTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5kaXN0YW5jZXMgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgIH0sIGdldE1hcFR5cGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ubWFwVHlwZTtcbiAgICAgICAgICAgIH0sIHNldE1hcFR5cGU6ICh0eXBlOiBNYXBUeXBlU3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0ubWFwVHlwZSA9IHR5cGU7XG4gICAgICAgICAgICB9LCBnZXRQYWRkaW5nOiAoKTogb2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZztcbiAgICAgICAgICAgIH0sIHNldFBhZGRpbmc6IChwYWRkaW5nOiBQYWRkaW5nSW50ZXJmYWNlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0ucGFkZGluZyA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcocGFkZGluZyk7XG4gICAgICAgICAgICB9LCBnZXRTaG93c01hcFR5cGVDb250cm9sOiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzTWFwVHlwZUNvbnRyb2w7XG4gICAgICAgICAgICB9LCBzZXRTaG93c01hcFR5cGVDb250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c01hcFR5cGVDb250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXRTaG93c1pvb21Db250cm9sOiAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzWm9vbUNvbnRyb2w7XG4gICAgICAgICAgICB9LCBzZXRTaG93c1pvb21Db250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1pvb21Db250cm9sID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXRTaG93c1VzZXJMb2NhdGlvbkNvbnRyb2w6ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBzW2luZGV4IC0gMV0uc2hvd3NVc2VyTG9jYXRpb25Db250cm9sO1xuICAgICAgICAgICAgfSwgc2V0U2hvd3NVc2VyTG9jYXRpb25Db250cm9sOiAodmFsdWU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1VzZXJMb2NhdGlvbkNvbnRyb2wgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0sIGdldFNob3dzUG9pbnRzT2ZJbnRlcmVzdDogKCk6IGJvb2xlYW4gPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1BvaW50c09mSW50ZXJlc3Q7XG4gICAgICAgICAgICB9LCBzZXRTaG93c1BvaW50c09mSW50ZXJlc3Q6ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzUG9pbnRzT2ZJbnRlcmVzdCA9IHZhbHVlO1xuICAgICAgICAgICAgfSwgZ2V0U2hvd3NTY2FsZTogKCk6IHN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNob3dzU2NhbGU7XG4gICAgICAgICAgICB9LCBzZXRTaG93c1NjYWxlOiAodmFsdWU6IFNob3dzU2NhbGVTdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93c1NjYWxlID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXRUaW50Q29sb3I6ICgpOiBzdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1hcHNbaW5kZXggLSAxXS50aW50Q29sb3I7XG4gICAgICAgICAgICB9LCBzZXRUaW50Q29sb3I6IChjb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBzW2luZGV4IC0gMV0udGludENvbG9yID0gY29sb3I7XG4gICAgICAgICAgICB9LCBzaG93SXRlbXM6IChpdGVtcywgbWFwU2hvd0l0ZW1PcHRpb25zOiBNYXBTaG93SXRlbU9wdGlvbnNJbnRlcmZhY2UgPSB7fSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhc3NpbmdPcHRpb25zID0ge2FuaW1hdGU6IG9wdGlvbnMuYW5pbWF0ZSB8fCB0cnVlfTtcbiAgICAgICAgICAgICAgICBpZiAobWFwU2hvd0l0ZW1PcHRpb25zLnNwYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBwYXNzaW5nT3B0aW9ucy5taW5pbXVtU3BhbiA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVTcGFuKG1hcFNob3dJdGVtT3B0aW9ucy5zcGFuLmZyb20sIG1hcFNob3dJdGVtT3B0aW9ucy5zcGFuLnRvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG1hcFNob3dJdGVtT3B0aW9ucy5wYWRkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgcGFzc2luZ09wdGlvbnMucGFkZGluZyA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcobWFwU2hvd0l0ZW1PcHRpb25zLnBhZGRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBwYXNzaW5nSXRlbXMgPSBBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW2l0ZW1zXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHNbaW5kZXggLSAxXS5zaG93SXRlbXMocGFzc2luZ0l0ZW1zLCBwYXNzaW5nT3B0aW9ucyk7XG4gICAgICAgICAgICB9LCBnZXRBbm5vdGF0aW9uczogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuYW5ub3RhdGlvbnNbaW5kZXggLSAxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShbXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0aGlzLmFubm90YXRpb25zW2luZGV4IC0gMV07XG4gICAgICAgICAgICB9LCBnZXRTZWxlY3RlZEFubm90YXRpb25zOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwc1tpbmRleCAtIDFdLnNlbGVjdGVkQW5ub3RhdGlvbjtcbiAgICAgICAgICAgIH0sIHNldCB6b29tKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuX2ltcGwuem9vbUxldmVsID0gdmFsdWU7XG4gICAgICAgICAgICB9LCBnZXQgem9vbSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tYXAuX2ltcGwuem9vbUxldmVsO1xuICAgICAgICAgICAgfSwgc2V0IHNob3dDb21hc3ModmFsdWU6ICdoaWRkZW4nIHwgJ2FkYXB0aXZlJyB8ICd2aXNpYmxlJykge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwLnNob3dzQ29tcGFzcyA9IHZhbHVlO1xuICAgICAgICAgICAgfSwgZ2V0IHNob3dDb21wYXNzKCk6IHN0cmluZyB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0NvbXBhc3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG9wdGlvbnMuY2Iob2JqZWN0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZE1hcEluaXRPcHRpb25zTGlzdGVuZXJzKG9wdGlvbnMpIHtcbiAgICAgICAgd2luZG93Lm1hcGtpdC5hZGRFdmVudExpc3RlbmVyKCdjb25maWd1cmF0aW9uLWNoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnSW5pdGlhbGl6ZWQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBNYXBLaXQgSlMgaW5pdGlhbGl6ZWQgYW5kIGNvbmZpZ3VyZWQuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSAnRklOSVNIRUQnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZU1hcHMoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jcmVhdGVNYXAoc2V0dGluZ3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdSZWZyZXNoZWQnOlxuICAgICAgICAgICAgICAgICAgICAvLyBNYXBLaXQgSlMgY29uZmlndXJhdGlvbiB1cGRhdGVkLlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5tYXBraXQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSAnU1RPUFBFRCc7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5jYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0VXNlckxvY2F0aW9uKHRpbWVvdXQgPSA1MDAwKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2F0aW9uID0gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgIH0sIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0sIHt0aW1lb3V0fSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvcHRpb25zQ2hhbmdlZChjaGFuZ2VzKSB7XG4gICAgICAgIGNoYW5nZXMuZm9yRWFjaEl0ZW0oKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnByZXZpb3VzVmFsdWUgIT09IGl0ZW0uY3VycmVudFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLmtleSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsYW5ndWFnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubWFwa2l0Lmxhbmd1YWdlID0gaXRlbS5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSldUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0dGluZ3NDaGFuZ2VkKGNoYW5nZXM6IGFueSwga2V5OiBhbnkpIHtcbiAgICAgICAgaWYgKGtleSA+PSAwKSB7XG4gICAgICAgICAgICBjaGFuZ2VzLmZvckVhY2hJdGVtKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJldmlvdXNWYWx1ZSAhPT0gaXRlbS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLmtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY29sb3JTY2hlbWUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldW2l0ZW0ua2V5XSA9IGl0ZW0uY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnY2VudGVyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XS5zZXRDZW50ZXJBbmltYXRlZChuZXcgd2luZG93Lm1hcGtpdC5Db29yZGluYXRlKGl0ZW0uY3VycmVudFZhbHVlLmxhdGl0dWRlLCBpdGVtLmN1cnJlbnRWYWx1ZS5sb25naXR1ZGUpLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlZ2lvbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZ2lvbkNlbnRlciA9IG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGUoaXRlbS5jdXJyZW50VmFsdWUuY2VudGVyLmxhdGl0dWRlLCBpdGVtLmN1cnJlbnRWYWx1ZS5jZW50ZXIubG9uZ2l0dWRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jdXJyZW50VmFsdWUuc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWdpb25TcGFuID0gbmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVNwYW4oaXRlbS5jdXJyZW50VmFsdWUuc3Bhbi5mcm9tLCBpdGVtLmN1cnJlbnRWYWx1ZS5zcGFuLnRvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uc2V0UmVnaW9uQW5pbWF0ZWQobmV3IHdpbmRvdy5tYXBraXQuQ29vcmRpbmF0ZVJlZ2lvbihyZWdpb25DZW50ZXIsIHJlZ2lvblNwYW4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc1trZXldLnNldFJlZ2lvbkFuaW1hdGVkKG5ldyB3aW5kb3cubWFwa2l0LkNvb3JkaW5hdGVSZWdpb24ocmVnaW9uQ2VudGVyKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwYWRkaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XSA9IG5ldyB3aW5kb3cubWFwa2l0LlBhZGRpbmcoaXRlbS5jdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNba2V5XVtpdGVtLmtleV0gPSBpdGVtLmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNldEFubm90YXRpb24oYW5ub3RhdGlvbjogYW55LCBrZXk6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMuYW5ub3RhdGlvbnNba2V5XSkge1xuICAgICAgICAgICAgdGhpcy5hbm5vdGF0aW9uc1trZXldID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmFubm90YXRpb25zW2tleV0uaW5jbHVkZXMoYW5ub3RhdGlvbikpIHtcbiAgICAgICAgICAgIHRoaXMuYW5ub3RhdGlvbnNba2V5XS5wdXNoKGFubm90YXRpb24pO1xuICAgICAgICAgICAgdGhpcy5tYXBzW2tleV0uYWRkQW5ub3RhdGlvbihhbm5vdGF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIl19