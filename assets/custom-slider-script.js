
  class SwiperSlider extends HTMLElement {
    constructor() {
      super();

      this.selectors = {
        swiper: 'swiper-container',
        prevEl: '.custom-prev-button',
        nextEl: '.custom-next-button',
        pagination: '.custom-pagination',
        scrollbar: '.custom-scrollbar',
      };
    }

    connectedCallback() {
      this.slider = this.querySelector(this.selectors.swiper);
      this.buttonPrev = this.querySelector(this.selectors.prevEl);
      this.buttonNext = this.querySelector(this.selectors.nextEl);
      this.pagination = this.querySelector(this.selectors.pagination);
      this.scrollbar = this.querySelector(this.selectors.scrollbar);
      this.options = this.slider.getAttribute('data-options');
      console.log(this.pagination, this.scrollbar, this.buttonNext, this.buttonPrev, this.slider);

      if (!this.slider) {
        return null;
      }
      this.initSlider();
      this.addListeners();
    }

    initSlider() {
      let inlineOptions = this.slider.dataset.options;

      if (inlineOptions) {
        inlineOptions = JSON.parse(inlineOptions);
      }

      this.swiperParams = {
        slidesPerView: 1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        watchSlidesProgress: true,
        breakpoints: {
          480: {
            slidesPerView: '2',
            spaceBetween: 15,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        },
        navigation: {
          nextEl: this.buttonNext,
          prevEl: this.buttonPrev,
        },
        pagination: {
          el: this.pagination,
          clickable: true,
        },
        scrollbar: {
          el: this.scrollbar,
          draggable: true,
          hide: false,
        },
        on: {
          init() {},
        },
        ...inlineOptions,
      };

      Object.assign(this.slider, this.swiperParams);

      this.slider.initialize();
    }

    addListeners() {
      document.addEventListener('shopify:section:reorder', () => this.initSlider());
      document.addEventListener('shopify:section:load', () => this.initSlider());
      document.addEventListener('shopify:section:select', () => this.initSlider());
      document.addEventListener('shopify:section:deselect', () => this.initSlider());
    }
  }

  customElements.define('component-slider-swiper', SwiperSlider);
