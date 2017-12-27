(function ($) {
    function _wheel(target, opt) {
        let _target = target,
            settings = {
                type: 'ring',
                radius: 'auto',
                props: 6,
                wrapClass: 'wheel-wrap',
                propClass: 'wheel-prop',
                rotateProps: true,
                responsive: true
            }, inited = false,
            fns = {};
        $.extend(settings, opt);

        function _init(_type) {
            if (_type in fns) {
                fns[_type]();
            } else {
                console.error('Undefined wheel type!');
            }
        }

        fns.plate = function () {
            let _wheel, s, rad, props = '';
            if (!inited) {
                for (s = 0; s < settings.props; s++) {
                    props += '<span class="' + settings.propClass + '"></span>';
                }
                _target.append('<div class="wheel ' + settings.wrapClass + '">' + props + '</div>');
                inited = true;
            }
            _wheel = _target.find('.wheel');

            _setup();

            function _setup() {
                rad = settings.radius == 'auto' ? (_wheel[0].offsetWidth / 2) : settings.radius;
                _target.find('.wheel').children().each(function (s) {
                    let angle = s * 360 / settings.props,
                        _x = rad * (1 + Math.sin(angle * (Math.PI / 180))),
                        _y = rad * (1 - Math.cos(angle * (Math.PI / 180))),
                        _rotate = settings.rotateProps ? (' rotate(' + angle + 'deg)') : '';
                    $(this).css({
                        display: 'block',
                        position: 'absolute',
                        top: _y,
                        left: _x,
                        transform: ('translateX(-50%) translateY(-50%)' + _rotate)
                    })
                });
            }
        };

        fns.ring = function () {
            let _wheel, s, rad, props = '';
            if (!inited) {
                for (s = 0; s < settings.props; s++) {
                    props += '<span class="' + settings.propClass + '"></span>';
                }
                _target.append('<div class="wheel ' + settings.wrapClass + '" style="transform-style: preserve-3d;">' + props + '</div>');
                _target.css('perspective-origin', '50% 50%');
                inited = true;
            }
            _wheel = _target.find('.wheel');

            _setup();

            function _setup() {
                rad = settings.radius == 'auto' ? (_wheel[0].offsetHeight / (2 * Math.tan(Math.PI / settings.props))) : settings.radius;
                _target.find('.wheel').children().each(function (s) {
                    let angle = s * 360 / settings.props,
                        _z = rad * (1 - Math.cos(angle * (Math.PI / 180))),
                        _y = angle == 180 ? 0 : (-1 * rad * (Math.sin(angle * (Math.PI / 180))));
                    $(this).css({
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transformOrigin: 'center',
                        transform: ('translateY(' + _y + 'px) translateZ(-' + _z + 'px) rotateX(' + angle + 'deg)')
                    })
                });
                _wheel.css({transformOrigin: ('50% 50% -' + rad + 'px')});
                if (navigator.userAgent.toLowerCase().indexOf('applewebkit') >= 0) {
                    _target.css('perspective', 0);
                }
            }
        };

        _init(settings.type);
        if (settings.responsive == true && settings.type == 'plate') {
            $(window).resize(function () {
                _init(settings.type)
            });
        }
    }

    function _clock(target, opt) {
        let _target = target,
            settings = {
                radius: 'auto',
                tickType: '',
                rotateProps: true,
                responsive: true,
                ticks: []
            },
            parts = '<span class="axle"></span><span class="hr"></span><span class="min"></span><span class="sec"></span>',
            _now = new Date(),
            _today = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), 0, 0, 0),
            angles = {
                hr: 0,
                min: 0,
                sec: 0
            },
            ticks = {
                roman: ['Ⅻ', 'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ'],
                arabic: [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                chinese: ['拾貳', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖', '拾', '拾壹'],
                zodiac: ['♓', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒'],
                chineseZodiac: ['🐷', '🐭', '🐮', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐵', '🐔', '🐶']
            }, temp, _clock;
        $.extend(settings, opt);

        _target.addClass('clock-wrap');
        _target.append('<div class="clock"></div>');
        _clock = _target.find('.clock');

        if(settings.tickType != '') {
            _clock.addClass('custom');
        }

        _clock.wheel({
            type: 'plate',
            radius: settings.radius,
            props: 12,
            wrapClass: 'ticks',
            propClass: 'tick',
            rotateProps: settings.rotateProps,
            responsive: settings.responsive
        });

        if (settings.tickType == 'custom') {
            _target.find('.tick').each(function (i) {
                $(this).append(settings.ticks[i]);
            });
        } else if (settings.tickType != '') {
            _target.find('.tick').each(function (i) {
                $(this).append(ticks[settings.tickType][i]);
            });
        }

        _clock.append(parts);
        setInterval(function () {
            _now = new Date();
            temp = Math.round((_now - _today) / 1000);
            angles = {
                hr: (360 / 12) * ((temp / 3600) % 12) + 180,
                min: 6 * Math.floor(temp / 60) + 180,
                sec: 6 * temp + 180
            };
            _turn(angles);
            if (_target.hasClass('fancy') && angles.sec % 180 == 0) {
                _clock.addClass('halfMin');
                setTimeout(function () {
                    _clock.removeClass('halfMin');
                }, 15000);
            }
        }, 500);

        function _turn(angles) {
            _target.find('.hr').css('transform', 'rotate(' + angles.hr + 'deg)');
            _target.find('.min').css('transform', 'rotate(' + angles.min + 'deg)');
            _target.find('.sec').css('transform', 'rotate(' + angles.sec + 'deg)');
        }
    }

    $.fn.extend({
        wheel: function (opt) {
            return this.each(function () {
                _wheel($(this), opt);
            });
        },
        clock: function (opt) {
            return this.each(function () {
                _clock($(this), opt);
            });
        }
    });
})(jQuery);