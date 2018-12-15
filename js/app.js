ko.applyBindings({
  filter: filter(locations),
  bakeries: ko.observableArray(bakerize(locations)),
  locations: ko.observableArray(['loading'])
});

$.ajax({
  url: "http://localhost:9000",
  data: { term: "", latitude: 37.235808, longitude: -121.962375 }
});