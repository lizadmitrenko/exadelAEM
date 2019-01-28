import {fromEvent, Listenable, loadScript} from "../core-ts/utils/promise-utils";

class ShareService {

    private static initializationPromise: Promise<any> = null;

    public static get pubid() { return 'ra-5c1b5e3fee67d8a1'; }

    public static get config() {
        return {
            pubid: ShareService.pubid
        };
    }

    public static requestAddthis() {
        if (!this.initializationPromise) {
            // @ts-ignore
            window.addthis_config = ShareService.config;
            this.initializationPromise = loadScript('//s7.addthis.com/js/300/addthis_widget.js#async=1');
            this.initializationPromise = this.initializationPromise.then(() => {
                // @ts-ignore
                if (window.addthis) {
                    // @ts-ignore
                    window.addthis.init();
                    // @ts-ignore
                    return fromEvent(window.addthis as Listenable, 'addthis.ready');
                } else {
                    return Promise.reject();
                }
            });
        }
        return this.initializationPromise;
    }

    public static updateToolboxes() {
        this.requestAddthis().then(() => {
            // @ts-ignore
            window.addthis.layers.refresh();
            console.log('[AddThis]: layers update');
        }, (e) => console.log('[AddThis]: update rejected:', e));
    }
}

export default ShareService;
