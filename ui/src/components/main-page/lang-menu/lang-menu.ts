import DropdownInput from "../../core/dropdown-menu/dropdown-input";
import LocalizationManager from "../../core/core-ts/localization/localizationManager";

class LangMenuController {

    private _dropdown: DropdownInput;
    private _manager: LocalizationManager;

    constructor(el: HTMLElement) {
        this._manager = LocalizationManager.instance();
        this._dropdown = el.querySelector('dropdown-input');
        this.bindEvents();
    }

    bindEvents() {
        this._dropdown.addEventListener('dd-inputchanged', (event: CustomEvent) => {
            this._manager.setLocale(event.detail.value);
        });
    }
}

export default LangMenuController;
