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

// Combines elements of two lists on their index
const zip = (t, v) => t.map((t, i) => [t, v[i]]);

// Compares strings, ignoring the underscore character
const match = (s, pattern) => {
  const zipped = szip(s, pattern);
  return zipped.reduce(
    (prev, [c, pc]) => prev && (pc === "_" || c === "_" ? true : pc === c),
    true
  );
};
// Zip for strings
const szip = (s1, s2) => zip(s1.split(""), s2.split(""));
// Applies a change to a string, ignoring underscore characters
const overWrite = (s, change) =>
  szip(s, change)
    .map(([d, v]) => (d === "_" ? v : d))
    .join("");

// Given a graph, a state and a change, returns all transitions or all next states from current state that match that change
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
    // Set of all states with their state transitions
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

  // ViewModel that uses graph
  filterVM.elemsVisible = ko.computed({
    read: function() {
      return filterVM.state();
    },
    write: ([expectedState, update]) => {
      const currentState = filterVM.state();
      const matches = match(expectedState, currentState);
      // If the expected state does't match the current state, don't do anything
      if (!matches) return;
      // Get the option with shortest edit distance from current state
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
