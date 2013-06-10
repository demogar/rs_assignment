// Models
App.Models.Person = Backbone.Model.extend({
	url : function () {
		var url = App.Configs.baseUrl + "/people";

		if (this.id) {
			url += "/" + this.id;
		}

		return url;
	}
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
	model : App.Models.Person,
	initialize : function () {
		this.fetch({reset : true});
	}
});
// -- End: Collections