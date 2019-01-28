import VideoTrigger from "./video-trigger";

class VideoLink extends HTMLAnchorElement {

    private trigger: VideoTrigger;

    constructor() {
        super();
    }

    connectedCallback() {
        this.trigger = new VideoTrigger(this);
    }

    disconnectedCallback() {
        this.trigger.destroy();
    }
}

window.customElements.define('video-link', VideoLink, {extends: 'a'});

export default VideoLink;
