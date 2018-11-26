import VideoService from "./video-service";

class VideoTrigger {

    constructor(link: HTMLElement) {
        link.addEventListener('click', (event) => this._onShow(event), false);
        this.btnHide.addEventListener('click', () => VideoService.hide());
    }

    get btnHide(): HTMLElement {
        return document.querySelector('.hide-video-btn') as HTMLElement;
    }

    private _onShow(event: MouseEvent) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const url = target.getAttribute('href');
        VideoService.show(url);
    }
}

export default VideoTrigger;
