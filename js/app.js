// Define map center
let ctx = {
  mobile_bp: window.matchMedia("(max-width: 600px)"),
  mapCenter: {
    lat: 37.228962,
    lng: -121.984667
  },
  map: null,
  locations: null
};

// Load map from Google Maps API
function mapReady() {
  ctx.map = initMap();
  if (ctx.locations) {
    placeMarkers(ctx.locations, ctx.map);
    // Use map center to place markers when the locations have been "bakerized"
    placeMarkers(bakerize(ctx.locations), ctx.map);
  }
}

function locationsReady(locations) {
  ctx.locations = bakerize(locations);
  const vm = {
    filter: filter(ctx),
    bakeries: ko.observableArray(ctx.locations)
  };
  ko.applyBindings(vm);
  ctx.mobile_bp.addListener(mql =>
    vm.filter.elemsVisible(mql.matches ? "S_" : "B_")
  );

  if (ctx.map) {
    placeMarkers(ctx.locations, ctx.map);
  }
}

// Uses server to load locations within 2500m of the map center with a search term
$.get(
  "http://localhost:9000",
  {
    term: "bakery",
    latitude: ctx.mapCenter.lat,
    longitude: ctx.mapCenter.lng,
    distance: 2500
  },
  locationsReady
  // Error message that shows up if the server does not load properly
).fail(errorAlert => alert("Server Connection Broken"));
