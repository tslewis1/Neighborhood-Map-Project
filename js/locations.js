const bakerize = locations =>
  locations.map(location => {
    let valuesAsObservables = {
      name: location.name,
      streetAddress: location.address,
      phone: location.phone,
      rating: "Rating: " + location.rating,
      position: {
        lat: location.coordinates.latitude,
        lng: location.coordinates.longitude
      },

      visible: ko.observable(false)
    };
    valuesAsObservables.onclick = function() {
      valuesAsObservables.visible(!valuesAsObservables.visible());
    };
    return valuesAsObservables;
  });
