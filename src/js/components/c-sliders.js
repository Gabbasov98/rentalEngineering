function mainSlider() {
    const DEFAULT_MS = 7000;
    const root = document.querySelector('.main-slider');

    // Задаёт длительность кольца и перезапускает анимацию активного буллета
    function setRingDuration(ms) {
        root.style.setProperty('--ring-duration', ms + 'ms');

        const ring = root.querySelector('.swiper-pagination-bullet-active .ring-progress');
        if (ring) {
            ring.style.setProperty('animation', 'none', 'important');
            void ring.offsetWidth; // reflow, чтобы анимация стартовала заново
            ring.style.removeProperty('animation');
        }
    }

    function handleSlide(s) {
        const slides = Array.from(s.slides);

        // Останавливаем все видео, кроме текущего
        slides.forEach(sl => sl.querySelectorAll('video').forEach(v => v.pause()));

        const video = slides[s.activeIndex]?.querySelector('video');

        // Обычный слайд: 7 секунд, работает автоплей Swiper
        if (!video) {
            setRingDuration(DEFAULT_MS * 1.4);
            s.autoplay.start();
            return;
        }

        // Видео-слайд: таймер выключаем, листаем по окончании ролика
        s.autoplay.stop();
        video.currentTime = 0;
        video.onended = () => s.slideNext();

        const start = () => {
            const ms = isFinite(video.duration) ? video.duration * 1000 : DEFAULT_MS;
            setRingDuration(ms * 1.4);
            video.play().catch(() => {});
        };

        if (video.readyState >= 1) start(); // метаданные уже есть
        else video.addEventListener('loadedmetadata', start, { once: true });
    }

    const swiper = new Swiper('.main-slider .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: DEFAULT_MS, disableOnInteraction: false },
        speed: 500,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        navigation: {
            nextEl: '.main-slider .swiper-button-next',
            prevEl: '.main-slider .swiper-button-prev',
        },
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
            renderBullet: (_, className) => `
                <span class="${className}">
                  <svg class="progress-ring" viewBox="0 0 26 26">
                    <circle class="ring-bg" cx="13" cy="13" r="10"></circle>
                    <circle class="ring-progress" cx="13" cy="13" r="10"></circle>
                  </svg>
                </span>
            `
        },
        on: {
            init: handleSlide,
            slideChange: handleSlide,
        }
    });
}

mainSlider()

function Sliders() {
    let SlidersArray = []

    let sliders = document.querySelectorAll(".slider")
    sliders.forEach((slider,index) => {
        slider.setAttribute("data-slider-id",index)

        let autoplay = false

        let pagination = {
            el: `.slider[data-slider-id="${index}"] .swiper-pagination`,
            type: 'bullets',
            clickable: true,
        }

        if(slider.classList.contains("_autoplay")){
            autoplay = {
                delay: 3000,
                disableOnInteraction: false
            }
        }
        function renderFraction(current,all) {
            slider.querySelector("._current").innerHTML = current
            slider.querySelector("._all").innerHTML = all
        }

        if(slider.classList.contains("article-slider")){
            pagination.type = 'fraction'
        }

        SlidersArray[index] = new Swiper(`.slider[data-slider-id="${index}"] .swiper-container`, {
            slidesPerView: "auto",
            spaceBetween: 0,
            watchSlidesProgress: true,
            preventClicks :true,
            a11y: false,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            autoplay,
            navigation: {
                nextEl: `.slider[data-slider-id="${index}"] .swiper-button-next`,
                prevEl: `.slider[data-slider-id="${index}"] .swiper-button-prev`,
            },
            pagination: pagination,
            on: {
                init: function () {
                    if(slider.classList.contains("gallery-slider")){
                        renderFraction(
                            this.activeIndex+1,
                            this.slides.length
                        )
                    }
                },
                slideChange: function () {
                    if(slider.classList.contains("gallery-slider")){
                        renderFraction(
                            this.activeIndex+1,
                            this.slides.length
                        )
                    }
                },
            },
        })
    })
}

function gallery() {
    let SlidersArray = []

    let sliders = document.querySelectorAll(".gallery")
    sliders.forEach((slider,index) => {
        slider.setAttribute("data-slider-id",index)
        let gallery = {
            mySwiper: {},
            mySwiper2: {}
        }

        gallery.mySwiper = new Swiper(`.gallery[data-slider-id="${index}"] .mySwiper`, {
            spaceBetween: 0,
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesProgress: true,
            direction: "vertical",
            breakpoints: {
                320: {
                    direction: "horizontal",
                },
                992: {
                    direction: "vertical",
                }
            }
        });
        gallery.mySwiper2 = new Swiper(`.gallery[data-slider-id="${index}"] .mySwiper2`, {
            spaceBetween: 0,
            direction: "vertical",
            loop: true,
            navigation: {
                nextEl: `.gallery[data-slider-id="${index}"] .swiper-button-next`,
                prevEl: `.gallery[data-slider-id="${index}"] .swiper-button-prev`,
            },
            thumbs: {
                swiper:  gallery.mySwiper,
            },
            breakpoints: {
                320: {
                    direction: "horizontal",
                },
                992: {
                    direction: "vertical",
                }
            }
        });

        SlidersArray[index] = gallery
    })

}


Sliders()
gallery()
