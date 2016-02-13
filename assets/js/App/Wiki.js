_context.invoke('App', function (DOM, Url) {

    var Wiki = _context.extend(function (ajax, page, router) {
        this._ = {
            ajax: ajax,
            page: page,
            router: router
        };

        DOM.addListener(document, 'click', this._handleLink.bind(this));
        this._.ajax.on('request-created', this._handleRequest.bind(this));
        this._.router.getDOMRoute('#snippet--wiki').on('match', this._handleWiki.bind(this));

    }, {
        _handleLink: function (evt) {
            if (evt.defaultPrevented || evt.ctrlKey || evt.metaKey || evt.shiftKey) {
                return;

            }

            var link = DOM.closest(evt.target, 'a'),
                d;

            if (link && DOM.closest(evt.target, 'div', 'wiki')) {
                d = Url.from(link.href).compare(Url.fromCurrent());

                if (d > Url.PART.HASH && d < Url.PART.PORT) {
                    link.setAttribute('data-transition', '#snippet--wiki');
                    this._.page.openLink(link, evt);

                }
            }
        },

        _handleRequest: function (evt) {
            if (evt.data.request.getUrl().getPath().match(/^\/wiki\//) && DOM.getById('snippet--wiki')) {
                evt.data.request.setHeader('X-Wiki', 'yes');

            }
        },

        _handleWiki: function (evt) {
            var blocks = evt.data[0].querySelectorAll('pre > code'),
                i, n;

            for (i = 0, n = blocks.length; i < n; i++) {
                hljs.highlightBlock(blocks.item(i));

            }
        }
    });

    _context.register(Wiki, 'Wiki');

}, {
    DOM: 'Utils.DOM',
    Url: 'Utils.Url'
});
