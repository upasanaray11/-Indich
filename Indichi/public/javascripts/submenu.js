// JavaScript source code

$(function () {
    var reduce = $('.reduce');
    var count = $('.count-input');
    var add = $('.add');
    var select = $('.select');
    add.click(function () {
        count.val(parseInt(count.val()) + 1);
        console.log('add');
    });
    reduce.click(function () {
        if (parseInt(count.val()) > 0) {
            count.val(parseInt(count.val()) - 1);
            console.log('reduce');
        }
                
    });
})