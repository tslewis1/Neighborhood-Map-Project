var mapModel = function() {
	// Create a new array for all markers
	var markers = [];
	// These are the bakery places that will be shown to the user
	var bakeryLocations = [
		{title: "Manresa Bread", location: {lat: 37.227059, lng: -121.981004}},
		{title: "Fleur De Cocoa", location: {lat: 37.223632, lng: -121.983657}},
		{title: "Icing On The Cake", location: {lat: 37.222009, lng: -121.982357}},
		{title: "Mama's Bakery", location: {lat: 37.231465, lng: -121.980132}},
		{title: "Maple Leaf Donuts", location: {lat: 37.233336, lng: -121.978076}},
		{title: "Nothing Bundt Cakes", location: { lat: 37.229968, lng: -121.981321}}
	];

	// This for loop uses the bakery locations array to create an array of map markers
	for (var i = 0; i <bakeryLocations.length; i++) {
		var position = bakeryLocations[i].location;
		var title = bakeryLocations[i].title;
		// Create a marker for each location and put them into an array
		var marker = new google.maps.Marker({
			position: position,
			title: title,
			animation: google.maps.Animation.DROP,
			icon: defaultMarker
		})
	}

	// Push markers to the array
	markers.push(marker);
};

var mapView = function() {
	var map;

	// Initialize new map
	initMap = function() {
		// Create a new map
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 37.235808, lng: -121.962375},
			zoom: 14
		});
	}

	// Style the default marker icon
	var defaultMarker = makeMarkers('0091FF');

	// Create a highlighted marker color for when the user clicks on or mouses over the marker
	var highlightedMarker = makeMarkers('EDF453');

	var infoWindow = new google.maps.InfoWindow();
};

var viewModel = function() {
	// Event listener for mouseover to change the color for a highlighted marker
	marker.addListener('mouseover', function() {
		this.setMarker(highlightedMarker);
	});
	// Event listener for mouseout to change the color back to the default color
	marker.addListener('mouseout', function() {
		this.setMarker(defaultMarker);
	});
}