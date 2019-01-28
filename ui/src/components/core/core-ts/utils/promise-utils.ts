export function delay<T>(promise: Promise<T>, timeout = 500): Promise<T> {
    return promise && promise.then((response: T) => {
        return new Promise<T>((resolve) => {
            setTimeout(() => resolve(response), timeout)
        });
    });
}

export function timeout(time: number) {
    return new Promise(function (resolve) {
        setTimeout(()=>resolve(), time);
    });
}

export interface Listenable {
    addEventListener: (event: string, cbc: Function, options?: Object) => void;
}

export function fromEvent(target: Listenable, event:string, options = {}) {
    return new Promise(function (resolve) {
        target.addEventListener(event, (e: Event) => resolve(e), Object.assign({}, options, {once: true}));
    });
}

export function loadScript(src: string, async = true) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement('script') as HTMLScriptElement;
        script.async = async;
        script.type = 'text/javascript';
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}