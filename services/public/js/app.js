// Module pattern
var App = App || {};
App.Configs = {
	baseUrl : "http://localhost:4567"
};
App.Collections = {},
App.Models = {},
App.Views = {};



// Models
App.Models.Person = Backbone.Model.extend({
	url : App.Configs.baseUrl + "/person"
});

App.Models.Selection = Backbone.Model.extend({

});
// -- End: Models



// Collections
App.Collections.Selections = Backbone.Collection.extend({
	
});

App.Collections.People = Backbone.Collection.extend({
	url : App.Configs.baseUrl + "/people",
	model : App.Models.Person
});
// -- End: Collections



// Views
App.Views.PersonView = Backbone.View.extend({
	initialize : function () {

	}
});

App.Views.PersonCreationView = Backbone.View.extend({

});

App.Views.HomeView = Backbone.View.extend({
	events : {
		"click .add_people" : "addPeople"
	},

	initialize : function () {
		this.collection = new App.Collections.People();
		this.collection.bind('reset', this.addAll, this);
		this.collection.fetch({reset: true});
	},

	render: function () {
		var source = $("#home-template").html();
		var template = Handlebars.compile(source);
		this.$el.html( template() );
		return this;
	},

	addAll : function () {
		if (this.collection.length > 0) {
		}
	},

	addPeople : function(e)  {
		e.preventDefault();
	}
});
// -- End: Views



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

$(document).ready(function() {
	// Start the app
	app = new App.Router(); // on global ns
	Backbone.history.start({pushState: false});
});