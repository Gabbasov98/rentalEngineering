$("._tab").click(function() {
    let parentBlock = $(this).parents("._tabs-parent")
    let tabId = $(this).attr("data-tab")
    $(parentBlock).find("._tab").removeClass("_active")
    $(this).addClass("_active")
    $(parentBlock).find(".tab-content").removeClass("_active")
    $(parentBlock).find(".tab-content").removeClass("_active2")
    $(parentBlock).find(`.${tabId}`).addClass("_active")
    setTimeout(()=>{
        $(parentBlock).find(`.${tabId}`).addClass("_active2")
    },100)
})

$(".qa-card__show").click(function() {
    $(this).parents(".qa-card").toggleClass("_active")
    $(this).siblings(".qa-card__hidden").slideToggle()
})

$("._has-child .menu-item__top").click(function() {
    if(window.innerWidth>992){
        return
    }
    $(this).parents(".menu-item").toggleClass("_active")
    $(this).siblings(".menu-item__bottom").slideToggle()
})

$("._toggle-more").click(function() {
    $(this).parents("._toggle-more-parent").toggleClass("_show-all")
})

document.querySelectorAll('._toggle-more-parent').forEach(parent => {
    let el = parent.querySelector(".text")
    // Проверяем, обрезается ли текст (scrollHeight больше видимой высоты)
    const isOverflowing = el.scrollHeight > el.clientHeight;

    if (isOverflowing) {
        parent.classList.add("_show-btn")

        // btn.addEventListener('click', () => {
        //     const expanded = el.classList.toggle('is-expanded');
        //     btn.textContent = expanded ? 'Свернуть' : 'Читать полностью';
        //     btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        // });
        //
        // el.after(btn);
    }
});

$(".catalog-link:first-child").addClass("_hover")
$(".catalog-link").mouseover(function () {
    $(".catalog-link").removeClass("_hover")
    $(this).addClass("_hover")
})

$(".client-card").click(function () {
    let img = $(this).find("img").attr("src")
    let text = $(this).find(".client-card__text").html()
    let link = $(this).attr("data-news-link")
    $("#clientModal").find(".client-modal__img img").attr("src",img)
    $("#clientModal").find(".client-modal__text").html(text)
    $("#clientModal").find(".client-modal__link").attr("href",link)
    openModal("clientModal")
})

// $(document).mouseup( function(e){
//     let div = $( ".header-action__item--cart" );
//     if ( !div.is(e.target)
//         && div.has(e.target).length === 0 ) {
//         if($(div).hasClass("_open")){
//             $(div).removeClass("_open")
//         }
//     }
// });
