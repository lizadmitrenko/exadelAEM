class SlideCarousel extends HTMLElement {
    static get is() { return 'slide-carousel'; }

    constructor() {
        super();
    }

    get activeIndex(): number {
        return this.slides.findIndex((el) => el.classList.contains('active-slide'));
    }

    set activeIndex(numNextSlide: number) {
        numNextSlide = (numNextSlide + this.slides.length) % this.slides.length;

        this.slides[this.activeIndex].classList.remove('active-slide');
        this.slides[numNextSlide].classList.add('active-slide');

        this.triggerSlideChange();
    }

    get slides(): HTMLElement[] {
        const els = this.querySelectorAll('[data-slide-item]') as NodeListOf<HTMLDivElement>;
        return els ? Array.from(els) : [];
    }

    private connectedCallback() {
        this.bindEvents();
    }

    private bindEvents() {
        this.addEventListener('click', (event) => this._onClick(event), false);
    }

    private _onClick(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if (target && target.dataset.slideTarget) {
            this.setActive(target.dataset.slideTarget);
        }
    }

    private setActive(target: number | string) {
        if ('prev' === target) {
            this.activeIndex--;
        } else if ('next' === target) {
            this.activeIndex++;
        } else {
            this.activeIndex = +target;
        }
    }

    private triggerSlideChange() {
        const event = new CustomEvent('sc-slidechanged', {
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define(SlideCarousel.is, SlideCarousel);

export default SlideCarousel;
