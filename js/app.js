// ko.applyBindings({
//   filter: filter(locations),
//   bakeries: ko.observableArray(bakerize(locations))
// });

function bakeriesModel() {
  this.hydrate = function(args) {
    $.get({
      url: "http://localhost:9000",
      data: { term: "bakeries", latitude: 37.235808, longitude: -121.962375 },
      success: function(data) {
        this.bakeries(bakerize(data));
        this.filter(data);
        console.log(data);
      }
    });
  };
  this.filter = filter;
  this.bakeries = ko.observableArray();

  this.hydrate();
}

ko.applyBindings(new bakeriesModel());
