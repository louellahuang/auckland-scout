// https://api.foursquare.com/v2/venues/search?v=20170901&client_id=Q5PQQNTJS4UGM10I1RWODUVC4XS2PBULBDYZKFLAFECJ4ZIM&client_secret=4TMTXMB4LL35O3GR1QXONNBAJ5OCGZUO5HLWAQQGSHHPZZV2&ll=-36.8786499,174.7602798&radius=6000&categoryId=4bf58dd8d48988d163941735

const jsCatDropdown = document.getElementById('jsCatDropdown');
// Listen to div containing the a elements and identify the target that's clicked on
jsCatDropdown.addEventListener('click', (e) => {
  identifyCategory(e.target);
});

// Link the html element to the foursquare category ID
function identifyCategory(e) {

  let chosenRadius = '0';
  let chosenCategory = '0';

  if (e.id == 'jsCatParks') {
    chosenRadius = '6000';
    chosenCategory = '4bf58dd8d48988d163941735';
    createSearchRequestURI(chosenRadius, chosenCategory);

  } else if (e.id == 'jsCatBeaches') {
    chosenRadius = '6000';
    chosenCategory = '4bf58dd8d48988d1e2941735';
    createSearchRequestURI(chosenRadius, chosenCategory);

  } else if (e.id == 'jsCatLookouts') {
    chosenRadius = '6000';
    chosenCategory = '4bf58dd8d48988d165941735';
    createSearchRequestURI(chosenRadius, chosenCategory);
  }

}

// createSearchRequestURI('6000', '4bf58dd8d48988d163941735');

function createSearchRequestURI(rad, cat) {
  const baseURI = 'https://api.foursquare.com/v2/venues/search?v=20170901';
  const client_id = '&client_id=' + 'Q5PQQNTJS4UGM10I1RWODUVC4XS2PBULBDYZKFLAFECJ4ZIM';
  const client_secret = '&client_secret=' + '4TMTXMB4LL35O3GR1QXONNBAJ5OCGZUO5HLWAQQGSHHPZZV2';
  const latlong = '&ll=' + '-36.8786499,174.7602798';
  // This value will be a variable
  const radius = '&radius=' + rad;
  // This value will be a variable
  const categoryId = '&categoryId=' + cat;

  // Put all the pieces together
  const requestURI = baseURI + client_id + client_secret + latlong + radius + categoryId;
  
  console.log(requestURI);
}

