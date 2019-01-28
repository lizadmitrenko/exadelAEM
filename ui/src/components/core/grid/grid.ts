import {delay} from "../core-ts/utils/promise-utils";

class Grid extends HTMLElement {
    constructor() {
        super();
        this.observer = new IntersectionObserver(this._onObserve.bind(this), Grid.observeOptions);
    }

    static observeOptions = {
        threshold: 1
    };

    observer: IntersectionObserver;
    _loadingPromise: Promise<any>;

    static get is() {
        return 'grid-news';
    }

    connectedCallback() {
        this.observer.observe(this.marker);
    }

    disconnectedCallback() {

    }

    get newsContainer(): HTMLElement {
        return this.querySelector('[data-news-container]') as HTMLElement;
    }

    get marker(): HTMLElement {
        return this.querySelector('[data-grid-marker]') as HTMLElement;
    }

    get url(): string {
        return this.dataset.url;
    }

    get count(): number {
        return +this.dataset.count;
    }

    get nextElsCount(): number {
        return this.dataset.nextElsCount ? +this.dataset.nextElsCount : 3;
    }

    get loadedElsCount(): number {
        return this.newsContainer.childElementCount;
    }

    private _onObserve(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (this.loadedElsCount < this.count) {
                    this.loadEls();
                }
                observer.unobserve(entry.target);
            }
        });
    }

    buildEls(response: string): DocumentFragment {
        const template = document.createElement('template');
        template.innerHTML = response;
        return template.content as DocumentFragment;
    }

    onResponse = (response: string) => {
        this.newsContainer.appendChild(this.buildEls(response));
        if (this.loadedElsCount < this.count) {
            this.observer.observe(this.marker);
        }
    };

    onError = () => {
        console.log('Error!');
    };

    loadEls() {
        this.setAttribute('loading', '');
        if (this._loadingPromise) {
            return;
        }

        const finallyCb = () => {
            this._loadingPromise = null;
            this.removeAttribute('loading');
        };

        let count = 0;
        if (this.count - this.loadedElsCount < this.nextElsCount) {
            count = this.count;
        } else {
            count = this.loadedElsCount + this.nextElsCount;
        }

        const url = `${this.url}/elsCount?start=${this.loadedElsCount}&count=${count}`;

        this._loadingPromise = fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });

        if (this.hasAttribute('debug-delay')) {
            this._loadingPromise = delay(this._loadingPromise, +this.getAttribute('debug-delay'));
        }

        this._loadingPromise.then((response: Response) => {
            return response.ok ? response.text() : response.text().then((text) => Promise.reject(text));
        }).then((response) => {
            this.onResponse(response);
            this.loadElsEvent();
            finallyCb();
        }).catch(() => {
            this.onError();
            finallyCb();
        });
    }

    loadElsEvent() {
        const event = new CustomEvent('gr-loadels', {
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define(Grid.is, Grid);
