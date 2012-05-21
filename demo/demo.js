jQuery("input").each(function(i, node) {
	new TokenSelector(node);
});

jQuery.mockjax({
	url: "/tokens",
	response: function() {
		this.responseTime = 750;

		this.responseText = [];
		var input = $(".ui-autocomplete-input").val();
		var max = Math.random() * 10 + 1;
		var i = 0;
		for(i; i < max; i++) {
			var len = Math.random() * 10 + 1;
			this.responseText.push({
				id: i,
				name: input + Math.random().toString(36).substring(len)
			});
		}
	}
});
