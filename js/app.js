let ctx = {
  mobile_bp: window.matchMedia("(max-width: 600px)"),
  mapCenter: {
    lat: 37.228962,
    lng: -121.984667
  },
  vm: null,
  map: null,
  locations: null
};

function mapReady() {
  ctx.map = initMap();
  if (ctx.locations) {
    placeMarkers(ctx.locations, ctx.map);
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
    vm.filter.elemsVisible(mql.matches ? ["__", "S_"] : ["__", "B_"])
  );
  ctx.vm = vm;
  if (ctx.map) {
    placeMarkers(ctx.locations, ctx.map);
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
