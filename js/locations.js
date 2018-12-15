
const bakerize = locations =>
  locations.map(location => {
    let valuesAsObservables = {
        name: '',
        streetAddress: '',
        phone: '',
        reviews: '',

        visible: ko.observable(false)
    };
    valuesAsObservables.onclick = function() {
      valuesAsObservables.visible(!valuesAsObservables.visible());
    };
    return valuesAsObservables;
  });

// ko.applyBindings(bakeries)
