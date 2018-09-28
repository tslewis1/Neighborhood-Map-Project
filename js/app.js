var marker;
var category;

// Initialize new map
function initMap() {
  var map;

  // Create a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 37.228962,
      lng: -121.984667
    },
    zoom: 15
  });

  var defaultBounds = new google.maps.LatLngBounds(
  	new google.maps.LatLng(37.235808,-121.962375),
  	new google.maps.LatLng(37.22029,-121.991859));

  var input = document.getElementById('filter-locations-box');
  var searchBox = new google.maps.places.SearchBox(input, {
  	bounds: defaultBounds
  });

  // autocomplete = new google.maps.places.Autocomplete(input, options);

    // These are the bakery places that will be shown to the user
    var locations = [
            {title: "Manresa Bread", location: {lat: 37.227059, lng: -121.981004}, category: ['bakery', 'bread']},
            {title: "Fleur De Cocoa", location: {lat: 37.223632, lng: -121.983657}, category: ['bakery', 'cafe']},
            {title: "Icing On The Cake", location: {lat: 37.222009, lng: -121.982357}, category: ['bakery', 'cake']},
            {title: "Mama's Bakery", location: {lat: 37.231465, lng: -121.980132}, category: ['bakery']},
            {title: "Maple Leaf Donuts", location: {lat: 37.233336, lng: -121.978076}, category: ['bakery', 'donuts']},
            {title: "Nothing Bundt Cakes", location: { lat: 37.229968, lng: -121.981321}, category: ['bakery', 'cake']}
    ];

  // Make infowindow 
  var infoWindow = new google.maps.InfoWindow({
    content: ''
  });

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
      title: title,
      animation: google.maps.Animation.DROP,
      icon: image,
      category: category,
      id: i
    });
    marker.setMap(map);

    var bouncingMarker = null;

    marker.addListener('click', (function(marker, i) {
      return function() {
        if (bouncingMarker)
        	bouncingMarker.setAnimation(null);
        if (bouncingMarker != this) {
        	this.setAnimation(google.maps.Animation.BOUNCE);
        	bouncingMarker = this;
        } else {
        	bouncingMarker = null;
        }
        infoWindow.setContent(this.title);
        infoWindow.open(map, this);
      };
    })(this, i));
  }
}

function filterLocations() {
	if (marker.category == category || category.length == 0) {
		marker.setVisible(true);
	} else {
		marker.setVisible(false);
	}
} 

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
        var heading =
          google.maps.geometry.spherical.computeHeading(
            nearStreetView, marker.position);
        infowindow.setContent('<div>' + marker.title +
          '</div><div id = "streetview-pano"></div>');
        var panoInfo = {
          position: nearStreetView,
          pov: {
            heading: heading,
            pitch: 25
          }
        };
        var panorama = new google.maps.StreetViewPanorama(
          document.getElementById('streetview-pano'),
          panoInfo);
      } else {
        infowindow.setContent('<div>' + marker.title + '</div><div>Sorry, no street view imagery found</div>');
      }
    }
    streetViewService.getPanoramaByLocation(marker.position,
      radius, findStreetView);
    infowindow.open(map, marker);
  }
}
