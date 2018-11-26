import VideoService from "../../core/video-overlay/video-service";

class VideoOverlay {

    constructor() {
        this.btnHide.addEventListener('click', () => VideoService.hide());
    }

    get btnHide(): HTMLElement {
        return document.querySelector('.hide-video-btn') as HTMLElement;
    }
}

export default VideoOverlay;
