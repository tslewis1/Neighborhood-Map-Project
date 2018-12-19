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

const markerize = locations =>
  locations.map(location => {
    console.log(location); 
    let markerizeValues = {
      title: location.name,
      position: location.coordinates
    };
    return markerizeValues;
  });