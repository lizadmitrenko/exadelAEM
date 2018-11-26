class PopupMenu extends HTMLElement {
    static get is() {
        return 'popup-menu';
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add('popup-menu');
    }

    get type() {
        return this.getAttribute('type') || 'non-modal';
    }

    get activeClass() {
        return this.getAttribute('active-class') || 'active-menu';
    }

    set active(value: boolean) {
        this.type === 'modal' ? this.classList.toggle('modal-popup') : null;
        value ? this.classList.add(this.activeClass) : this.classList.remove(this.activeClass);
        this.setAttribute('aria-hidden', String(!value));
    }

    get active(): boolean {
        return this.classList.contains(this.activeClass);
    }
}

customElements.define(PopupMenu.is, PopupMenu);

export default PopupMenu;
