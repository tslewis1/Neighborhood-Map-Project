var mapModel = function() {
	var map;
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
};

var mapView = {
};

var viewModel = {
	initMap: function() {
		// Create a new map
		map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 37.235808, lng: -121.962375},
			zoom: 14
		});
	}
}
viewModel.initMap();
