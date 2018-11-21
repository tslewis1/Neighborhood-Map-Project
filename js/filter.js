
function titleSelector(obj) {
  return obj && obj.title
}

function categorySelector(obj) {
  return obj && obj.category.join(',')
}

const searchForString = (selector) => (searchString, location) => {
  const selectedString = selector(location) // -> string
  const re = RegExp(`(${searchString})`, 'g')
  const matched = re.test(selectedString)
  return (matched) ? location : null;
}

const searchForTitle = searchForString(titleSelector);

function locationsFilter(searchParam, locations, searchAlgorithm = searchForTitle) {
  return locations.filter((location) => (searchAlgorithm(searchParam, location)))
}


