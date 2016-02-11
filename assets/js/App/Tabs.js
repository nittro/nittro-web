_context.invoke('App', function (DOM) {

    var Tabs = _context.extend(function(page) {
        this._ = {
            page: page
        };

        this._.page.on('update', this._handleUpdate.bind(this));

    }, {
        _handleUpdate: function (evt) {
            if (!('tab' in evt.data)) {
                return;

            }

            var menu = DOM.getById('menu'),
                current = menu.getElementsByClassName('active');

            if (current && current.length) {
                current.item(0).classList.remove('active');

            }

            current = menu.getElementsByClassName('tab-' + evt.data.tab);

            if (current && current.length) {
                current.item(0).classList.add('active');

            }
        }
    });

    _context.register(Tabs, 'Tabs');

}, {
    DOM: 'Utils.DOM'
});
