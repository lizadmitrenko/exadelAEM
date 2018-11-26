import SlideCarousel from './slide-carousel';

class SlideCarouselDots extends HTMLElement {

    private _parent: SlideCarousel;

    constructor() {
        super();
    }

    private _onUpdate = () => this.rerender();

    private connectedCallback() {
        this.classList.add('slide-carousel-dots');
        this._parent = this.closest(SlideCarousel.is) as SlideCarousel;

        this.rerender();
        this._parent.addEventListener('sc-slidechanged', this._onUpdate);
    }

    private disconnectedCallback() {
        this._parent.removeEventListener('sc-slidechanged', this._onUpdate);
    }

    private rerender() {
        let html = '';
        const count = this._parent.slides.length;
        const activeIndex = this._parent.activeIndex;
        for (let i = 0; i < count; ++i) {
            html += this.buildDot(i, i === activeIndex);
        }
        this.innerHTML = html;
    }

    private buildDot(index: number, isActive: boolean) {
        return `<span class="carousel-dot ${isActive ? 'active-dot' : ''}" data-slide-target="${index}"> </span>`;
    }
}

customElements.define('slide-carousel-dots', SlideCarouselDots);

export default SlideCarouselDots;
