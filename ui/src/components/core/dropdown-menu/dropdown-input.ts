import PopupTrigger from "../popup-menu/popup-trigger";

class DropdownInput extends PopupTrigger {
    static get is() {
        return 'dropdown-input';
    }

    constructor() {
        super();
    }

    get defaultValue(): string {
        return this.dataset.defaultValue;
    }

    get value(): string {
        const cleanText = this.dataset.inputValue.replace(/<\/?[^>]+(>|$)/g, "");
        const customInputValue = cleanText.replace('$', "");
        return this.innerText.replace(customInputValue, "");
    }

    set value(value: string) {
        this.btn.innerHTML = this.dataset.inputValue.replace('$', value);
    }

    public connectedCallback() {
        this.classList.add('dropdown-input');
        this.value = this.defaultValue;
        super.connectedCallback();
    }

    public triggerInput(value: string) {
        if (this.value !== value) {
            this.value = value;
            this.triggerValueChange(value);
        }
    }

    private triggerValueChange(value: string) {
        const event = new CustomEvent('dd-inputchanged', {
            bubbles: true,
            detail: { value: value, elem: this}
        });
        this.dispatchEvent(event);
    }
}

customElements.define(DropdownInput.is, DropdownInput);

export default DropdownInput;
