const bakerize = locations =>
  locations.map(location => {
    let valuesAsObservables = {
      name: location.name,
      streetAddress: location.address,
      phone: location.phone,
      rating: location.rating,

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
      position: {
        lat: location.coordinates.latitude,
        lng: location.coordinates.longitude
      }
    };
    return markerizeValues;
  });