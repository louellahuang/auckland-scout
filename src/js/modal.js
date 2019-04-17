// Work from Louella



// // Modal identifiers
// const jsPopUpButton = document.getElementById('#modalCenter');
// const jsModalLongTitle = document.getElementById('jsModalLongTitle');
// const jsVenueImg = document.getElementById('jsVenueImg');
// const jsVenueDescription = document.getElementById('jsVenueDescription');
// const jsVenueWebsite = document.getElementById('jsVenueWebsite');
// const jsMiniMap = document.getElementById('jsMiniMap');
// const jsDirections = document.getElementById('jsDirections');

// Load modal
// function modal() {
//     $('#modalCenter').on('shown.bs.modal', function () {
//         //Add venue details through API call
//         displayVenueDetails(venueUrl);
//     });
// }

// // Step 3 - Create the venue on click request url
// const version = '?v=20170901';
// const key = version + client_id + client_secret;
// const venueId = '59a45921351e3d43b07028b5';
// const baseURL = 'https://api.foursquare.com/v2/venues/';
// let venueUrl = baseURL + venueId + key;


// displayVenueDetails(venueUrl);
// // Step 4 - Make the actual request
// function displayVenueDetails(uri) {
//     fetch(uri)
//         .then(function (response) {
//             return response.json();
//             console.log(response.json);
//         })
//         .catch(function (error) {
//             // Code for handling errors
//             console.log(error);
//         });
// }


  // Insert Mini map with user location https://leafletjs.com/reference-1.0.0.html
  // remove previously loaded map first

  // if (miniMap) {
  //   miniMap.remove();
  // }
  // let userLocation = [-36.8977931, 174.7854973];
  // let miniMap = L.map('jsMiniMap', {
  //   scrollWheelZoom: false
  // }).setView(userLocation, 17);
  // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //   maxZoom: 18,
  //   id: 'mapbox.streets',
  //   accessToken: 'pk.eyJ1IjoibmlraXRhaG9pbmVzIiwiYSI6ImNqc203cHN5NDEwaGg0OXBpYnE0aXhhZmYifQ.58l8dUZg4uiFn7BYnZCJFA'
  // }).addTo(miniMap);



