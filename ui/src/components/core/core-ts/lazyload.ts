const config = {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0
};

let observer = new IntersectionObserver(function (entries, observer) {
    // iterate over each entry
    entries.forEach(entry => {
        // process just the images that are intersecting.
        // isIntersecting is a property exposed by the interface
        if (entry.isIntersecting) {
            // custom function that copies the path to the img
            // from data-src to src
            preloadImage(entry.target as HTMLImageElement);
            // the image is now in place, stop watching
            observer.unobserve(entry.target);
        }
    });
}, config);

function preloadImage(target: HTMLImageElement) {
    if (target.tagName === 'IMG') {
        target.src = target.getAttribute('data-src');
        target.onload = () => {
            addClassToFullPost(target);
        };
    }
}

function addClassToFullPost(target: HTMLImageElement) {
    const wrapper = target.closest('.full-post-wrapper');
    if (wrapper && wrapper.querySelector('.full-post-container') && !wrapper.querySelector('.full-post-container').classList.contains('full-post-margin')) {
        wrapper.querySelector('.full-post-container').classList.add('full-post-margin');
    }
}

const imgs = document.querySelectorAll('[data-src]');

imgs.forEach(img => {
    observer.observe(img);
});
