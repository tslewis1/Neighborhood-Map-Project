const markerize = locations =>
  locations.map(({ name, coordinates: co, categories, ...rest }) => ({
    title: name,
    position: { lat: co.latitude, lng: co.longitude },
    category: categories,
    ...rest
  }));

const bakerize = locations =>
  //location is an object
  // locations is a list
  locations.map(({ name, categories, phone, address }) => {
    let valuesAsObservables = {
      phone,
      address,
      title: name, //display name
      category: categories, // for search
      visible: ko.observable(false)
    };
    valuesAsObservables.onclick = function() {
      valuesAsObservables.visible(!valuesAsObservables.visible());
    };
    return valuesAsObservables;
  });
