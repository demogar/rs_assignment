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

App.Models.Selection = Backbone.Model.extend();
// -- End: Models

// Collections
App.Collections.Selections = Backbone.Collection.extend({
	url : App.Configs.baseUrl + "/selections",
	model : App.Models.Selection
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

App.Views.HomeView = Backbone.View.extend({
	events : {
		"click #create_person" : "sendForm",
		"click .edit_user" : "editUser"
	},

	initialize : function () {
		// List of people
		this.collection = new App.Collections.People();
		this.collection.bind('reset', this.addAll, this);
		this.collection.fetch({reset: true});

		// List of selections
		this.selections = new App.Collections.Selections();
		this.selections.bind('reset', this.addAllSelections, this);
		this.selections.fetch({reset: true});
	},

	render: function () {
		var source = $("#home-template").html();
		var template = Handlebars.compile(source);
		this.$el.html( template() );
		return this;
	},

	sendForm : function(evt) {
		evt.preventDefault();
		if ($(this.el).find("#input_name").val() !== "") {
			var person = new App.Models.Person({
				name : $(this.el).find("#input_name").val()
			});
			// hackish
			person.url = App.Configs.baseUrl + "/people";
			person.save();
		} else {
			alert("Name is required");
		}
	},

	addAll : function () {
		that = this;
		$(this.el).find("#people_list").html("");
		if (this.collection.length > 0) {
			this.collection.each(function(person) {
				var source = $("#person-row").html();
				var template = Handlebars.compile(source);
				$(that.el).find("ul#people_list").append( template(person.attributes) );
			});
		}
	},

	addAllSelections : function () {
		// todo
	},

	editUser : function() {
		// todo
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