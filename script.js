$(document).ready(function () {
    $("a").on('click', function (event) {

        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {

                window.location.hash = hash;
            });
        }
    });

    function typeString($target, str, cursor, delay, cb) {
        $target.html(function (_, html) {
            return html + str[cursor];
        });

        if (cursor < str.length - 1) {
            setTimeout(function () {
                typeString($target, str, cursor + 1, delay, cb);
            }, delay);
        } else {
            cb();
        }
    }

    // clears the string
    //
    // @param jQuery $target
    // @param Numeric delay
    // @param Function cb
    // @return void
    function deleteString($target, delay, cb) {
        var length;

        $target.html(function (_, html) {
            length = html.length;
            return html.substr(0, length - 1);
        });

        if (length > 1) {
            setTimeout(function () {
                deleteString($target, delay, cb);
            }, delay);
        } else {
            cb();
        }
    }

    // jQuery hook
    $.fn.extend({
        teletype: function (opts) {
            var settings = $.extend({}, $.teletype.defaults, opts);

            return $(this).each(function () {
                (function loop($tar, idx) {
                    // type
                    typeString($tar, settings.text[idx], 0, settings.delay, function () {
                        // delete
                        setTimeout(function () {
                            deleteString($tar, settings.delay, function () {
                                loop($tar, (idx + 1) % settings.text.length);
                            });
                        }, settings.pause);
                    });

                }($(this), 0));
            });
        }
    });

    // plugin defaults  
    $.extend({
        teletype: {
            defaults: {
                delay: 100,
                pause: 3000,
                text: []
            }
        }
    });
});
    function typeString($target, str, cursor, delay, cb) {
        $target.html(function (_, html) {
            return html + str[cursor];
        });

        if (cursor < str.length - 1) {
            setTimeout(function () {
                typeString($target, str, cursor + 1, delay, cb);
            }, delay);
        } else {
            cb();
        }
    }

    // clears the string
    //
    // @param jQuery $target
    // @param Numeric delay
    // @param Function cb
    // @return void
    function deleteString($target, delay, cb) {
        var length;

        $target.html(function (_, html) {
            length = html.length;
            return html.substr(0, length - 1);
        });

        if (length > 1) {
            setTimeout(function () {
                deleteString($target, delay, cb);
            }, delay);
        } else {
            cb();
        }
    }

    // jQuery hook
    $.fn.extend({
        teletype: function (opts) {
            var settings = $.extend({}, $.teletype.defaults, opts);

            return $(this).each(function () {
                (function loop($tar, idx) {
                    // type
                    typeString($tar, settings.text[idx], 0, settings.delay, function () {
                        // delete
                        setTimeout(function () {
                            deleteString($tar, settings.delay, function () {
                                loop($tar, (idx + 1) % settings.text.length);
                            });
                        }, settings.pause);
                    });

                }($(this), 0));
            });
        }
    });

    // plugin defaults  
    $.extend({
        teletype: {
            defaults: {
                delay: 100,
                pause: 5000,
                text: []
            }
        }
});


$('#target').teletype({
    text: [
        'memories',
        'emotions',
        'stories',
        'moments',
    ]
});

$('#cursor').teletype({
    text: ['_', ' '],
    delay: 0,
    pause: 500
});