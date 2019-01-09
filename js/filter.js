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

const zip = (t, v) => t.map((t, i) => [t, v[i]]);

const match = (s, pattern) => {
  const zipped = szip(s, pattern);
  return zipped.reduce(
    (prev, [c, pc]) => prev && (pc === "_" || c === "_" ? true : pc === c),
    true
  );
};
const szip = (s1, s2) => zip(s1.split(""), s2.split(""));
const overWrite = (s, change) =>
  szip(s, change)
    .map(([d, v]) => (d === "_" ? v : d))
    .join("");

const getValidTransitions = (state, change, graph) => {
  const options = graph[state].filter(next => {
    const matched = match(next, change);
    return matched;
  });
  return options;
};

const sum = vals => vals.reduce((summ, cur) => summ + cur, 0);

var filter = ({ mobile_bp, locations }) => {
  const graph = {
    BB: ["SS"],
    SS: ["BB", "SB"],
    SB: ["SS", "BB"]
  };

  const filterVM = {
    // Uses filter parameters to search for bakery locations that have been passed in
    onUpdate: function({ filter: { filterParams }, bakeries }) {
      let bakeryFilter = locationsFilter(searchForTitle)(
        filterParams(),
        locations
      );
      bakeries(bakeryFilter);

      return true;
    },
    filterParams: ko.observable("Search Me!"),
    state: ko.observable(mobile_bp.matches ? "SS" : "BB")
  };

  filterVM.elemsVisible = ko.computed({
    read: function() {
      return filterVM.state();
    },
    write: ([expectedState, update]) => {
      const currentState = filterVM.state();
      const matches = match(expectedState, currentState);
      if (!matches) return;
      const options = getValidTransitions(currentState, update, graph);
      const sizes = options.map(option => {
        const changes = szip(option, currentState).map(([c1, c2]) =>
          c1 === c2 ? 0 : 1
        );
        const distance = sum(changes);
        return distance;
      });
      const closestOptionIndex = sizes.reduce(
        ([lastDistance, _], currentDistance, currentI) =>
          lastDistance < currentDistance
            ? [lastDistance, index]
            : [currentDistance, currentI],
        [Infinity, -1]
      )[1];
      const next = options[closestOptionIndex];

      if (next) filterVM.state(next);
    }
  });

  return filterVM;
};
