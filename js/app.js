// Initialize new map
function initMap() {
	var map;

	// Create a new array for all markers
	var markers = [];

	// Create a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 37.228843, lng: -121.98124},
		zoom: 15
	});

	// These are the bakery places that will be shown to the user
	var locations = [
			{title: "Manresa Bread", location: {lat: 37.227059, lng: -121.981004}},
			{title: "Fleur De Cocoa", location: {lat: 37.223632, lng: -121.983657}},
			{title: "Icing On The Cake", location: {lat: 37.222009, lng: -121.982357}},
			{title: "Mama's Bakery", location: {lat: 37.231465, lng: -121.980132}},
			{title: "Maple Leaf Donuts", location: {lat: 37.233336, lng: -121.978076}},
			{title: "Nothing Bundt Cakes", location: { lat: 37.229968, lng: -121.981321}}
	];

	var infoWindow = new google.maps.InfoWindow();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
    	console.log(locations[i].location);
	    var position = locations[i].location;
	    var title = locations[i].title;
	    // Create a marker per location, and put into markers array.
	    var marker = new google.maps.Marker({
	    	position: position,
	        title: title,
	        animation: google.maps.Animation.DROP,
	        // icon: defaultMarker,
	        id: i
		});

    marker.setMap(map);
	}
};
// const Yelp = require('yelp-fusion');

// const apiKey = 'B55nUzn2sGNPGNgWRLih9hhH4yT64R4UHllXLdiuYEdPW3lEtriTSdQsOP1Ne-GB-QsCjjzAL-2HIBinde8CddU8OwyolvUr07Vu9MVnG3diFOPCI-f9oQZvCMKiW3Yx'