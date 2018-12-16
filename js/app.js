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
    placeMarkers(ctx.locations, ctx.map);
  }
}

function locationsReady(locations) {
  ctx.locations = locations;
  // ko.applyBindings({
  //   filter: filter(locations),
  //   bakeries: ko.observableArray(bakerize(locations))
  // });
  if (ctx.map) {
    placeMarkers(markerize(ctx.locations), ctx.map);
  }
}

$.get(
  "http://localhost:9000",
  { term: "bakery", latitude: 37.786882, longitude: -122.399972 },
  locationsReady
);

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
