function AnimateCss(options) {

    var self = this;

    var settings = $.extend({}, {
        elem: null,
        once: false,            // анимация проигрывается, класс не удаляется (на случай бесконечной анимации)
        effects: null,
        callback: false,
        class: 'animated ',
        animationend : 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
    }, options);

    this.effects = settings.effects;
    this.elem = settings.elem;
    this.index = 0;

    $(this.elem).addClass(settings.class);

    /*  Анимация происходит один раз или бесконечно */
    this.animateOne = function (effect, callback) {

        $(self.elem).addClass(effect);

        $(self.elem).one(settings.animationend, function () {
            if (settings.once === true) {
                $(self.elem).removeClass(effect);
            }
            if(typeof settings.callback === "function"){
                settings.callback(self, settings.effects);
            }
            if (typeof callback === "function") {
                callback();
            }
        });
    };

    /* Проигрывается последовательность анимаций */
    this.animateNext = function () {

        self.animateOne(settings.effects[self.index], function () {
            self.index++;

            if (typeof settings.effects[self.index] !== 'undefined') {
                self.animateNext();

            } else {
                if(typeof self.callback !== "undefined"){
                    self.callback(self.elem, self.effects);
                }
            }
        });
    };

    this.init = function () {
        if ($.isArray(settings.effects)) {
            settings.once = true;
            self.animateNext();
        } else {
            self.animateOne(self.effects);
        }
    };
}

$(function () {

    $.fn.animateCss = function (effects, once, callback) {
        return this.each(function() {
            new AnimateCss({elem: this, effects: effects, once: once, callback: callback}).init();
        });
    };
});