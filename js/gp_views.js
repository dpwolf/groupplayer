(function(){
	gp_views = {};
	gp_views.room = Backbone.View.extend({
		'initialize': function(args){
			_.bindAll(this,'render');
			this.model.bind('all',this.render);
			this.model.bind('change:title', this.changeTitle);
		},
		'render': function(){
			this.el = ich.room(this.model.toJSON())
			return this;
		},
		'changeTitle': function(){
			this.$('.room_title').text(this.model.get('title'));
		},
		'changeURL': function(){
			this.$('#viewer iframe').attr('src',this.model.get('url'));
		}
	})
})()