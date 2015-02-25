//= require jquery
//= require jquery_ujs
//= require animatescroll.min.js
//= require_tree .

// var ready = function(){
// 	$('.names').removeClass("hidden");
// 	$('.names').addClass('animated fadeInDown');
// 	$('.date').removeClass("hidden");
// 	$('.date').addClass('animated fadeInDown');

// 	$("#location-link").click(function(){
// 	    $('html, body').animate({
// 	        scrollTop: $("#location").offset().top,
// 	        easing: "easeInOutCubic"
// 	    }, 500);
// 	});
// }

// setTimeout(ready, 1200);


var ready = function(){
  $(".home-link").click(function(event){
    event.preventDefault();
    var name = $(event.target).attr("data-name");
    $("#"+name).animatescroll({
      easing: "swing"
    })
  })

  $(".ind-location").mouseover(function(event){
  	var selector = "#" + $(event.target).data("name");
  	$(selector).addClass("location-active");
  	toggleBounce(selector)
  })

  $(".ind-location").mouseout(function(event){
  	$(".ind-location").removeClass("location-active");
  	var selector = "#" + $(event.target).data("name");
    toggleBounce(selector)
  })
}

$(ready)



// The following example creates a marker in Stockholm, Sweden
// // using a DROP animation. Clicking on the marker will toggle
// // the animation between a BOUNCE animation and no animation.
//38.452427,-122.703247
var church = new google.maps.LatLng(38.452427, -122.703247);
var reception = new google.maps.LatLng(38.6204845, -122.864779);
var center = new google.maps.LatLng(38.543795, -122.772683);
var marker;
var map;
var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
function initialize() {
  var mapOptions = {
    zoom: 11,
    center: center,
    scrollwheel: false,
    styles: styles
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
                            mapOptions);

                            churchMarker = new google.maps.Marker({
                              map:map,
                              draggable:false,
                              animation: google.maps.Animation.DROP,
                              position: church
                            });

                            receptionMarker = new google.maps.Marker({
                              map:map,
                              draggable:false,
                              animation: google.maps.Animation.DROP,
                              position: reception
                            });
}

function toggleBounce(selector) {
  var marker = selector == "#ceremony" ? churchMarker : receptionMarker;
  if(!marker || marker.getAnimation() != null) {
    marker.setAnimation(null);
  }else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

google.maps.event.addDomListener(window, 'load', function(){setTimeout(initialize, 1500)});
