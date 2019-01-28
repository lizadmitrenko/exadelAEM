import PopupMenu from "../popup-menu/popup-menu";
import DropdownInput from "./dropdown-input";
import LabelI18n from "../core-ts/localization/label-i18n";

class DropdownMenu extends PopupMenu {
    static get is() {
        return 'dropdown-menu';
    }

    constructor() {
        super();
    }

    public connectedCallback() {
        super.connectedCallback();
        this.classList.add('dropdown-menu');
        this.menuArr[0].setAttribute('active-menu-item', '');
        this.addEventListener('click', (event) => this._onChange(event));
    }

    private disconnectedCallback() {
        this.removeEventListener('click', (event) => this._onChange(event));
    }

    get input(): DropdownInput {
        return document.getElementById('dropdown-input') as DropdownInput;
    }

    get menuArr(): HTMLElement[] {
        const els = this.querySelectorAll('[data-menu-item]') as NodeListOf<HTMLElement>;
        return els ? Array.from(els) : [];
    }

    get activeItm(): HTMLElement {
        return this.querySelector('[active-menu-item]') as HTMLElement;
    }

    set activeIndex(index: number) {
        this.activeItm.toggleAttribute('active-menu-item');
        this.menuArr[index].toggleAttribute('active-menu-item');
    }

    private _onChange(event: MouseEvent) {
        const target = event.target as HTMLElement;
        const i18nEl = target.querySelector('label-i18n') as LabelI18n;
        this.activeIndex = +target.dataset.menuItem - 1;
        this.input.triggerInput(i18nEl.key);
        this.active = !this.active;
        if (!this.active) {
            (this.activeItm) && this.activeItm.focus();
        }
    }
}

customElements.define(DropdownMenu.is, DropdownMenu);

export default DropdownMenu;
