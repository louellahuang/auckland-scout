// Work from Louella

const version = '?v=20170901';
const key = version + client_id + client_secret;
const venueId = '59a45921351e3d43b07028b5';
const venueUrl = 'https://api.foursquare.com/v2/venues/' + venueId;

// Modal identifiers
const jsPopUpButton = document.getElementById('#modalCenter');
const jsModalLongTitle = document.getElementById('jsModalLongTitle');
const jsVenueImg = document.getElementById('jsVenueImg');
const jsVenueDescription = document.getElementById('jsVenueDescription');
const jsVenueWebsite = document.getElementById('jsVenueWebsite');
const jsMiniMap = document.getElementById('jsMiniMap');
const jsDirections = document.getElementById('jsDirections');

// Load modal
function modal() {
    $('#modalCenter').on('shown.bs.modal', function () {
        //Add venue details through API call
        showVenueDetails();
    });
}

const baseURL = 'https://api.foursquare.com/v2/venues/';
let venueUrl = baseURL + this.venueid + key;

// Step 3 - Create the search query request uri
function createSearchRequestURI(rad, cat) {
    const baseURI = 'https://api.foursquare.com/v2/venues/search?v=20170901';
    // const client_id = '&client_id=' + 'Q5PQQNTJS4UGM10I1RWODUVC4XS2PBULBDYZKFLAFECJ4ZIM';
    // const client_secret = '&client_secret=' + '4TMTXMB4LL35O3GR1QXONNBAJ5OCGZUO5HLWAQQGSHHPZZV2';
    const latlong = '&ll=' + '-36.8786499,174.7602798';
    // This value will be a variable
    const radius = '&radius=' + rad;
    // This value will be a variable
    const categoryId = '&categoryId=' + cat;
    // Put all the pieces together
    const requestURI = baseURI + client_id + client_secret + latlong + radius + categoryId;

    makeSearchRequest(requestURI);
}






// Step 4 - Make the actual request
function makeSearchRequest(uri) {
    fetch(uri)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            extractNeededData(myJson.response.venues);
            //console.log(myJson.response.venues);
        })
        .catch(function (error) {
            // Code for handling errors
            console.log(error);
        });
}







function showVenueDetails(venueUrl) {


    // Request for each venue data

    $.ajax({

        url: venueUrl,
        dataType: 'jsonp',

        success: function (res) {

            // Expose data of VENUE we just CLICKED
            console.log(res);

            //For Each Venue

            // Modal title
            jsModalLongTitle.innerHTML(res.response.venue.name);

            // Clear/reset modal body copy so it's empty, before we add new data
            $('.modal-body').empty();
            $('.modal-footer').empty();

            // Venue description
            if (res.response.venue.description !== undefined) {
                jsVenueDescription.innerHTML(res.response.venue.description);
            }

            //Construct modal image/
            if (res.response.venue.photos.groups.length > 0) {
                var photoPrefix = res.response.venue.bestPhoto.prefix;
                var photoSuffix = res.response.venue.bestPhoto.suffix;
                jsVenueImg.src(photoPrefix + '100x100' + photoSuffix);
            }

            // Add Phone
            if (res.response.venue.contact.phone !== undefined) {
                $('.modal-body').append('<p class="phone"><span class="bold">Phone:</span> ' + res.response.venue.contact.phone + '</p>');
            }

            // Add address
            if (res.response.venue.location.address !== undefined) {
                jsVenueWebsite.innerHTML(res.response.venue.location.address + ', ' + res.response.venue.location.city)
            }

            // Insert Mini map with user location https://leafletjs.com/reference-1.0.0.html
            // remove previously loaded map first
            if (miniMap) {
                miniMap.remove();
            }
            let userLocation = [-36.8977931, 174.7854973];
            let miniMap = L.map('jsMiniMap', {
                scrollWheelZoom: false
            }).setView(userLocation, 17);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibmlraXRhaG9pbmVzIiwiYSI6ImNqc203cHN5NDEwaGg0OXBpYnE0aXhhZmYifQ.58l8dUZg4uiFn7BYnZCJFA'
            }).addTo(miniMap);

            // Now toggle the Modal
            $('#myModal').modal('show');

        } // End Success

    }); // END AJAX request for venue data
}

