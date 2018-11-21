var locations = [
  {
    title: "Manresa Bread",
    location: { lat: 37.227059, lng: -121.981004 },
    category: ["bakery", "bread"]
  },
  {
    title: "Fleur De Cocoa",
    location: { lat: 37.223632, lng: -121.983657 },
    category: ["bakery", "cafe"]
  },
  {
    title: "Icing On The Cake",
    location: { lat: 37.222009, lng: -121.982357 },
    category: ["bakery", "cake"]
  },
  {
    title: "Mama's Bakery",
    location: { lat: 37.231465, lng: -121.980132 },
    category: ["bakery"]
  },
  {
    title: "Maple Leaf Donuts",
    location: { lat: 37.233336, lng: -121.978076 },
    category: ["bakery", "donuts"]
  },
  {
    title: "Nothing Bundt Cakes",
    location: { lat: 37.229968, lng: -121.981321 },
    category: ["bakery", "cake"],
  }
];

const bakeries = locations.map((location) => {
  const locKeys = Object.keys(location)
  return locKeys
    .map(k => ({ key: k, value: ko.observable(location[k]) }))
    .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {})
})

ko.applyBindings(bakeries)


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



