jQuery("input").each(function(i, node) {
	new TokenSelector(node, { spinner: "../spinner.gif" });
});

jQuery.mockjax({
	url: "/tokens",
	responseTime: 750,
	responseText: [{ id: 13, name: "#13" }, { id: 17, name: "#17" }]
});
