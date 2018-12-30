// Initialize new map

var bouncingMarker = null;
let openInfo = null;

const mapFunctions = {
  toggleBounceOnMarker: (marker, forceClose = false) => event => {
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
  },
  safeOpenInfoWindow: (infoWindow, marker) => event => {
    openInfo && openInfo.close();
    openInfo = infoWindow;
    infoWindow.open(map, marker);
  }
};

function initMap() {
  console.log("map initiallized");

  // Create a new map
  return new google.maps.Map(document.getElementById("map"), {
    center: ctx.mapCenter,
    zoom: 15,
    streetViewControl: false
  });
}


function placeMarkers(locations, map) {
  const markers = locations.map((location, i) => {
    var image = "map-icons/bakery.svg";
    // Create a marker per location, and put into markers array.
    return {
      marker: new google.maps.Marker({
        title: location.name,
        position: location.position,
        map,
        animation: google.maps.Animation.DROP,
        icon: image,
        id: i
      }),
      location
    };
  });
  // put markers on the map
  markers.forEach((superMarker) => {
    const {name, streetAddress, phone, rating} = superMarker.location;
    const marker = superMarker.marker;
    marker.setMap(map);
    const contentInfo = [name, streetAddress, phone, rating].map(el => `<p class = "infoWindow">${el}</p>`).join("\n");
    const infowindow = new google.maps.InfoWindow({
      content: contentInfo
    });
    infowindow.addListener(
      "closeclick",
      mapFunctions.toggleBounceOnMarker(marker, true)
    );

    marker.addListener("click", event => {
      mapFunctions.safeOpenInfoWindow(infowindow, marker)(event);
      mapFunctions.toggleBounceOnMarker(marker)(event);
    });
  });
}
