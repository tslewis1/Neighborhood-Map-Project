// Initialize new map
function initMap() {
  var map;
  var bouncingMarker = null;
  const toggleBounceOnMarker = (
    marker,
    infowindow,
    forceClose = false
  ) => event => {
    const clickedSameMarker = bouncingMarker && bouncingMarker.id === marker.id;
    if (forceClose) {
      bouncingMarker && bouncingMarker.setAnimation(null);
      bouncingMarker = null;
      return;
    }
    if (clickedSameMarker) {
      infowindow && infowindow.close();
      bouncingMarker.setAnimation(null);
      bouncingMarker = null;
    } else {
      bouncingMarker && bouncingMarker.setAnimation(null);
      bouncingMarker = marker;
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    console.log(event);
  };
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

  var input = document.getElementById("filter-locations-box");
  var searchBox = new google.maps.places.SearchBox(input, {
    bounds: defaultBounds
  });

  // autocomplete = new google.maps.places.Autocomplete(input, options);

  // Foursquare Client ID and Secret
  // var clientId = '0K2AW0JW2DVNI2H4VTSQNT0O4IN0WARG2B5GQQMUHSP5WR2J',
  // var clientSecret = 'RUZEIQTPWI2DGI04FBLNZ5SVBBCZFSGRXGOGEP0LGN4HLPKQ';

  // These are the bakery places that will be shown to the user
  var locations = [
    {
      title: "Manresa Bread",
      location: { lat: 37.227059, lng: -121.981004 },
      category: ["bakery", "bread"]
    },
    {
      title: "Fleur De Cocoa",
      location: { lat: 37.223632, lng: -121.983657 },
      category: ["bakery", "cafe"]
    },
    {
      title: "Icing On The Cake",
      location: { lat: 37.222009, lng: -121.982357 },
      category: ["bakery", "cake"]
    },
    {
      title: "Mama's Bakery",
      location: { lat: 37.231465, lng: -121.980132 },
      category: ["bakery"]
    },
    {
      title: "Maple Leaf Donuts",
      location: { lat: 37.233336, lng: -121.978076 },
      category: ["bakery", "donuts"]
    },
    {
      title: "Nothing Bundt Cakes",
      location: { lat: 37.229968, lng: -121.981321 },
      category: ["bakery", "cake"]
    }
  ];

  // creating map markers
  const markers = locations.map(({ location, title, category }, i) => {
    var position = location;
    var title = title;
    var image = "map-icons/bakery.svg";
    category = category;
    // Create a marker per location, and put into markers array.
    return {
      marker: new google.maps.Marker({
        position,
        map,
        title,
        animation: google.maps.Animation.DROP,
        icon: image,
        category,
        id: i
      }),
      title,
      category
    };
  });

  // put markers on the map
  markers.forEach(({ marker, title, category }) => {
    marker.setMap(map);
    const infowindow = new google.maps.InfoWindow({
      content: title
    });
    infowindow.addListener(
      "closeclick",
      toggleBounceOnMarker(marker, infowindow, true)
    );

    marker.addListener("click", event => {
      toggleBounceOnMarker(marker, infowindow)();
      infowindow.open(map, marker);
    });
  });

  // If the clicked marker equals the bouncing marker, the bouncing should stop.
  // When the clicked marker does not equal the bouncing marker, the clicked marker should bounce
  // and the first bouncing marker should stop bouncing.
  // Markers are bouncing, yay!
  // if (bouncingMarker === marker) {
  //   bouncingMarker.setAnimation(null);
  //   bouncingMarker = null;
  //   infowindow.close();
  // } else {
  //   marker.setAnimation(google.maps.Animation.BOUNCE);
  //   if (bouncingMarker) {
  //     bouncingMarker.setAnimation(null);
  //   }
  //   bouncingMarker = marker;
  // }
}
