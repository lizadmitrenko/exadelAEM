import PopupMenu from './popup-menu';

class PopupTrigger extends HTMLElement {
    static get is() {
        return 'popup-trigger';
    }

    private _hideTimer: Number;

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

    get btn(): HTMLButtonElement {
        return this.querySelector('[data-popup-btn]') as HTMLButtonElement;
    }

    get popup(): PopupMenu {
        const targetId = this.getAttribute('target');
        return document.getElementById(targetId) as PopupMenu;
    }

    get triggerOn(): string {
        return this.dataset.triggeron || 'click';
    }

    get mouseoverTime(): number {
        return +this.dataset.mouseoverTime || 1000;
    }

    private _attachEvent() {
        switch (this.triggerOn) {
            case 'click':
                this.addEventListener('click', this._onActivate, false);
                break;
            case 'mouseover':
                this.addEventListener('mouseenter', this._onMouseEnter, false);
                this.addEventListener('mouseleave', this._onMouseLeave, false);
                break;
            default:
                this.addEventListener(this.triggerOn, this._onActivate, false);
        }
        this.popup.addEventListener('pm-changed', this._onPopupStateChange);
    }

    private _onMouseEnter = () => {
        if (typeof this._hideTimer === 'number') {
            clearTimeout(this._hideTimer);
            return;
        }
        this.popup.active = true;
    };

    private _onMouseLeave = () => {
        this._hideTimer = setTimeout(() => {
            this.popup.active = false;
            this._hideTimer = null;
        }, this.mouseoverTime);
    };

    private _detachEvent() {
        this.removeEventListener('click', this._onActivate);
        this.removeEventListener('mouseenter', this._onMouseEnter);
        this.removeEventListener('mouseleave', this._onMouseLeave,);
        if (['click', 'mouseover'].indexOf(this.triggerOn) === -1) {
            this.removeEventListener(this.triggerOn, this._onActivate);
        }
        this.popup.removeEventListener('pm-changed', this._onPopupStateChange);
    }

    private _onActivate = () => {
        this.popup.active = !this.popup.active;
    };

    private _onPopupStateChange = () => {
        this.toggleAttribute('active', this.popup.active)
    };
}

customElements.define('popup-trigger', PopupTrigger);

export default PopupTrigger;
