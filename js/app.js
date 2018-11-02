

// Initialize new map
function initMap() {
	var map;
	var marker;
	var category;

	// Create a new map
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {
      		lat: 37.228962,
      		lng: -121.984667
    	},
    	zoom: 15,
    	streetViewControl: false
  	});

  	var defaultBounds = new google.maps.LatLngBounds(
  		new google.maps.LatLng(37.235808,-121.962375),
  		new google.maps.LatLng(37.22029,-121.991859));

  	var input = document.getElementById('filter-locations-box');
  	var searchBox = new google.maps.places.SearchBox(input, {
  		bounds: defaultBounds
  	});

  	// autocomplete = new google.maps.places.Autocomplete(input, options);

  	// Foursquare Client ID and Secret 
	// var clientId = '0K2AW0JW2DVNI2H4VTSQNT0O4IN0WARG2B5GQQMUHSP5WR2J',
	// var clientSecret = 'RUZEIQTPWI2DGI04FBLNZ5SVBBCZFSGRXGOGEP0LGN4HLPKQ';

    // These are the bakery places that will be shown to the user
    var locations = [
            {title: "Manresa Bread", location: {lat: 37.227059, lng: -121.981004}, category: ['bakery', 'bread']},
            {title: "Fleur De Cocoa", location: {lat: 37.223632, lng: -121.983657}, category: ['bakery', 'cafe']},
            {title: "Icing On The Cake", location: {lat: 37.222009, lng: -121.982357}, category: ['bakery', 'cake']},
            {title: "Mama's Bakery", location: {lat: 37.231465, lng: -121.980132}, category: ['bakery']},
            {title: "Maple Leaf Donuts", location: {lat: 37.233336, lng: -121.978076}, category: ['bakery', 'donuts']},
            {title: "Nothing Bundt Cakes", location: { lat: 37.229968, lng: -121.981321}, category: ['bakery', 'cake']}
    ];

  	// The following group uses the location array to create an array of markers on initialize.
  	for (var i = 0; i < locations.length; i++) {
    	console.log(locations[i].location);
    	var position = locations[i].location;
    	var title = locations[i].title;
    	var image = 'map-icons/bakery.svg';
    	category = locations[i].category;
    	// Create a marker per location, and put into markers array.
    	marker = new google.maps.Marker({
      	position: position,
      	map: map,
      	title: title,
      	animation: google.maps.Animation.DROP,
      	icon: image,
      	category: category,
      	id: i
    	});
    
    	marker.setMap(map);

	  	// Make infowindow 
	  	var infowindow = new google.maps.InfoWindow({
	   		content: locations[i].title
	  	});

    	// When any marker is clicked, it should bounce. 
    	// When any marker is clicked, the first marker should stop bouncing.
    	var bouncingMarker = null;

    	// Add event listener for markers being clicked, and add animation when clicked
	    marker.addListener('click', (function(marker, i) {
	    	return function() {
	    		infowindow.open(map, marker);
	    		// If the clicked marker equals the bouncing marker, the bouncing should stop. 
	    		// When the clicked marker does not equal the bouncing marker, the clicked marker should bounce
	    		// and the first bouncing marker should stop bouncing.
	    		if (bouncingMarker == this) {
	    			bouncingMarker.setAnimation(null);
	    			bouncingMarker = null;
	    			infowindow.close();
	    		} else {
	    			this.setAnimation(google.maps.Animation.BOUNCE);
	    			if (bouncingMarker) {
		    			bouncingMarker.setAnimation(null);
	    			};
	    			bouncingMarker = this;
	    		};
	      	};
	    })(this, i));
	}
}