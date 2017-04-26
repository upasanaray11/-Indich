// JavaScript source code

$(function () {
    $('#menu').hover(function () {
        $('#dropdown').stop().slideDown();
    }, function () {
        $('#dropdown').stop().slideUp();
    });
    /*$('.dropdownitem').eq(0).click(function () {
        alert('DRINKS');
    })
    $('.dropdownitem').eq(1).click(function () {
        alert('APPETIZER');
    })
    $('.dropdownitem').eq(2).click(function () {
        alert('DESSERTS');
    })
    $('.dropdownitem').eq(3).click(function () {
        alert('ENTREES');
    })*/
})