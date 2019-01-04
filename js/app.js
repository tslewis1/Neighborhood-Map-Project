let ctx = {
  mapCenter: {
    lat: 37.228962,
    lng: -121.984667
  },
  map: null,
  locations: null
};

function mapReady() {
  ctx.map = initMap();
  if (ctx.locations) {
    placeMarkers(bakerize(ctx.locations), ctx.map);
  }
}

function locationsReady(locations) {
  ctx.locations = locations;
  ko.applyBindings({
    filter: filter(bakerize(locations)),
    bakeries: ko.observableArray(bakerize(locations))
  });
  if (ctx.map) {
    placeMarkers(bakerize(ctx.locations), ctx.map);
  }
}

function hideIcon(menuBars) {
  menuBars.classList.toggle("change");
}

$.get(
  "http://localhost:9000",
  {
    term: "bakery",
    latitude: ctx.mapCenter.lat,
    longitude: ctx.mapCenter.lng,
    distance: 2500
  },
  locationsReady
).fail(errorAlert => alert("Server Connection Broken"));
