import VideoService from "./video-service";

class VideoTrigger {

    constructor(public link: HTMLElement) {
        link.addEventListener('click', this._onShow, false);
    }

    destroy() {
        this.link.removeEventListener('click', this._onShow, false);
    }

    private _onShow(event: MouseEvent) {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const url = target.getAttribute('href');
        VideoService.show(url);
    }
}

export default VideoTrigger;
