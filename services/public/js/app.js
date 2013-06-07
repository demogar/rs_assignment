// Module pattern
var App = App || {};
App.Configs = {
	baseUrl : "http://localhost:4567"
};
App.Stored = {},
App.Collections = {},
App.Models = {},
App.Views = {};

$(document).ready(function() {
	// Start the app
	app = new App.Router(); // on global ns
	Backbone.history.start({pushState: false});
});