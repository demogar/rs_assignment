// Router
App.Router = Backbone.Router.extend({
	routes : {
		"" : "home"
	},

	initialize : function (options) {
		// nothing to do here
	},

	// Home
	home: function () {
		this.homeView = new App.Views.HomeView();
		this.homeView.render();
		$("#content").html(this.homeView.$el);
	}
});