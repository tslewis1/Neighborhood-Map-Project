const bakerize = locations =>
  locations.map(location => {
    let valuesAsObservables = {
      name: "name",
      streetAddress: "location: { display_address }",
      phone: "phone: { display_phone }",
      rating: "rating",

      visible: ko.observable(false)
    };
    valuesAsObservables.onclick = function() {
      valuesAsObservables.visible(!valuesAsObservables.visible());
    };
    return valuesAsObservables;
  });
