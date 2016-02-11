_context.invoke('App', function (DOM) {

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
            var link = DOM.closest(evt.target, 'a');

            if (link && DOM.closest(evt.target, 'div', 'wiki')) {
                link.setAttribute('data-transition', '#snippet--wiki');
                this._.page.openLink(link, evt);

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
    DOM: 'Utils.DOM'
});
