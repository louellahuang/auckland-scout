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
// Modal identifiers
var modalContentContainer = document.getElementById('modalContentContainer');
var modalContentFooter = document.getElementById('modalContentFooter');
const jsPopUpButton = document.getElementById('#modalCenter');
const jsModalLongTitle = document.getElementById('jsModalLongTitle');
const jsVenueImg = document.getElementById('jsVenueImg');
const jsVenueDescription = document.getElementById('jsVenueDescription');
const jsVenueWebsite = document.getElementById('jsVenueWebsite');
const jsMiniMap = document.getElementById('jsMiniMap');
const jsDirections = document.getElementById('jsDirections');
// this needs to be a global variable in order to access it from different functions
let mymap;
let zoom = 0;
// Tim's work END

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
  // Map work by Nikita END
}

function createMap(v) {

  // detect screen size
  let z = detectScreenWidth();

  // remove previously loaded map first
  if (mymap) {
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
      marker.bindPopup('<div>' + venue.name + '</div>' + '<button type="button" id="' + venue.id + '" class="btn btn-primary" data-toggle="modal" data-target="#modalCenter">' + 'Explore' + '</button>')

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
}

// Step 4 - Make the actual request
function fetchVenue(uri) {
  fetch(uri)
    .then(function (response) {
      // a. return response in json format
      return response.json();
    })
    .then(function (myJson) {
      // b. extract data from response and run this function
      venueDetails(myJson.response);
    })
    .catch(function (error) {
      // Code for handling errors
      console.log(error);
    });
}

function venueDetails(res) {
  window.fake = res;
  // Modal title
  const title = res.venue.name;
  // Venue description
  if (res.venue.description !== undefined) {
    var description = res.venue.description;
  } else {
    var description = 'This venue does not have a description';
  }
  //Construct modal image/
  if (res.venue.bestPhoto !== undefined) {
    var photoPrefix = res.venue.bestPhoto.prefix;
    var photoSuffix = res.venue.bestPhoto.suffix;
    var venueImage = photoPrefix + '720x720' + photoSuffix;
  } else {
    var venueImage = 'src/img/dog-3.jpg';
  }
  // Add website
  if (res.venue.shortUrl !== undefined) {
    var website = res.venue.shortUrl;
  }
  // Add address
  if (res.venue.location.address !== undefined) {
    var address = res.venue.location.address + ', ' + res.venue.location.city;
  } else {
    var address = 'This venue does not have an address';
  }


  // remove previously loaded map first
  // if (miniMap) {
  //   miniMap.remove();
  // }

  // Adding Mini Map
  // Insert Mini map with user location https://leafletjs.com/reference-1.0.0.html
  let venueLocation = [res.venue.location.lat, res.venue.location.lng];
  let miniMap = L.map('jsMiniMap', {
    scrollWheelZoom: false
  }).setView(venueLocation, 17);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibmlraXRhaG9pbmVzIiwiYSI6ImNqc203cHN5NDEwaGg0OXBpYnE0aXhhZmYifQ.58l8dUZg4uiFn7BYnZCJFA'
  }).addTo(miniMap);



  // Directions
  const directions = 'directions';

  createModalContent(title, venueImage, description, address, website, directions);
};

function createModalContent(title, venueImage, description, address, website, directions) {


  modalContentContainer.innerHTML = `
  <div class="modal-header">
    <h5 class="modal-title" id="jsModalLongTitle">${title}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <div class="venue-item">
      <img class="d-block w-100" id="jsVenueImg" src="${venueImage}" alt="modal-example">
    </div>
    <p id="jsVenueDescription">${description}</p>
    <p class="jsVenueAddress">${address}</p>
    <a class="pr-5" id="jsVenueWebsite" href="${website}" target="_blank">website link</a>
    <a href="${directions}" class="btn btn-primary" id="jsDirections" target="_blank">Get Directions</a>
  </div>
  `;

  // Now toggle the Modal
  $('#modalCenter').modal('show');

}