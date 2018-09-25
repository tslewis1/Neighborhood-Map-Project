// Initialize new map
function initMap() {
	var map;

	// Create a new array for all markers
	var markers = [];

	// Create a new map
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 37.228962, lng: -121.984667},
		zoom: 15
	});

	// Create a searchbox to search for places
	var searchBox = new google.maps.places.SearchBox(
		document.getElementById('filter-locations-box'));
	// Keep the search within the map bounds
	searchBox.setBounds(map.getBounds());
	// These are the bakery places that will be shown to the user
	var locations = [
			{title: "Manresa Bread", location: {lat: 37.227059, lng: -121.981004}},
			{title: "Fleur De Cocoa", location: {lat: 37.223632, lng: -121.983657}},
			{title: "Icing On The Cake", location: {lat: 37.222009, lng: -121.982357}},
			{title: "Mama's Bakery", location: {lat: 37.231465, lng: -121.980132}},
			{title: "Maple Leaf Donuts", location: {lat: 37.233336, lng: -121.978076}},
			{title: "Nothing Bundt Cakes", location: { lat: 37.229968, lng: -121.981321}}
	];

	// Make infowindow 
	var infoWindow = new google.maps.InfoWindow();

	// Style the default marker
	var defaultMarker = 'map-icons/bakery.svg'

	// Created a highlighted marker color for when the user mouses over the marker
	var highlightedMarker = 'map-icons/bakery-highlighted.psd'

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
    	console.log(locations[i].location);
	    var position = locations[i].location;
	    var title = locations[i].title;
	    var image = 'map-icons/bakery.svg';
	    // Create a marker per location, and put into markers array.
	    var marker = new google.maps.Marker({
	    	position: position,
	        title: title,
	        animation: google.maps.Animation.DROP,
	        // icon: defaultMarker,
	        id: i,
	        icon: image
		});

    marker.setMap(map);
	};

	marker.addListener('click', function() {
		addInfoWindowContent(this, infoWindow);
	});

	marker.addListener('click', toggleBounce);
};

 function toggleBounce() {
 	if (marker.getAnimation() !== null) {
 		marker.setAnimation(null);
 	} else {
 		marker.setAnimation(google.maps.Animation.BOUNCE);
 	}
 };

function addInfoWindowContent(marker, infowindow) {
	// Check to see if infowindow is not open
	if (infowindow.marker != marker) {
		infowindow.setContent('');
		infowindow.marker = marker;
		// Clear the infowindow content when it is closed
		infowindow.addListener('closeclick', function() {
			infowindow.marker = null;
		});

		var streetViewService = new google.maps.StreetViewService();
		var radius = 40;

		function findStreetView(data, status) {
			if (status == google.maps.StreetViewStatus.OK) {
				var nearStreetView = data.location.latLng;
				var heading = google.maps.geometry.spherical.computeHeading(
					nearStreetView, marker.position);
					infowindow.setContent('<div>' + marker.title + '</div><div id = "streetview-pano"></div>');
					var panoInfo = {
						position: nearStreetView,
						pov: {
							heading: heading,
							pitch: 25
						}
					};
				var panorama = new google.maps.StreetViewPanorama(
					document.getElementById('streetview-pano'), panoInfo);
			} else {
				infowindow.setContent('<div>' + marker.title + '</div><div>No Street View Found</div>');
			}
		}
		streetViewService.getPanoramaByLocation(marker.position, radius, findStreetView);
		infowindow.open(map, marker);
	}
}