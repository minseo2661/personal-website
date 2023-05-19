// JavaScript Document
$(function(){
    $("header .mbtn > a").click(function(){
        $(".totalmenu-wrap").addClass("on");
    });

    $("header .totalmenu-wrap .close").click(function(){
        $(".totalmenu-wrap").removeClass("on");
    })
})


function fullHt (_this){
    $(_this).toggleClass("on");
}