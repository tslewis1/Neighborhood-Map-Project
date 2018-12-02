const apiKey = 'B55nUzn2sGNPGNgWRLih9hhH4yT64R4UHllXLdiuYEdPW3lEtriTSdQsOP1Ne-GB-QsCjjzAL-2HIBinde8CddU8OwyolvUr07Vu9MVnG3diFOPCI-f9oQZvCMKiW3Yx';

$.ajax({
  url:"https://api.yelp.com/v3/businesses/search",
  dataType: 'jsonp',
  headers: { Authorizatiion: 'Bearer $(apiKey)' },
  data: { term: "restaurant", latitude: 37.786882, longitude: -122.399972 },
  success: function(datra) {
    console.log(data)
  }
})

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
    category: ["bakery", "cake"]
  }
];

const locations2 = [
  {
    owner: "Nothing Bundt Cakes",
    location: { lat: 37.229968, lng: -121.981321 },
    category: ["bakery", "cake"]
  }
];

//TODO: make this into a function that accepts an argument so that it can be configured by app.js

const bakerize = locations =>
  locations.map(location => {
    let valuesAsObservables = Object.keys(location)
      .map(k => ({ key: k, value: ko.observable(location[k]) }))
      .reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
    valuesAsObservables.visible = ko.observable(false);
    valuesAsObservables.onclick = function() {
      valuesAsObservables.visible(!valuesAsObservables.visible());
    };
    return valuesAsObservables;
  });

// ko.applyBindings(bakeries)
