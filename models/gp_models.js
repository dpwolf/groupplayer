(function(){
	var server = false, gp_models;
	if(typeof exports !== 'undefined'){
		_ = require('underscore')._;
		Backbone = require('backbone');

		gp_models = exports;
		server = true;
	} else {
		gp_models = this.gp_models = {};
	}

	gp_models.room = Backbone.Model.extend({
		'initialize': function(attrs){
			if(!attrs.title){
				throw "InvalidConstructArgs";
			}
			this.set({
				gid: 'room_' + this.cid
			});
			this.users = new gp_collections.users,
			this.current_link = new gp_collections.links,
			this.messages = new gp_collections.messages;
		},
		'validate': function(attrs){
			if(attrs.title){
				if (!_.isString(attrs.title) || attrs.title.length === 0 ) {
					return "Title must be a string with a length";
				}
			}
		}
	});
	gp_models.link = Backbone.Model.extend({
		'initialize': function(attrs){
			if(!attrs.title || !attrs.url){
				throw "InvalidConstructArgs";
			}
			this.set({
				title:attrs.title,
				url:attrs.url,
				gid: 'link_' + this.cid,
			});
		},
		'validate': function(attrs){
			if(attrs.title){
				if (!_.isString(attrs.title) || attrs.title.length === 0 ) {
					return "Title must be a string with a length";
				}
			}
			if(attrs.url){
				if (!_.isString(attrs.url) || attrs.url.length === 0 ) {
					return "URL must be a string with a length";
				}
			}
		}
	});
	gp_models.user = Backbone.Model.extend({
		'initialize': function(attrs){
			this.set({
				gid: 'user_' + this.cid,
				name: attrs.name
			});
			this.queue = new gp_collections.links;
		}
	});
	gp_models.message = Backbone.Model.extend({
		'user':null,
		'txt':null
	})
	gp_collections = {};
	gp_collections.links = Backbone.Collection.extend({model:gp_models.link});
	gp_collections.users = Backbone.Collection.extend({model:gp_models.user});
	gp_collections.messages = Backbone.Collection.extend({model:gp_models.message});
}
)()