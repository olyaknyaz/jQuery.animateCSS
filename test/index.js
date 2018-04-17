$(function () {
    $('.js-animated-once').on('click', function (e) {
        e.preventDefault();

        $(this).animateCss('tada', true);
    });

    $('.js-animated-infinite').on('click', function (e) {
        e.preventDefault();

        $(this).animateCss('tada').css('animation-iteration-count', 'infinite');
    });

    $('.js-animated-multiply').on('click', function (e) {
        e.preventDefault();

        $(this).animateCss(['tada', 'shake', 'bounce']);
    });
});