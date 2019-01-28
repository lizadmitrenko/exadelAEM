import PopupMenu from "../popup-menu/popup-menu";

let instance: VideoService;

class VideoService {
    private _url: string;
    private _popup: PopupMenu;

    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;

        instance._popup = instance._createElement() as PopupMenu;
        instance.bindEvents();

        document.querySelector('body').appendChild(instance._popup);
        this._popup.addEventListener('click', () => this.hide());
    }

    get iframe(): HTMLIFrameElement {
        return this._popup.querySelector('iframe') as HTMLIFrameElement;
    }

    /**
     * open video-overlay
     * @param {string} url - youtube url to open
     */
    static show(url: string) {
        const inst = new VideoService();
        inst._url = url;
        inst.show();
    }

    private show() {
        if (this._popup && !this._popup.active) {
            this.iframe.src = this._url;
            this._popup.active = true;
        }
    }

    /**
     * hide opened video-overlay
     */
    static hide() {
        const inst = new VideoService();
        inst.hide();
    }

    private hide() {
        if (this._popup && this._popup.active) {
            this.iframe.src = "";
            this._popup.active = false;
        }
    }

    private bindEvents() {
        this._btnHide.addEventListener('click', () => VideoService.hide());
    }

    get _btnHide(): HTMLElement {
        return this._popup.querySelector('.hide-video-btn') as HTMLElement;
    }

    private _createElement(): HTMLElement {
        const template = document.createElement('template');
        template.innerHTML = `<popup-menu id="video-popup" data-popup-content type="modal">
                <div class="video-container">
                    <iframe class="video-iframe" frameborder="0" allowfullscreen></iframe>
                    <btn class="hide-video-btn">
                        <svg width="40" height="40" class="hide-video-svg">
                            <line x1="10" y1="10" x2="30" y2="30"/>
                            <line x1="30" y1="10" x2="10" y2="30"/>
                        </svg>
                    </btn>
                </div>
            </popup-menu>`;
        return template.content.firstElementChild as HTMLElement;
    }
}

export default VideoService;
