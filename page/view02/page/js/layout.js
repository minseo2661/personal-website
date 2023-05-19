$(function(){
    $(document).ready(function(){
        $('.tabcont .cont').first().show();
        $('.tablist > li').first().addClass('on');
    });

    $('.tablist > li').click(function(){
        $('.tablist > li').removeClass('on');
        $(this).addClass('on');
        $('.tabcont .cont').hide();
        $('.tabcont .cont').eq($(this).index()).show();
    })
})