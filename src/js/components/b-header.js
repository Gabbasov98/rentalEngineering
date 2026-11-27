$(".burger").click(function () {
    $(".header").toggleClass("_open")
    $("body").toggleClass("fixed-body")
})

$(".scroll-up").click(function() {
    $("body,html").scrollTop(0);
})
$(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        $(".scroll-up").addClass("scroll-up--active")
    } else {
        $(".scroll-up").removeClass("scroll-up--active")
    }
})
