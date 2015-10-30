/* SCRIPTS.JS
-------------------------------------------------*/

$(document).ready(function(){
  console.log("hello hello");

    //GOOGLE MAPS API GLOBAL VARIABLES *NEEDED*
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.78, lng: -122.45},
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.TERRAIN, //Look of map
    });


    var Marker;
    var newMarker;
    var place;
    var infowindow;
    var contentString;

    //listener function for markers has to be here for it to bind correct marker to infoWindow
    var listenMarker = function(marker, contentString){

        marker.addListener('click', function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
        });
    };


      //GET REQUEST TO LOAD MARKERS FROM SERVER
      $.get('/places', function (data) {

          for (var i = 0; i < data.length; i++) {

                var lat = data[i].latitude;
                var lng = data[i].longitude;
                var position = {lat: lat, lng: lng};
                var icon = "/js/Pin.png";

                contentString = 
                  "<p>" + data[i].placeName + "</p>" +
                  "<p>" + data[i].address + "</p" +
                  "<p> City: " + data[i].city + "</p>" +
                  "<p> Place Visited: " + data[i].placeVisited + "</p>" +
                  "<p> Pricing: " + data[i].pricing + "</p>" +
                  "<p> Rating: " + data[i].rating + "</p>" +
                  "<p> NOTES: " + data[i].notes + "</p>";


                  // Create a marker for each place.
                  Marker =  new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: data.placeName,
                    position: position
                  });

                infowindow = new google.maps.InfoWindow({maxWidth: 300}); 
                listenMarker(Marker, contentString);   

            }

      }); 


      // GOOGLE search field autocomplete and gets result objects


      var initAutocomplete = function () {

          //Searchbox

          var searchBox = new google.maps.places.SearchBox(document.getElementById("map-search"));


                // Bias the SearchBox results towards current map's viewport.
                map.addListener('bounds_changed', function () {
                    searchBox.setBounds(map.getBounds());
                });


                // Listen for the event fired when the user selects a prediction and retrieve
                searchBox.addListener('places_changed', function () {
                    var places = searchBox.getPlaces();
                    place = places[0];
                    console.log(place);
                        if (places.length === 0) {
                        return;
                        //set alert for "NOT FOUND!"
                        }
                });
       };

        initAutocomplete();



});

//end of getready function
//LOGIN & SIGN UP CLICK FEATURE
$(function() {
  	$('#log-in').click(function() { 
  		$('#log-in-menu').toggleClass('visible');
  	});	
});


$(function() {
    $('#sign-up').click(function() { 
      	$('#sign-up-menu').toggleClass('visible');
    });	
});


//ROUTE REQUESTS ON EVENTS

//Mark Form Post

$('#new-mark-form').on('submit', function (e) {
   e.preventDefault();
  
    //adding value to hidden inputs in form 
    $('#mark-name').val(place.name);
    $('#mark-address').val(place.formatted_address);
    $('#mark-lat').val(place.geometry.location.lat);
    $('#mark-lng').val(place.geometry.location.lng);

    var newMarkForm = $('#new-mark-form').serialize();
    // console.log ("what's going on");

    $.ajax({
      url: "/places",
      type: "POST",
      data: newMarkForm
    }).done(
      function(){
        console.log('I am in the ajax method');
      }
    );

      request.done(function (data){

      var lat = data.latitude;
      var lng = data.longitude;
      var position = {lat: lat, lng: lng};


      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
        function addMarker(place) {
          var icon = "/js/Pin.png";

          contentString = 
          "<p>" + data.placeName + "</p>" +
          "<p>" + data.address + "</p>" +
          "<p> City: " + data.city + "</p>" +
          "<p> Place Visited: " + data.placeVisited + "</p>" +
          "<p> Pricing: " + data.pricing + "</p>" +
          "<p> Rating: " + data.rating + "</p>" +
          "<p> NOTES: " + data.notes + "</p>";


              // Create a marker for each place.
              newMarker =  new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: data.placeName,
                  position: position,
              });

            infowindow = new google.maps.InfoWindow({maxWidth: 300});

         }

        addMarker(place);
        listenMarker(newMarker, contentString);

        $('#new-mark-form').trigger("reset");
        $('#map-search').val("");


        request.fail(function (data){
          console.log(data);
        });
    });
});





