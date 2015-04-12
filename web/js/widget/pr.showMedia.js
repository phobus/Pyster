(function($) {
	'use strict';
	$.widget("pr.showMedia", {
		options : {
			media : null,
			id : null,
			url_img : null,
			url_imdb : 'http://www.imdb.com/title/',
			url_tmdb : 'https://www.themoviedb.org/'
		},

		_create : function() {
			this.element.addClass('ui-widget pr-show-media');
			this.element.hide();

			this.poster = $('<img/>', {
				src : ''
			}).appendTo(this.element);

			// title
			this.panel_title = $('<div/>', {
				class : 'panel-title'
			}).appendTo(this.element);
			this.title = $('<h3/>').appendTo(this.panel_title);
			this.release_date = $('<span/>').appendTo(this.panel_title);

			// rating
			this.panel_rating = $('<div/>', {
				class : 'panel-rating'
			}).appendTo(this.element);
			this.vote_average = $('<span/>', {
				class : 'stars'
			}).appendTo(this.panel_rating);

			// data
			this.panel_data = $('<div/>', {
				class : 'panel-data'
			}).appendTo(this.element);
			$('<span/>', {
				text : 'Sinopsis'
			}).appendTo(this.panel_data);
			this.overview = $('<p/>').appendTo(this.panel_data);

			$('<span/>', {
				text : 'Estado:'
			}).appendTo(this.panel_data);
			this.status = $('<span/>').appendTo(this.panel_data);

			// icons
			this.panel_links = $('<div/>', {
				class : 'panel-links'
			}).appendTo(this.element);

			this.link_imdb = $('<a />', {
				href : '',
				target : '_blank',
				class : 'pr-icon icon-imdb',
				title : 'IMDb'
			}).appendTo(this.panel_links);

			this.link_tmdb = $('<a />', {
				href : '',
				target : '_blank',
				class : 'pr-icon icon-tmdb',
				title : 'themoviedb'
			}).appendTo(this.panel_links);

			this._super();
		},

		_destroy : function() {
			this.element.removeClass('ui-widget pr-show-media');
			this.element.empty();

			this._super();
		},

		loadData : function(media, id) {
			var widget = this;
			this.options.media = media;
			this.options.id = id;
			$.ajax({
				type : 'GET',
				url : 'api/idx/' + media + '/' + id,
				success : function(data, status, jqXHR) {
					if (widget.options.media == 'movie') {
						widget.title.text(data.title);
						widget.link_imdb.attr('href', widget.options.url_imdb
								+ data.imdb_id);
						widget.release_date.text(data.release_date);
					} else if (widget.options.media == 'tv') {
						widget.title.text(data.name);
						widget.link_imdb.hide();
						widget.release_date.text(data.first_air_date);
					}
					widget.link_tmdb.attr('href', widget.options.url_tmdb
							+ widget.options.media + '/' + data.id);
					widget.status.text(data.status);
					widget.overview.text(data.overview);
					widget.vote_average.text(data.vote_average);

					widget.poster.attr('src', widget.options.url_img
							+ data.poster_path);

					widget.vote_average.stars();
					widget.element.show();
				}
			});
		},

		clear : function() {
			if (this.options.id != null) {
				this.title.text('');

				this.status.text('');
				this.release_date.text('');
				this.overview.text('');
				this.poster.attr('src', '');
				this.link_imdb.attr('href', '');
				this.link_tmdb.attr('href', '');
				this.vote_average.text('');

				this.options.media = null;
				this.options.id = null;

				this.element.hide();
			}
		}
	});
})(jQuery);