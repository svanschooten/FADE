$(function(){
	$(".fade-page").each(function(){
		var el = $(this);
		$.get('http://loripsum.net/api/5/')
			.done(function(response){
				el.append(response);
			})
			.fail(function(msg){
				console.error(msg.responseText);
			});
	});
});