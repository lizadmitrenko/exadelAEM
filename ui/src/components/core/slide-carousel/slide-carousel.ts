class SlideCarousel extends HTMLElement {
    static get is() {
        return 'slide-carousel';
    }

    constructor() {
        super();
    }

    private connectedCallback() {
        this.classList.add('slide-carousel');
        this.dataset.firstActiveIndex ? this.activeIndex = +this.dataset.firstActiveIndex - 1 : this.activeIndex = 0;
        this.bindEvents();
    }

    private disconnectedCallback() {
        this.removeEventListener('click', this._onClick, false);
    }

    private bindEvents() {
        this.addEventListener('click', (event) => this._onClick(event), false);
    }

    get activeClass() {
        return this.getAttribute('active-slide-class') || 'active-slide';
    }

    get activeIndex(): number {
        return this.slides.findIndex((el) => el.classList.contains(this.activeClass));
    }

    private _cleanAnimationClasses() {
        this.slides.forEach((elem) => {
            elem.classList.remove('left');
            elem.classList.remove('right');
        })
    }

    set activeIndex(numNextSlide: number) {
        const copyNumNextSlide = numNextSlide;
        numNextSlide = (numNextSlide + this.slides.length) % this.slides.length;

        if (this.activeIndex !== -1) {
            this._cleanAnimationClasses();
            if (copyNumNextSlide > this.activeIndex) {
                this.slides[numNextSlide].classList.add('left');
            } else {
                this.slides[numNextSlide].classList.add('right');
            }
            this.slides[this.activeIndex].classList.remove(this.activeClass);
        }
        this.slides[numNextSlide].classList.add(this.activeClass);

        this.triggerSlideChange();
    }

    get slides(): HTMLElement[] {
        const els = this.querySelectorAll('[data-slide-item]') as NodeListOf<HTMLDivElement>;
        return els ? Array.from(els) : [];
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
