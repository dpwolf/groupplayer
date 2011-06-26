gp = {};
gp.models = {};
gp.models.room = Backbone.Model.extend({
	'initialize': function(attrs){
		if(!attrs.title){
			throw "InvalidConstructArgs";
		}
		this.set({
			gid: 'room_' + this.cid
		});
		this.users = new gp.collections.users,
		this.current_link = new gp.collections.links,
		this.messages = new gp.collections.messages;
	},
	'validate': function(attrs){
		if(attrs.title){
			if (!_.isString(attrs.title) || attrs.title.length === 0 ) {
				return "Title must be a string with a length";
			}
		}
	}
});
gp.models.link = Backbone.Model.extend({
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
gp.models.user = Backbone.Model.extend({
	'initialize': function(attrs){
		this.set({
			gid: 'user_' + this.cid,
			name: attrs.name
		});
		this.queue = new gp.collections.links;
	}
});
gp.models.message = Backbone.Model.extend({
	'user':null,
	'txt':null
})
gp.collections = {};
gp.collections.links = Backbone.Collection.extend({model:gp.models.link});
gp.collections.users = Backbone.Collection.extend({model:gp.models.user});
gp.collections.messages = Backbone.Collection.extend({model:gp.models.message});
