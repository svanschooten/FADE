/* Author:
	Stijn van Schooten
*/
(function ( $ ) {
	var F = $.fade = {};
    F.defaults = {
		"nav-color": '#a6a6a6',
		"nav-color-text": '#ffffff',
		"title-color": '#313131',
		"title-color-text": '#ffffff',
		"content-color": '#ffffff',
		"fade-time": 650,
		ease: "linear",
		develop: true,
		header: ""
	}
	F.navigators = {};
	F.home = null;
    F.fade = function(el, target) {
        this.css( "color", shade );
        return this;
    };
	$(function(){
		F.defaults.header = $("div.fade-header").text();
		$("div.fade-content div.fade-page").each(function(){
			var elem = $(this);
			if(elem.hasClass('fade-home') && F.home == null){
				F.home = elem;
				elem.fadeIn();
				dev('home set to ' + elem.attr('data-link'));
			} else if(elem.hasClass('fade-home') && F.home != null){
				console.error("Home fade-page is already set, you can only have one home!");
			}
			F.navigators[elem.attr('data-link')] = elem;
		});
		$("div.fade-nav ul li").each(function(){
			var elem = $(this);
			elem.hover(function(){
				elem.animate({
					color: F.defaults['nav-color-text'],
					backgroundColor: F.defaults['nav-color']
				}, 
				F.defaults['fade-time'], 
				F.defaults.ease)
				console.log(elem[0]);
			});
				
			elem.click(function(){
				$("div.fade-page").fadeOut({
					duration: F.defaults['fade-time'],
					easing: F.defaults.ease,
					complete: function(){
						F.navigators[elem.attr('data-target')].fadeIn();
					}
				});
			});
		});
	});
}( jQuery ));



function dev(msg){
	if($.fade.defaults.develop){
		console.log(msg);
	}
}