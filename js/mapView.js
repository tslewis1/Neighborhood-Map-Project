// Initialize new map
function initMap() {
  var map;
  var bouncingMarker = null;
  const toggleBounceOnMarker = (
    marker,
    forceClose = false
  ) => event => {
    const clickedSameMarker = bouncingMarker && bouncingMarker.id === marker.id;
    if (forceClose && clickedSameMarker) {
      bouncingMarker && bouncingMarker.setAnimation(null);
      bouncingMarker = null;
      return;
    }
    if (clickedSameMarker) {
      bouncingMarker.setAnimation(null);
      bouncingMarker = null;
    } else {
      //clicked other marker
      bouncingMarker && bouncingMarker.setAnimation(null);
      bouncingMarker = marker;
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  };

  let openInfo = null;
  const safeOpenInfoWindow = (infoWindow, marker) => (event) => {
    openInfo && openInfo.close();
    openInfo = infoWindow;
    infoWindow.open(map, marker);
  }

  // Create a new map
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 37.228962,
      lng: -121.984667
    },
    zoom: 15,
    streetViewControl: false
  });

  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(37.235808, -121.962375),
    new google.maps.LatLng(37.22029, -121.991859)
  );

  // var input = document.getElementById("filter-locations-box");
  // var searchBox = new google.maps.places.SearchBox(input, {
  //   bounds: defaultBounds
  // });

  // autocomplete = new google.maps.places.Autocomplete(input, options);

  // Yelp Client ID and API Key
  // var clientID = 'TWMNEkBZq9VALm1TOkL46w',
   const apiKey = 'B55nUzn2sGNPGNgWRLih9hhH4yT64R4UHllXLdiuYEdPW3lEtriTSdQsOP1Ne-GB-QsCjjzAL-2HIBinde8CddU8OwyolvUr07Vu9MVnG3diFOPCI-f9oQZvCMKiW3Yx';

  // creating map markers
  const markers = locations.map(
    ({ title, location: position, category }, i) => {
      var image = "map-icons/bakery.svg";
      // Create a marker per location, and put into markers array.
      return {
        marker: new google.maps.Marker({
          title,
          position,
          category,
          map,
          animation: google.maps.Animation.DROP,
          icon: image,
          id: i
        }),
        title,
        category
      };
    }
  );

  // put markers on the map
  markers.forEach(({ marker, title, category }) => {
    marker.setMap(map);
    const infowindow = new google.maps.InfoWindow({
      content: title
    });
    infowindow.addListener(
      "closeclick",
      toggleBounceOnMarker(marker, true)
    );

    marker.addListener("click", event => {
      safeOpenInfoWindow(infowindow, marker)(event);
      toggleBounceOnMarker(marker)(event);
    });
  });
}
