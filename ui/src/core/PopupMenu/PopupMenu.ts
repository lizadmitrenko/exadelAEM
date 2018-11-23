class PopupMenu extends HTMLElement {
    static get is() {
        return 'popup-menu';
    }

    constructor() {
        super();
    }

    private connectedCallback() {
        this.addEventListener('pm-showmenu', () => this._onShowMenu());
    }

    public _onShowMenu() {
        this.classList.toggle('active-menu');
    }
}

customElements.define(PopupMenu.is, PopupMenu);

export default PopupMenu;
