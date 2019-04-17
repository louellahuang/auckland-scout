// - by Tim
// Step 1 - Is the event listener which identifies event.target. See main.js - by Tim
// Step 2 - Link the html element to the foursquare category ID - by Tim
function identifyCategory(e) {
  // declare variables
  let chosenRadius = '0';
  let chosenCategory = '0';
  // simple conditional to match the DOM element to the api ID
  if (e.id == 'jsCatTrending') {
    // chosenRadius = '6000';
    extractNeededData(trending.response.venues);

  } else if (e.id == 'jsCatParks') {
    chosenRadius = '2000';
    chosenCategory = '4bf58dd8d48988d163941735';
    createSearchRequestURI(chosenRadius, chosenCategory);

  } else if (e.id == 'jsCatBeaches') {
    chosenRadius = '2000';
    chosenCategory = '4bf58dd8d48988d1e2941735';
    createSearchRequestURI(chosenRadius, chosenCategory);

  } else if (e.id == 'jsCatLookouts') {
    chosenRadius = '2000';
    chosenCategory = '4bf58dd8d48988d165941735';
    createSearchRequestURI(chosenRadius, chosenCategory);
  }
  else if (e.id == 'jsCatTrending') {
    extractNeededData(trending.response.venues);
  }
}


// Step 3 - Create the search query request uri - by Tim
function createSearchRequestURI(rad, cat) {
  const baseURI = 'https://api.foursquare.com/v2/venues/search?v=20170901';

  const latlong = '&ll=' + currentUserLocStr;
  // This value will be a variable
  const radius = '&radius=' + rad;
  // This value will be a variable
  const categoryId = '&categoryId=' + cat;
  // Put all the pieces together
  // client_id and client_secret are variables located in auth.js
  const requestURI = baseURI + client_id + client_secret + latlong + radius + categoryId;
  // run next function
  makeSearchRequest(requestURI);
}


// Step 4 - Make the actual request - by Tim
function makeSearchRequest(uri) {
  fetch(uri)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      extractNeededData(myJson.response.venues);
      console.log(myJson.response);
    })
    .catch(function(error) {
      console.log(error);
    });
}


// Step 5 - Extract the data we are using from the json response - by Tim
function extractNeededData(data) {
<<<<<<< HEAD
  console.log(data);

=======
>>>>>>> c6f1b65f03a5443a42076af883d9e474725d9854
  // declare empty array
  const venuesForMap = [];
  // Loop through json response
  data.forEach(venue => {
    // Push the name, ID, and latlng into an array to use for the map
    venuesForMap.push({
      name: venue.name,
      id: venue.id,
      latlng: 
        [
          venue.location.lat,
          venue.location.lng
        ]
    });
  });
  // Create the map with the data gathered. Function located in main.js
  createMap(venuesForMap);
}