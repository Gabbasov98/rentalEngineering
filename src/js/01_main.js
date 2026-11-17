window.addEventListener('DOMContentLoaded', () => {
    fix100vh();
    window.addEventListener('resize', () => {
        fix100vh();
        getScrollBarSize()
    })

    getScrollBarSize()

    $('input[type="tel"]').mask('+7 (999) 999-99-99', { autoclear: false }, { placeholder: '+7 (   )    -  -  ' });
})

function fix100vh() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function equalizeTabsHeight() {
    document.querySelectorAll('.main-sell').forEach(section => {
        const tabs = section.querySelectorAll('.tab-content');
        let maxHeight = 0;

        tabs.forEach(tab => {
            // сбрасываем прошлое значение, чтобы мерить реальную высоту
            tab.style.minHeight = '';

            // временно показываем скрытую вкладку для замера
            const prevDisplay = tab.style.display;
            tab.style.display = 'block';

            maxHeight = Math.max(maxHeight, tab.offsetHeight);

            tab.style.display = prevDisplay;
        });

        tabs.forEach(tab => {
            tab.style.minHeight = maxHeight + 'px';
        });
    });
}

window.addEventListener('load', equalizeTabsHeight);

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(equalizeTabsHeight, 150);
});
