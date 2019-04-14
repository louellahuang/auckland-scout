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
// Tim's work END

$(function(){

// Detect screen width and change zoom accordingly - by Nikita
	let zoom = 11;

	if ($(window).width() < 768) {
   		let zoom = 10;
   		console.log('less than 768');
   		createMap(zoom);
	}
	else {
	   let zoom = 11;
	   console.log('more than 768');
	   createMap(zoom);
	};
});

function createMap(z) {

  // identify the event target
jsCatDropdown.addEventListener('click', (e) => {
  identifyCategory(e.target);
});


// Map work by Nikita START
let center = [-36.8977931, 174.7854973];
let mymap = L.map('mapid').setView(center, z);

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


//Louella
modal();

  
};
