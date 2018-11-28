ko.applyBindings({
  filter: filter(locations),
  bakeries: ko.observableArray(bakerize(locations))
});
