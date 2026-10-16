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
