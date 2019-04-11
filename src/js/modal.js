//Work from Louella

// foursquare Oauth
// const version = '?v=20170901';
// const clientid = '&client_id=JSBCLUKSAG3BD0D1BOIRNAEMKWTQY0P401LJCYETQQXBS3W0';
// const clientSecret = '&client_secret=HSRPRSP1SQJWTG3NN2EOBPCASHO52SBOU4ZPFXOJPZYIL3DK';
// const key = version + clientid + clientSecret;

// const venueId = '59a45921351e3d43b07028b5';
// const venueUrl = 'https://api.foursquare.com/v2/venues/' + venueId;


// Load modal
function modal() {
    $('#modalCenter').on('shown.bs.modal', function () {
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

// Load Carousel
$('.carousel').carousel();


// Ajax request to a specific venue
// let venueUrl = 'https://api.foursquare.com/v2/venues/explore' + key + '&ll=-36.8446152873055 , 174.76662397384644' + '&radius=60';
// $.ajax({

// 	url: venueUrl,
// 	dataType: 'jsonp',

// 	// let's show a little preloader to the user while they wait for a nice User Experience
// 	beforeSend: function(res) {
// 		$('<div class="pre-loader"> ... loading portfolio ... </div>').prependTo('body');
// 	},

// 	// when the ajax request is complete do all of these things
// 	success: function(res) {

// 		console.log(res);

// 		// Success! We can get rid of the preloader now...
// 		$('.pre-loader').detach();


// 	},

// 	// if the ajax request fails do these things as a fallback
// 	error: function(res) {
// 		$('<h1> Error!! </h1>').appendTo('body');
// 	}

// }); // END ajax request
