import API from "./localizationService";

let instance: LocalizationManager;

export interface LocationObserver {
    locationChange: (manager: LocalizationManager) => void
}

class LocalizationManager {

    private _currentLocale: string;
    private _translations: { [key: string]: string };
    private _subscribers: LocationObserver[];

    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;

        instance._subscribers = [];
    }

    private onChange() {
        API.sendRequest(this._currentLocale).then((trans) => {
            this._translations = trans;
            this.emitChanges();
        });
    }

    private emitChanges() {
        this._subscribers.forEach((subs) => subs.locationChange(this));
    }

    getLocalizedValue(key: string): string {
        return this._translations[key] ? this._translations[key] : key;
    }

    static subscribe(obj: LocationObserver) {
        const inst = new LocalizationManager();
        inst.subscribe(obj);
    }

    static unsubscribe(obj: LocationObserver) {
        const inst = new LocalizationManager();
        inst.unsubscribe(obj);
    }

    private subscribe(obj: LocationObserver) {
        this._subscribers.push(obj)
    }

    private unsubscribe(obj: LocationObserver) {
        const index = this._subscribers.indexOf(obj);
        this._subscribers.splice(index, 1);
    }

    static instance(): LocalizationManager {
        return new LocalizationManager();
    }

    public setLocale(value: string) {
        this._currentLocale = value;
        this.onChange();
    }
}

// @ts-ignore
window.LocalizationManager = LocalizationManager;
export default LocalizationManager;
