/* Author:
	Stijn van Schooten
*/
(function ( $ ) {
	var F = $.fade = {};
	F.target = null;
    F.defaults = {
		"nav-color": '#a6a6a6',
		"nav-color-orig": $(".fade-nav  li").css('background-color'),
		"nav-color-text": '#ffffff',
		"nav-color-text-orig": $(".fade-nav  li").css('color'),
		"title-color": '#313131',
		"title-color-text": '#ffffff',
		"content-color": '#ffffff',
		"fade-time": 350,
		ease: "linear",
		develop: true,
		header: ""
	}
	F.navigators = {};
	F.home = null;
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
		dev('Built up navigation array');
		$("div.fade-nav li").each(function(){
			var elem = $(this);
			var target = elem.attr('data-target');
			elem.hover(
				function(){
					dev('animating on hover: ' + target);
					elem.stop().animate({
						color: F.defaults['nav-color-text'],
						backgroundColor: F.defaults['nav-color'],
						queue: false
					}, 
					F.defaults['fade-time'], 
					F.defaults.ease)
					elem.attr('anim', true);
				},
				function(){
					dev('animating on hover stop: ' + target);
					elem.stop().animate({
						color: F.defaults['nav-color-text-orig'],
						backgroundColor: F.defaults['nav-color-orig'],
						queue: false
					}, 
					F.defaults['fade-time'], 
					F.defaults.ease)
				}
			);
				
			elem.click(function(){
				dev('fading to ' + target);
				$("div.fade-page").fadeOut({
					duration: F.defaults['fade-time'],
					easing: F.defaults.ease,
				});
				F.target = target;
				setTimeout(function(){
					F.navigators[F.target].fadeIn(F.defaults['fade-time'],
						function(){
							F.target = null;
					});
				}, F.defaults['fade-time'] + 10);
			});
		});
	});
	
	function dev(msg){
		if($.fade.defaults.develop){
			console.log(msg);
		}
	}
}( jQuery ));