function titleSelector(obj) {
  return obj && obj.title;
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
  return locations.filter(location => searchAlgorithm(searchParam, location));
};

var filter = locations => {
  return {
    onUpdate: function name({ filter: { filterParams }, bakeries }) {
      bakeries(bakerize(locationsFilter()(filterParams(), locations)));
      return true;
    },
    filterParams: ko.observable("stringly")
  };
};
