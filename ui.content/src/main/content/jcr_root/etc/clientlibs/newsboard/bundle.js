var bundle=function(e){var t={};function s(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}return s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)s.d(n,i,function(t){return e[t]}.bind(null,i));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";s.r(t);class n extends HTMLElement{static get is(){return"popup-menu"}constructor(){super()}connectedCallback(){this.addEventListener("pm-showmenu",()=>this._onShowMenu())}_onShowMenu(){this.classList.toggle("active-menu")}}customElements.define(n.is,n);var i=n;class r extends HTMLElement{static get is(){return"popup-trigger"}constructor(){super()}connectedCallback(){this.addEventListener("click",()=>this.triggerShowMenu(),!1)}triggerShowMenu(){const e=new CustomEvent("pm-showmenu",{bubbles:!0});this.dispatchEvent(e)}}customElements.define("popup-trigger",r);var c=r;class o extends HTMLElement{static get is(){return"slide-carousel"}constructor(){super()}get activeIndex(){return this.slides.findIndex(e=>e.classList.contains("active-slide"))}set activeIndex(e){e=(e+this.slides.length)%this.slides.length,this.slides[this.activeIndex].classList.remove("active-slide"),this.slides[e].classList.add("active-slide"),this.triggerSlideChange()}get slides(){const e=this.querySelectorAll("[data-slide-item]");return e?Array.from(e):[]}connectedCallback(){this.bindEvents()}bindEvents(){this.addEventListener("click",e=>this._onClick(e),!1)}_onClick(e){const t=e.target;t&&t.dataset.slideTarget&&this.setActive(t.dataset.slideTarget)}setActive(e){"prev"===e?this.activeIndex--:"next"===e?this.activeIndex++:this.activeIndex=+e}triggerSlideChange(){const e=new CustomEvent("sc-slidechanged",{bubbles:!0});this.dispatchEvent(e)}}customElements.define(o.is,o);var a=o;class l extends HTMLElement{constructor(){super(),this._onUpdate=(()=>this.rerender())}connectedCallback(){this._parent=this.closest(a.is),this.rerender(),this._parent.addEventListener("sc-slidechanged",this._onUpdate)}disconnectedCallback(){this._parent.removeEventListener("sc-slidechanged",this._onUpdate)}rerender(){let e="";const t=this._parent.slides.length,s=this._parent.activeIndex;for(let n=0;n<t;++n)e+=this.buildDot(n,n===s);this.innerHTML=e}buildDot(e,t){return`<span class="carousel-dot ${t?"active-dot":""}" data-slide-target="${e}"> </span>`}}customElements.define("slide-carousel-dots",l);var d=l;console.log(a,d,i,c)}]);