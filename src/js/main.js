// Identifiers
// Every ID prefixed with 'js' is a DOM element
const jsCatParks = document.getElementById('jsCatParks');
const jsCatBeaches = document.getElementById('jsCatBeaches');
const jsCatPlaygrounds = document.getElementById('jsCatPlaygrounds');

// Louella's Work - Modal pop up
const jsModalLongTitle = document.getElementById('jsModalLongTitle');
const jsVenueDescription = document.getElementById('jsVenueDescription');
const jsVenueWebsite = document.getElementById('jsVenueWebsite');
const jsMiniMap = document.getElementById('jsMiniMap');


// Map work by Nikita
$(function(){

let center = [-36.8977931, 174.7854973];
let mymap = L.map('mapid').setView(center, 12);

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

// Map work ends

// Louella's Work - Modal pop up
$('#myModal').modal(options);
$('.carousel').carousel();


});

