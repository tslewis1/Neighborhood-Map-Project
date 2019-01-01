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
  const locFiltered = locations.filter(location => searchAlgorithm(searchParam, location));
  return locFiltered;
};

var filter = locations => {
  return {
    onUpdate: function({ filter: { filterParams }, bakeries }) {
      let bakeryFilter = (locationsFilter(searchForTitle)(filterParams(), locations));
      bakeries(bakeryFilter);
      console.log(bakeryFilter);
      return true;
    },
    filterParams: ko.observable("Search Me!")
  };
};