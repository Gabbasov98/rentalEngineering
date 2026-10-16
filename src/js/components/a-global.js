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

$(".catalog-link:first-child").addClass("_hover")
$(".catalog-link").mouseover(function () {
    $(".catalog-link").removeClass("_hover")
    $(this).addClass("_hover")
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
