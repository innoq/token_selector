/*jslint vars: true, unparam: true, white: true */
/*global jQuery */

var TokenSelector = (function($) { // TODO: namespace?

"use strict";

var TokenSelector = function(node) {
	if(arguments.length === 0) { // subclassing; skip initialization
		return;
	}
	this.el = $(node).hide(); // XXX: rename
	this.container = $('<div class="token-select" />').data("widget", this);
	this.delimiter = ",";
	this.singular = this.el.data("singular") || false;
	this.tokens = this.getSelection();
	this.uriTemplate = this.el.data("token-uri");

	var self = this;

	// TODO: ensure that IDs in field value match data-tokens and vice versa
	var selection = $.map(this.el.data("tokens"), function(token, i) {
		return self.createToken(token);
	});
	selection = $('<ul class="token-list" />').append(selection);

	var exclude = this.el.data("exclude") || null,
		img = $('<img class="hidden" />').attr("src", "spinner.gif"); // TODO: configurable image path
	this.input = $("<input />").autocomplete({
		minLength: 3,
		source: function(req, callback) {
			var uri = self.el.data("query-url");
			$.getJSON(uri, { query: req.term }, function(data, status, xhr) { // TODO: error handling
				var excludes = self.getSelection().
						concat(exclude ? [exclude] : []);
				data = $.map(data, function(token, i) {
					return $.inArray(token.id, excludes) !== -1 ? null :
							{ value: token.id, label: token.name };
				});
				self.input.autocomplete("option", "autoFocus", data.length === 1);
				callback(data);
				img.addClass("hidden");
			});
		},
		search: function(ev, ui) { img.removeClass("hidden"); },
		focus: function(ev, ui) { return false; },
		select: this.onSelect
	});

	this.container.append(this.input).append(img).append(selection).
		insertAfter(node).prepend(node);

	if(this.singular && this.tokens.length) {
		this.input.hide();
	}
};
$.extend(TokenSelector.prototype, {
	onSelect: function(ev, ui) {
		var el = $(this).val(""),
			widget = el.closest(".token-select").data("widget");
		if(widget.add(ui.item.value)) {
			var token = widget.
					createToken({ id: ui.item.value, name: ui.item.label });
			widget.container.find("ul").append(token);
			if(widget.singular) {
				widget.input.hide();
			}
		}
		return false;
	},
	onDelete: function(ev) {
		var el = $(this),
			token = el.closest("li"),
			widget = el.closest(".token-select").data("widget");
		widget.remove(token.data("id"));
		token.remove();
		if(widget.singular && !widget.tokens.length) {
			widget.input.show();
		}
		ev.preventDefault();
	},
	createToken: function(token) {
		var el;
		if(this.uriTemplate) {
			var uri = this.uriTemplate.replace("%7Bid%7D", token.id); // XXX: not very generic -- XXX: why are { and } encoded?
			el = $('<a target="_blank" />').attr("href", uri).text(token.name);
		} else {
			el = $('<span />').text(token.name);
		}
		var delBtn = $('<a href="javascript:;" class="btn">x</a>'). // "btn" to avoid fancy "button" class -- XXX: hacky workaround!?
			click(this.onDelete);
		return $("<li />").data("id", token.id).append(el).append(delBtn)[0];
	},
	add: function(token) {
		if($.inArray(token, this.tokens) === -1) {
			this.tokens.push(token);
			this.setSelection();
			return true;
		} else {
			return false;
		}
	},
	remove: function(token) {
		var pos = $.inArray(token, this.tokens);
		if(pos !== -1) {
			this.tokens.splice(pos, 1);
			this.setSelection();
		}
	},
	setSelection: function() {
		this.el.val(this.tokens.join(this.delimiter));
	},
	getSelection: function() {
		return $.map(this.el.val().split(this.delimiter), function(token, i) {
			return token ? $.trim(token) : null;
		});
	}
});

return TokenSelector;

}(jQuery));
