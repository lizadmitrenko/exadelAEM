import PopupMenu from './popup-menu';

class PopupTrigger extends HTMLElement {
    static get is() {
        return 'popup-trigger';
    }

    get btn(): HTMLButtonElement {
        return this.querySelector('[data-popup-btn]') as HTMLButtonElement;
    }

    get popup(): PopupMenu {
        const targetId = this.getAttribute('target');
        return document.getElementById(targetId) as PopupMenu;
    }

    constructor() {
        super();
        this._onActivate = this._onActivate.bind(this);
    }

    public connectedCallback() {
        this.classList.add('popup-trigger');
        this._attachEvent();
    }

    private disconnectedCallback() {
        this._detachEvent();
    }

    get triggerOn() {
        return this.dataset.triggeron || 'click';
    }

    private _attachEvent() {
        if (this.triggerOn === 'click') {
            this.addEventListener('click', this._onActivate, false);
        } else {
            this.addEventListener(this.triggerOn, this._onActivate, false);
        }
    }

    private _detachEvent() {
        if (this.triggerOn === 'click') {
            this.removeEventListener('click', this._onActivate);
        } else {
            this.removeEventListener(this.triggerOn, this._onActivate);
        }
    }

    private _onActivate() {
        this.popup.active = !this.popup.active;
    }
}

customElements.define('popup-trigger', PopupTrigger);

export default PopupTrigger;
