import PopupTrigger from "../../core/popup-menu/popup-trigger";
import PopupMenu from "../../core/popup-menu/popup-menu";
import ShareService from "../../core/share-bar/share-service";

class ShareBar extends PopupTrigger {

    static get is() {
        return 'share-bar';
    }

    constructor() {
        super();
        this.classList.add(ShareBar.is);
    }

    connectedCallback() {
        super.connectedCallback();
        ShareService.updateToolboxes();
    }

    get popup(): PopupMenu {
        return this.querySelector('popup-menu') as PopupMenu;
    }
}

customElements.define(ShareBar.is, ShareBar);

export default ShareBar;
