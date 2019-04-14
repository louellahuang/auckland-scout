// Tim's work START
// Categories:
// Parks: 4bf58dd8d48988d163941735
// Beaches: 4bf58dd8d48988d1e2941735
// Pools: 4bf58dd8d48988d15e941735
// Scenic Lookout: 4bf58dd8d48988d165941735
// Skate Park: 4bf58dd8d48988d167941735


// Identifiers
// Every ID prefixed with 'js' is a DOM element
const jsCatDropdown = document.getElementById('jsCatDropdown');
const jsCatTrending = document.getElementById('jsCatTrending');
const jsCatParks = document.getElementById('jsCatParks');
const jsCatBeaches = document.getElementById('jsCatBeaches');
const jsCatLookouts = document.getElementById('jsCatLookouts');
// this needs to be a global variable in order to access it from different functions
let mymap;
let zoom = 0;
// Tim's work END

<<<<<<< HEAD
$(function(){
=======

// Louella's Work START - Modal pop up
const jsModalLongTitle = document.getElementById('jsModalLongTitle');
const jsVenueDescription = document.getElementById('jsVenueDescription');
const jsVenueWebsite = document.getElementById('jsVenueWebsite');
const jsMiniMap = document.getElementById('jsMiniMap');
// Louella's Work END - Modal pop up


document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready!");
>>>>>>> 5e2db60999559095a6630ffae1fee633a0f45560

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
  }
  else {
    let zoom = 11;
    console.log('screen size is less than 768px');
    return zoom;
  };
}


function createInitialMap() {

  // detect screen size
  let z = detectScreenWidth();

  // Map work by Nikita START
  let center = [-36.8977931, 174.7854973];
  mymap = L.map('mapid').setView(center, z);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGhhbHl4OTAiLCJhIjoiY2o2YjdrZHRlMWJmYjJybDd2cW1rYnVnNSJ9.j_DQLfixHfhioVjH6qmqkw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibmlraXRhaG9pbmVzIiwiYSI6ImNqc203cHN5NDEwaGg0OXBpYnE0aXhhZmYifQ.58l8dUZg4uiFn7BYnZCJFA'
  }).addTo(mymap);

  // radius
  L.circle(center, {
    radius: 21500,
    color: 'salmon',
    weight: 1,
    fill: true
  }).addTo(mymap);
}


function createMap(v) {

  // detect screen size
  let z = detectScreenWidth();

  // remove previously loaded map first
  if(mymap) {
    mymap.remove();
  }

  // Map work by Nikita START
  let center = [-36.8977931, 174.7854973];
   mymap = L.map('mapid').setView(center, z);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidGhhbHl4OTAiLCJhIjoiY2o2YjdrZHRlMWJmYjJybDd2cW1rYnVnNSJ9.j_DQLfixHfhioVjH6qmqkw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibmlraXRhaG9pbmVzIiwiYSI6ImNqc203cHN5NDEwaGg0OXBpYnE0aXhhZmYifQ.58l8dUZg4uiFn7BYnZCJFA'
  }).addTo(mymap);

  // radius
  L.circle(center, {
    radius: 21500,
    color: 'salmon',
    weight: 1,
    fill: true
  }).addTo(mymap);

  // nikita - putting markers on the map
  v.forEach(function (venue) {
    try {
      var serviceIcon = L.icon({
        iconUrl: '../build/img/pin.svg',
        iconSize: [72, 72],
        popupAnchor: [0, -36]
      });
      var marker = L.marker(venue.latlng, { icon: serviceIcon }).addTo(mymap);
      marker.bindPopup('<div>' + venue.name + '</div>')

    } catch (error) {
      console.log(error);
    }
  });

   //Louella
   modal();

}

