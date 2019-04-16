// Step 2 - Link the html element to the foursquare category ID
function identifyCategory(e) {
  // declare variables
  let chosenRadius = '0';
  let chosenCategory = '0';
  // simple conditional to match the DOM element to the api ID
  if (e.id == 'jsCatParks') {
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
}


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
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      extractNeededData(myJson.response.venues);
      //console.log(myJson.response.venues);
    })
    .catch(function(error) {
      // Code for handling errors
      console.log(error);
    });
}


// Step 5 - Extract the data we are using from the json response
function extractNeededData(data) {
  console.log(data);

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

  createMap(venuesForMap);
}




  