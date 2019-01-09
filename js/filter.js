function titleSelector(obj) {
  return obj && obj.name;
}

// Takes selector and searches for a string that matches the selector
// A search factory more or less
const searchForString = selector => (searchString, location) => {
  const selectedString = selector(location); // -> string
  const re = RegExp(`(${searchString})`, "g");
  const matched = re.test(selectedString);
  return matched ? location : null;
};

const searchForTitle = searchForString(titleSelector);

// Takes search parameters to filter locations
const locationsFilter = (searchAlgorithm = searchForTitle) => (
  searchParam,
  locations
) => {
  const locFiltered = locations.filter(location =>
    searchAlgorithm(searchParam, location)
  );
  return locFiltered;
};

var filter = locations => {
  return {
    elemsVisible: ko.observable(false),

    // Uses filter parameters to search for bakery locations that have been passed in
    onUpdate: function({ filter: { filterParams }, bakeries }) {
      let bakeryFilter = locationsFilter(searchForTitle)(
        filterParams(),
        locations
      );
      bakeries(bakeryFilter);

      return true;
    },
    filterParams: ko.observable("Search Me!")
  };
};
