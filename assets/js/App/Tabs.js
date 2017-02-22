_context.invoke('App', function (DOM) {

    var Tabs = _context.extend(function(page) {
        this._ = {
            page: page
        };

        this._.page.on('transaction-created', function(evt) {
            this.init(evt.data.transaction);
        }.bind(this));

    }, {
        init: function(transaction) {
            var data = {
                tab: null
            };

            transaction.on('dispatch', this._dispatch.bind(this, data));
            transaction.on('ajax-response', this._handleResponse.bind(this, data));
        },

        _dispatch: function(data, evt) {
            evt.target.then(this._handleSuccess.bind(this, data));
        },

        _handleResponse: function(data, evt) {
            var payload = evt.data.response.getPayload();

            if ('tab' in payload) {
                data.tab = payload.tab;
            }
        },

        _handleSuccess: function (data) {
            if (!data.tab) {
                return;
            }

            var menu = DOM.getById('menu'),
                wrapper = DOM.getById('wrapper'),
                current = menu.getElementsByClassName('active');

            DOM.toggleClass(wrapper, 'homepage', data.tab === 'home');

            if (current && current.length) {
                current.item(0).classList.remove('active');

            }

            current = menu.getElementsByClassName('tab-' + data.tab);

            if (current && current.length) {
                current.item(0).classList.add('active');

            }
        }
    });

    _context.register(Tabs, 'Tabs');

}, {
    DOM: 'Utils.DOM'
});
