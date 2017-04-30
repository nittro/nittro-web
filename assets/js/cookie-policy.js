(function() {
    if (document.cookie && document.cookie.match(/(^|;)\s*cookie-policy-acknowledged=1\s*(;|$)/)) {
        document.cookie = 'cookie-policy-acknowledged=1;path=/;max-age=604800';
        return;
    }

    var i18n = {
        en: {
            main: 'We use cookies to give you the best online experience. By using our website you agree to our use of cookies in accordance with our cookie policy.',
            moreInfo: 'Learn more',
            acknowledged: 'I understand'
        },
        cs: {
            main: 'Tento web používá k poskytování služeb, personalizaci reklam a analýze návštěvnosti soubory cookie. Používáním tohoto webu s tímto souhlasíte.',
            moreInfo: 'Další informace',
            acknowledged: 'Rozumím'
        }
    };

    var elem = document.createElement('div'),
        lang = (document.documentElement.lang || navigator.userLanguage || navigator.language || 'en').replace(/^([a-z]{2}).+$/, '$1');

    lang in i18n || (lang = 'en');

    elem.id = 'cookie-policy';
    elem.innerHTML = i18n[lang].main + ' <a href="https://www.google.com/intl/' + lang + '/policies/technologies/cookies/" target="_blank">' + i18n[lang].moreInfo + '</a> <button type="button">' + i18n[lang].acknowledged + '</button>';

    elem.getElementsByTagName('button').item(0).addEventListener('click', function (evt) {
        evt.preventDefault();
        document.cookie = 'cookie-policy-acknowledged=1;path=/;max-age=604800';
        elem.parentNode.removeChild(elem);
    });

    function init() {
        if (document.body) {
            document.body.insertBefore(elem, document.body.firstChild);
        } else {
            window.setTimeout(init, 100);
        }
    }

    init();

})();
