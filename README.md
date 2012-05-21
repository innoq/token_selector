TokenSelector
=============

lightweight JavaScript widget for multi-selection

demo: http://innoq.github.com/token_selector

source: https://github.com/innoq/token_selector

license: Apache License 2.0

copyright: [innoQ Deutschland GmbH](http://innoq.com)


Usage
-----

    <input class="tokens"
            value="1, 2"
            data-tokens='[{ "id": 1, "name": "Foo" }, { "id": 2, "name": "Bar" }]'
            data-query-url="/tokens"
            data-token-uri="/tokens/%7Bid%7D">

    $(".tokens").each(function(i, node) {
        new IQVOC.TokenSelector(node);
    });

See `demo` directory for examples.

Note: The default style sheet is mainly intended as reference.


Dependencies
------------

* [jQuery](http://jquery.com)
* [jQuery UI Autocomplete](http://jqueryui.com/demos/autocomplete/)


Browser Support
---------------

tested on Firefox, Chrome, Safari and Internet Explorer 7


Alternatives
------------

* [Chosen](http://harvesthq.github.com/chosen/)
