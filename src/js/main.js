// Identifiers - by Tim
// Every ID prefixed with 'js' is a DOM element
const jsCatDropdown = document.getElementById('jsCatDropdown');
const jsCatTrending = document.getElementById('jsCatTrending');
const jsCatParks = document.getElementById('jsCatParks');
const jsCatBeaches = document.getElementById('jsCatBeaches');
const jsCatLookouts = document.getElementById('jsCatLookouts');
// These need to be global variables in order to access them from different functions
let currentUserLoc = [-36.8977931, 174.7854973];
let currentUserLocStr = '';
let mymap;
let zoom = 0;


// Wait for dom to be fully loaded, then add event listeners and initialise map - Tim
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready!");
  // identify the event target
  jsCatDropdown.addEventListener('click', (e) => {
    identifyCategory(e.target);
  });
  // Load the empty map on page load
  createInitialMap();

});


// Detect screen width and change zoom accordingly - by Nikita
function detectScreenWidth() {
  if ($(window).width() < 768) {
    let zoom = 10;
    console.log('screen size is less than 768px');
    return zoom;
  } else {
    let zoom = 11;
    console.log('screen size is less than 768px');
    return zoom;
  };
}


// This is the map that gets loaded om page load
function createInitialMap() {
  // detect screen size
  let z = detectScreenWidth();
  // Map work by Nikita
  let center = [-36.8977931, 174.7854973];
  mymap = L.map('mapid').setView(center, z);
  // create actual map
  createMapPart(center);
  // run the function to detect users location
  mymap.locate({setView: true, maxZoom: 16});
  // plot marker on the map for users location
  mymap.on('locationfound', onLocationFound);
}


// This is the map that gets loaded after user has selected a category
function createMap(v) {
  // detect screen size
  let z = detectScreenWidth();
  // remove previously loaded map first
  if (mymap) {
    mymap.remove();
  }
  // Map work by Nikita
  let center = currentUserLoc;
  mymap = L.map('mapid').setView(center, z);
  // create actual map
  createMapPart(center);
  // run the function to detect users location
  mymap.locate({setView: true, maxZoom: z});
  // plot marker on the map for users location
  mymap.on('locationfound', onLocationFound);
  // nikita - putting markers on the map
  v.forEach(function (venue) {
    try {
      var serviceIcon = L.icon({
        iconUrl: '../build/img/pin.svg',
        iconSize: [72, 72],
        popupAnchor: [0, -36]
      });
      var marker = L.marker(venue.latlng, { icon: serviceIcon }).addTo(mymap);
      marker.bindPopup('<div>' + venue.name + '</div>' + '<button type="button" id="'+ venue.id +'" class="btn btn-primary popupButton" data-toggle="modal" data-target="#modalCenter">' + 'Explore' + '</button>')

      //louella - target pop up button to populate details
      const version = '?v=20170901';
      const key = version + client_id + client_secret;
      const venueId = venue.id;
      const baseURL = 'https://api.foursquare.com/v2/venues/';
      let venueUrl = baseURL + venueId + key;

      marker.on('popupopen', () => {
        // pop up button
        const jsPopUpButton = document.getElementById(venue.id);
        // click function
        jsPopUpButton.addEventListener('click', (e) => {
          console.log(e.target);
          //Add venue details through API call
          fetchVenue(venueUrl);
        });
      })

    } catch (error) {
      console.log(error);
    }
  });
   // Louella
   modal();
}


// This is the logic that creates the map. Since we have two similar functions I put this part in a separate function to keep it DRY - Tim
function createMapPart(center) {
  // Tiles
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGhhbHl4OTAiLCJhIjoiY2o2YjdrZHRlMWJmYjJybDd2cW1rYnVnNSJ9.j_DQLfixHfhioVjH6qmqkw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibmlraXRhaG9pbmVzIiwiYSI6ImNqc203cHN5NDEwaGg0OXBpYnE0aXhhZmYifQ.58l8dUZg4uiFn7BYnZCJFA'
  }).addTo(mymap);
  // Radius
  L.circle(center, {
      radius: 21500,
      color: 'salmon',
      weight: 1,
      fill: true
    }).addTo(mymap);
}


// this function detects users location - by Tim
function onLocationFound(e) {
  var radius = e.accuracy / 2;
  // add marker to map
  L.marker(e.latlng).addTo(mymap)
    // open popup with a message
    .bindPopup("You are within " + radius + " meters from this point").openPopup();
  // add circle around marker
  L.circle(e.latlng, radius).addTo(mymap);
  // set global variables
  currentUserLoc = [e.latlng.lat, e.latlng.lng]
  currentUserLocStr = currentUserLoc.toString();
}