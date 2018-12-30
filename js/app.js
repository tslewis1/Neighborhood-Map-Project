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

$.get(
  "http://localhost:9000",
  { term: "bakery", latitude: ctx.mapCenter.lat, longitude: ctx.mapCenter.lng },
  locationsReady
).fail(errorAlert => alert("Server Connection Broken"));

// function bakeriesModel() {
//   const self = this;
//   this.filter = filter;
//   this.bakeries = ko.observableArray(["loading"]);
//   this.hydrate = function(args) {
//     return this;
//   };
// }
// const vm = new bakeriesModel();
// vm2 = vm.hydrate();
// ko.applyBindings(vm2);
