function mainSlider() {
    const DEFAULT_MS = 7000;
    const root = document.querySelector('.main-slider');
    if (!root) return;

    // Задаёт длительность кольца и перезапускает анимацию активного буллета
    function setRingDuration(ms) {
        root.style.setProperty('--ring-duration', ms + 'ms');

        const ring = root.querySelector('.swiper-pagination-bullet-active .ring-progress');
        if (ring) {
            ring.style.setProperty('animation', 'none', 'important');
            void ring.offsetWidth;
            ring.style.removeProperty('animation');
        }
    }

    // Видео готово — убираем загрузку и плавно проявляем ролик
    function showVideo(video) {
        video.closest('.main__img')?.classList.add('_ready');
    }

    // Ловим момент, когда реально пошли кадры
    // (capture — сработает, даже если видео стартовало раньше скрипта)
    root.addEventListener('playing', e => {
        if (e.target.tagName === 'VIDEO') showVideo(e.target);
    }, true);
    root.addEventListener('timeupdate', e => {
        if (e.target.tagName === 'VIDEO' && e.target.currentTime > 0) showVideo(e.target);
    }, true);

    // Заморозить / отпустить кольцо пагинации
    function ringWait(on) {
        root.classList.toggle('_ring-wait', on);
    }

    // Обычный слайд — работает таймер Swiper
    function runAsImage(s) {
        ringWait(false);
        setRingDuration(DEFAULT_MS * 1.4);
        s.autoplay.start();
    }

    function handleSlide(s) {
        const slides = Array.from(s.slides);
        const video = slides[s.activeIndex]?.querySelector('video');

        // Остальные видео на паузу
        slides.forEach(sl => sl.querySelectorAll('video').forEach(v => {
            if (v !== video) v.pause();
        }));

        if (!video) {
            runAsImage(s);
            return;
        }

        // Видео-слайд: таймер выключаем
        s.autoplay.stop();

        // Слайд один — видео крутится бесконечно, иначе по окончании листаем дальше
        const single = s.slides.length === 1;
        video.loop = single;
        video.onended = single ? null : () => s.slideNext();

        // Кольцо стоит на нуле, пока видео реально не пошло
        ringWait(true);
        let ringStarted = false;
        video.onplaying = () => {
            if (!ringStarted) {
                ringStarted = true;
                const left = isFinite(video.duration) ? (video.duration - video.currentTime) * 1000 : DEFAULT_MS;
                setRingDuration(left * 1.4);
            }
            ringWait(false);
        };
        // Видео подвисло на подгрузке — кольцо тоже ждёт
        video.onwaiting = () => ringWait(true);

        // Видео уже играет (стартовало раньше скрипта)
        if (!video.paused && video.readyState >= 3) video.onplaying();

        const start = () => {
            const p = video.play();
            // Автозапуск запрещён (энергосбережение на iPhone и т.п.):
            // показываем первый кадр и листаем по обычному таймеру
            if (p && p.catch) p.catch(() => {
                if (video.readyState >= 2) showVideo(video);
                else video.addEventListener('loadeddata', () => showVideo(video), { once: true });
                runAsImage(s);
            });
        };

        if (video.readyState >= 1) start();
        else video.addEventListener('loadedmetadata', start, { once: true });
    }

    // Когда слайд уже скрыт — перематываем видео в начало
    function resetHidden(s) {
        Array.from(s.slides).forEach((sl, i) => {
            if (i === s.activeIndex) return;
            sl.querySelectorAll('video').forEach(v => {
                v.pause();
                if (v.currentTime > 0) v.currentTime = 0;
            });
        });
    }

    new Swiper('.main-slider .swiper-container', {
        slidesPerView: 1,
        spaceBetween: 20,
        rewind: true, // вместо loop: true — не клонирует слайд с видео
        autoplay: { delay: DEFAULT_MS, disableOnInteraction: false },
        speed: 800,
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
            slideChangeTransitionEnd: resetHidden,
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
