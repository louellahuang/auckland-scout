//Work from Louella

// foursquare Oauth
const version = '?v=20170901';
const key = version + client_id + client_secret;

const venueId = '59a45921351e3d43b07028b5';
const venueUrl = 'https://api.foursquare.com/v2/venues/' + venueId;

// Load modal
function modal() {
    $('#modalCenter').on('shown.bs.modal', function () {
        //Add venue details through API call

        // Insert Mini map
        // https://leafletjs.com/reference-1.0.0.html
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

    });
}

// Ajax request to a specific venue

// On Click of each marker - make AJAX request for Markers Venue data
marker.on('click', function () {
    let venueUrl = 'https://api.foursquare.com/v2/venues/' + this.venueid + key;

    // ajax request for each venue data
    $.ajax({

        url: venueUrl,
        dataType: 'jsonp',

        success: function (res) {

            // Expose data of VENUE we just CLICKED
            console.log(res);

            $('.modal-title').text(res.response.venue.name);

            // Clear/reset modal body copy so it's empty, before we add new data
            $('.modal-body').empty();

            if (res.response.venue.description !== undefined) {
                $('.modal-body').append('<p class="description">' + res.response.venue.description + '</p>');
            }

            //Construct modal/
            if (res.response.venue.photos.groups.length > 0) {
                var photoPrefix = res.response.venue.bestPhoto.prefix;
                var photoSuffix = res.response.venue.bestPhoto.suffix;
                $('<img src=' + photoPrefix + '100x100' + photoSuffix + '>').appendTo('.modal-body');
            }

            $('.modal-body').append('<p class="likes"><span class="bold">Likes:</span> ' + res.response.venue.likes.count + '</p>');

            if (res.response.venue.contact.phone !== undefined) {
                $('.modal-body').append('<p class="phone"><span class="bold">Phone:</span> ' + res.response.venue.contact.phone + '</p>');
            }

            $('.modal-body').append('<p class="address">' + res.response.venue.location.address + ', ' + res.response.venue.location.city + '</p>');

            // Now toggle the Modal
            $('#myModal').modal('show');
        } // End Success

    }); // END AJAX request for venue data

}); // END marker click function



