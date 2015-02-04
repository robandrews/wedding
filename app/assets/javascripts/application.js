//= require jquery
//= require jquery_ujs
//= require_tree .

var ready = function(){
	$('.names').removeClass("hidden");
	$('.names').addClass('animated fadeInDown');
	$('.date').removeClass("hidden");
	$('.date').addClass('animated fadeInDown');
}

setTimeout(ready, 1500);
