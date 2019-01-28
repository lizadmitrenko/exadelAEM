import Localization, {LocationObserver} from "./localizationManager";

class LabelI18n extends HTMLElement implements LocationObserver{
    static get is() {
        return 'label-i18n';
    }

    public key: string;

    connectedCallback() {
        Localization.subscribe(this);
    }

    disconnectedCallback() {
        Localization.unsubscribe(this);
    }

    constructor() {
        super();
        this.key = this.textContent;
    }

    get value(): string {
        return this.textContent;
    }

    locationChange (manager: Localization) {
        this.textContent = manager.getLocalizedValue(this.key);
    };
}

customElements.define(LabelI18n.is, LabelI18n);

export default LabelI18n;
