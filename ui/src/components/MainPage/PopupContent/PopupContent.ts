class PopupContent extends HTMLElement {
    static get is() {
        return 'popup-content';
    }

    constructor() {
        super();
    }

    public _onShowMenu() {
        this.classList.toggle('active-menu');
    }

    private connectedCallback() {
        this.addEventListener('click', () => this._onShowMenu());
    }

    // private bindEvents() {
    //     this._btn = this.closest('popup-trigger');
    //
    //     this.addEventListener('click', (event) => this._onUpdate(event));
    // }

    // get activeIndex() {
    //     return this.menuItems.findIndex((el) => el.classList.contains('active-menu-item'));
    // }
    //
    // set activeIndex(value: number) {
    //     this.menuItems[this.activeIndex].classList.remove('active-menu-item');
    //     this.menuItems[value].classList.add('active-menu-item');
    //     this.btn.rerender(this.menuItems[value].innerText);
    // }
    //
    // get menuItems(): HTMLElement[] {
    //     const els = this.querySelectorAll('[data-menu-item]') as NodeListOf<HTMLDivElement>;
    //     return els ? Array.from(els) : [];
    // }
    //

    //

    //
    // private _onUpdate(event: MouseEvent) {
    //     const target = event.target as HTMLElement;
    //     const nextIndex = +target.dataset.menuItem - 1;
    //     if (this.activeIndex !== nextIndex) {
    //         this.activeIndex = nextIndex;
    //     }
    //     this._onShowMenu();
    // }
}

customElements.define(PopupContent.is, PopupContent);

export default PopupContent;
