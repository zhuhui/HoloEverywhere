var Holo = {
	_init : function() {
		this.includeCss("css/style.css");

		$("<meta>", {
			name : "viewport",
			context : "user-scalable=no,width=device-width",
			appendTo : $("head")
		});

		if ($("meta[charset]").size() == 0) {
			$("<meta>", {
				charset : "UTF-8",
				appendTo : $("head")
			});
		}

		this._attachHeader();
		this._attachForkMe();

		this.refresh();
	},
	_attachHeader : function() {
		var header = $("<header>", {
			class : "header",
			prependTo : $("body")
		});

		// Logo
		$("<img>", {
			class : "logo",
			appendTo : header
		});

		// Title
		$("<div>", {
			class : "text",
			appendTo : header,
			append : [ $("<span>", {
				class : "title"
			}), $("<br>"), $("<span>", {
				class : "subtitle"
			}) ]
		});

		// Menu
		$("<ul>", {
			class : "menu",
			appendTo : header
		});
	},
	_attachForkMe : function() {
		$("<a>", {
			appendTo : $("body"),
			class : "fork-me",
			change : function() {
				$("a.fork-me").each(function() {
					if (this.attr("href").length() > 0) {
						this.removeClass("gone");
					} else {
						this.addClass("gone");
					}
				});
			},
			append : [ $("<img>", {
				alt : "Fork me on GitHub",
				src : "img/forkme.png"
			}) ]
		});
	},
	includeCss : function(url) {
		$("<link>", {
			rel : "stylesheet",
			href : url,
			appendTo : $("head")
		});
	},
	refresh : function() {
		var he = $("holoeverywhere");
		this.title(he.attr("title"));
		this.subtitle(he.attr("subtitle"));
		this.logo(he.attr("logo"));
		this.forkme(he.attr("forkme"));
	},
	title : function(title) {
		document.title = $("<div>").html(title).text(); // Strip tags
		$("header.header span.title").html(title);
	},
	subtitle : function(subtitle) {
		$("header.header span.subtitle").html(subtitle);
	},
	logo : function(logo) {
		$("header.header img.logo").attr("src", logo);
	},
	forkme : function(url) {
		$("a.fork-me").attr("href", url);
	}
};

$($.proxy(Holo._init, Holo));