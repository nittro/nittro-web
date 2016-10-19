_context.invoke('App', function (DOM, Url) {

    var HashNav = _context.extend(function(snippetManager, margin) {
        this._ = {
            snippetManager: snippetManager,
            margin: margin
        };

        this._.snippetManager.on('after-update', this._handleUpdate.bind(this));
        DOM.addListener(document, 'click', this._handleClick.bind(this));

    }, {
        _handleUpdate: function (evt) {
            var id = document.location.hash.replace(/^#/, ''),
                elem;

            if (id && (elem = DOM.getById(id)) !== null) {
                this._scrollTo(elem);

            } else if (evt.data.update && 'snippet--content' in evt.data.update) {
                this._animateScroll(window.pageYOffset, 0);

            }
        },

        _handleClick: function (evt) {
            var elem = DOM.closest(evt.target, 'a'),
                url, p = null;

            if (elem && (url = Url.from(elem.href)).compare(Url.fromCurrent()) === Url.PART.HASH) {
                evt.preventDefault();

                if (url.getHash() && (elem = DOM.getById(url.getHash().replace(/^#/, ''))) !== null) {
                    p = this._scrollTo(elem);

                } else if (!url.getHash()) {
                    p = this._animateScroll(window.pageYOffset, 0);

                }

                if (p) {
                    p.then(function () {
                        window.history.pushState(null, document.title, url.toAbsolute());

                    });
                }
            }
        },

        _scrollTo: function (elem) {
            var rect = elem.getBoundingClientRect(),
                scroll = window.pageYOffset,
                height = window.innerHeight,
                target;

            if (rect.top < 0 || rect.top > height / 2 || rect.bottom > height) {
                target = Math.max(0, scroll + rect.top - this._.margin);
                return this._animateScroll(scroll, target);

            }
        },

        _animateScroll: function (from, to) {
            if (from === to) {
                return Promise.resolve();

            }

            return new Promise(function(fulfill) {
                function step() {
                    if (Math.abs(to - from) < 2) {
                        fulfill();
                        document.body.scrollTop = to;

                    } else {
                        var d = (to - from) / 10;

                        if (Math.abs(d) < 2) {
                            d = d < 0 ? -2 : 2;

                        }

                        from += d;
                        document.body.scrollTop = from;
                        window.requestAnimationFrame(step);

                    }
                }

                step();
            });
        }
    });

    _context.register(HashNav, 'HashNav');

}, {
    DOM: 'Utils.DOM',
    Url: 'Utils.Url'
});
