const odometers = document.querySelectorAll("._number-animation");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const targetValue = parseInt(el.getAttribute("data-end"), 10);
            el.innerHTML = targetValue;
            observer.unobserve(el);
        }
    });
}, {
    threshold: 0.5
});

odometers.forEach(el => {
    let format = 'd'

    if(el.hasAttribute("data-thousands-separate")) {
        // format = '( ddd),dd'
    }
    new Odometer({
        el: el,
        value: 0,
        format,
        theme: 'default'
    });

    observer.observe(el);
});
