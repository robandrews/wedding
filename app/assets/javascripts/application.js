//= require jquery
//= require jquery_ujs
//= require animatescroll.min.js
//= require flat-ui.min.js
//= require sweet-alert.min.js
//= require_tree .

var ready = function(){
  $(".home-link").click(function(event){

    var name = $(event.target).attr("data-name");
    $("#"+name).animatescroll({
      easing: "swing"
    });
    var loc = window.location.hostname;
    window.location = "#" + name
  });

  $(".ind-location").mouseover(function(event){
  	var selector = "#" + $(event.target).data("name");
  	$(selector).addClass("location-active");
  	toggleBounce(selector);
  });

  $(".ind-location").mouseout(function(event){
  	$(".ind-location").removeClass("location-active");
  	var selector = "#" + $(event.target).data("name");
    toggleBounce(selector);
  });

  function validateData(data){
    var ret = [];
    if(data.name == ""){ret.push("Name is blank!")};
    if(data.name.length < 3 && data.name.length > 0){ret.push("Is your name really that short?")};
    if(data.body == ""){ret.push("Message is blank!")};
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(!re.test(data.email)){ret.push("Email address is invalid!")};
    return ret
  };

  $('.submit-form').click(function(event){
    event.preventDefault();
    var name = $("#msg-name").val();
    var email = $("#msg-email").val();
    var body = $("#msg-body").val();
    var data = {name: name, email: email, body: body};

    var errors = validateData(data)
    if(errors.length){
      var err = "Please fix the following things in the form:<br>" + errors.join("<br>");
      swal({type: "error", title: "Uh oh.", text: err , html: true});
      return
    }

    $.ajax({
      url: "/messages",
      method: "POST",
      data: data
    }).success(function(){
      swal("Delivered!", "Maya and Rob will receive your message shortly!", "success");
      var name = $("#msg-name").val("");
    var email = $("#msg-email").val("");
    var body = $("#msg-body").val("");
    }).error(function(){
      swal("Uh oh!", "Something went wrong.  Please try again.", "error")
    })
  })

  $('.reset-form').click(function(event){
    event.preventDefault();
    swal({   title: "Are you sure?",   text: "This will erase all the fields.",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "Reset",   closeOnConfirm: true }, 
      function(){
        $("#msg-name").val("");
        $("#msg-email").val("");
        $("#msg-body").val("");  
     });
  });
};

$(ready);


// The following example creates a marker in Stockholm, Sweden
// // using a DROP animation. Clicking on the marker will toggle
// // the animation between a BOUNCE animation and no animation.
//38.452427,-122.703247
var church = new google.maps.LatLng(38.452427, -122.703247);
var reception = new google.maps.LatLng(38.458579, -122.616944);
var center = new google.maps.LatLng(38.455503, -122.660096);
var marker;
var map;
var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
function initialize() {
  var mapOptions = {
    zoom: 12,
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
  if(!marker || marker.getAnimation() !== null) {
    marker.setAnimation(null);
  }else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

google.maps.event.addDomListener(window, 'load', function(){setTimeout(initialize, 1500)});
