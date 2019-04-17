
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
  const directions = 'http://www.google.com/maps/place/' + res.venue.location.lat + ',' + res.venue.location.lng;
  // Inject template with modal content
  createModalContent(title, venueImage, description, address, website, directions);
};

// Create Modal content
function createModalContent(title, venueImage, description, address, website, directions) {
  // empty modal if it has contents
  // if($('#modalCenter')) {
  //   $('#modalCenter').empty();
  // }


  // modal content template
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