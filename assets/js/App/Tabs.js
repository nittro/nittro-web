_context.invoke('App', function (DOM) {

    var Tabs = _context.extend(function(page) {
        this._ = {
            page: page
        };

        this._.page.on('transaction-created', function(evt) {
            evt.data.transaction.add('tabs', this);
        }.bind(this));

    }, {
        init: function(transaction, context) {
            return {
                tab: null
            };
        },

        dispatch: function(transaction, data) {
            transaction.then(this._handleSuccess.bind(this, data));
        },

        abort: function() {},

        handleAction: function(transaction, agent, action, actionData, data) {
            if (agent === 'ajax' && action === 'response') {
                var payload = actionData.getPayload();

                if ('tab' in payload) {
                    data.tab = payload.tab;
                }
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
