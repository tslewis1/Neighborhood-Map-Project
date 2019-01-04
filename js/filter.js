function titleSelector(obj) {
  return obj && obj.name;
}

function categorySelector(obj) {
  return obj && obj.category.join(",");
}

const searchForString = selector => (searchString, location) => {
  const selectedString = selector(location); // -> string
  const re = RegExp(`(${searchString})`, "g");
  const matched = re.test(selectedString);
  return matched ? location : null;
};

const searchForTitle = searchForString(titleSelector);
const searchForCategory = searchForString(categorySelector);

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

    onUpdate: function({ filter: { filterParams }, bakeries }) {
      let bakeryFilter = locationsFilter(searchForTitle)(
        filterParams(),
        locations
      );
      bakeries(bakeryFilter);
      console.log("this one is bound tho");

      return true;
    },
    filterParams: ko.observable("Search Me!")
  };
};
