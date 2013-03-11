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
		this._attachContent();
		this._attachFooter();
		this._attachForkMe();

		$("div.node").appendTo('div.content').after(function(index) {
			return index % 2 == 0 ? null : $("<div>", {
				class : "clearfix"
			});
		});
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
	_attachContent : function() {
		$("<div>", {
			class : "content",
			appendTo : $("body"),
		});
	},
	_attachFooter : function() {
		$("<footer>", {
			class : "footer",
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
	refresh : function(data) {
		$($.proxy(function() {
			this.title(data.title);
			this.subtitle(data.subtitle);
			this.logo(data.logo);
			this.forkme(data.forkme);
			this.footer(data.footer);
			this.menu(data.menu);
		}, this));
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
	},
	footer : function(footer) {
		$("footer.footer").html(footer);
	},
	menu : function(menu) {
		var context = this;
		if (typeof menu == "string") {
			$.ajax(menu, {
				success : function(data) {
					context.menu($.parseJSON(data));
				}
			});
			return;
		}
		var menuContainer = $("header.header ul.menu");
		menuContainer.empty();
		$(menu).each(function(index, item) {
			var clazz = context.menuItemShouldBeActive(item) ? "active" : null;
			$("<li>", {
				class : clazz,
				append : $("<a>", {
					href : item.link,
					html : item.title
				}),
				appendTo : menuContainer
			});
		});
	},
	menuItemShouldBeActive : function(item) {
		return window.location.pathname === item.link;
	}
};

$($.proxy(Holo._init, Holo));