// Views
App.Views.HomeView = Backbone.View.extend({
	events : {
		"click #create_person" : "sendForm",
		"click .edit_user" : "editUser",
		"click .cancel_button" : "cancelEdit",
		"click .save_button" : "savePerson"
	},

	initialize : function () {
		// List of people, for the list
		this.collection = new App.Collections.People();
		this.collection.bind('reset', this.addAll, this);
		this.collection.bind('add', this.addOne, this);
		this.collection.fetch({reset: true});

		// List of selections, for the select box
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
		that = this;
		evt.preventDefault();

		if (this.$el.find("#input_name").val() !== "") {
			var person = new App.Models.Person();
			var params = { name : this.$el.find("#input_name").val() };
			person.save(params, {
				success : function (model, response) {
					that.addOne(model);
					that.$el.find("#input_name").val("");
				}
			});
		} else {
			alert("Name is required");
		}
	},

	addOne : function(person) {
		var source = $("#person-row-template").html();
		var template = Handlebars.compile(source);
		this.$el.find("ul#people_list").append( template(person.toJSON()) );
	},

	addAll : function () {
		that = this;
		this.$el.find("#people_list").html("");
		if (this.collection.length > 0) {
			var source = $("#person-row").html();
			this.collection.each(this.addOne, this);
		}
	},

	addAllSelections : function() {
		// Store this as a JavaScript object
		// so we don't need to fetch it for
		// every request
		App.Stored.selections = this.selections;
	},

	editUser : function(evt) {
		evt.preventDefault();
		var personId = $(evt.currentTarget).attr("data-person-id");

		var person = new App.Models.Person({
			id : personId
		});
		person.bind("sync", this.startEditing, this);
		person.fetch();
	},

	startEditing : function (person) {
		var id = person.get("id");

		// hide edit_btn
		this.showForm(id);

		// show form
		var source = $("#person-edit-form-template").html();
		var template = Handlebars.compile(source);
		var obj = {
			data : {
				selections : App.Stored.selections.toJSON(),
				person : person.toJSON()
			}
		};
		$(this.el).find("li#person-"+id+" .edit_form_container").html(template(obj));
	},

	showForm : function(personId) {
		// hide edit button
		this.$el.find("li#person-"+personId+" .edit_user").hide();
		this.$el.find("li#person-"+personId+" .current_selection").hide();
	},

	hideForm : function(personId) {
		// remove form
		this.$el.find("li#person-"+personId+" .edit_form_container").html("");
		// show edit button
		this.$el.find("li#person-"+personId+" .edit_user").show();
		this.$el.find("li#person-"+personId+" .current_selection").show();
	},

	cancelEdit : function(evt) {
		evt.preventDefault();
		var personId = $(evt.currentTarget).attr("data-person-id");
		this.hideForm(personId);
	},

	savePerson : function(evt) {
		that = this;
		evt.preventDefault();

		var personId = $(evt.currentTarget).attr("data-person-id");

		// edit user
		var newValue = $("li#person-"+personId+" select").val();
		var person = new App.Models.Person({ id : personId });
		person.save({ id : personId, selection_id : newValue }, {
			success : function(model, response) {
				var personId = model.get("id");
				that.hideForm(personId);
				$("li#person-"+personId+" .current_selection").html(model.get("selection").value);
			}
		});
	}
});
// -- End: Views