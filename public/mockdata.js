var MOCK_ITINERARIES = {
	"itineraries": []
};
const MY_POSTER_ID = 11;
const MY_POSTER_FNAME = "Sally";
const MY_POSTER_LNAME = "Sam";
var API_URL = "https://fast-savannah-13472.herokuapp.com";

var seedData = function() {
	MOCK_ITINERARIES.itineraries.push({
		"id":"1111",
		"destination": "Seattle",
		"postedBy": "Sally",
		"posterId": "11",
		"postedDate": Date.now(),
		"days": "1",
		"pois": "beach",
		"transportDetails": "Air",
		"lodgeDetails": "airbnb",
		"dayWisePlan":"lorem ipsum",
		"budget":"100",
		"travelPartner": "yes",
		"tpDetails":"lorem ipsum"
	});
	MOCK_ITINERARIES.itineraries.push({
		"id":"2222",
		"destination": "San Francisco",
		"postedBy": "Wally",
		"posterId": "12",
		"postedDate": Date.now(),
		"days": "1",
		"pois": "beach",
		"transportDetails": "Air",
		"lodgeDetails": "airbnb",
		"dayWisePlan":"lorem ipsum",
		"budget":"100",
		"travelPartner": "yes",
		"tpDetails":"lorem ipsum"
	});
	MOCK_ITINERARIES.itineraries.push({
		"id":"3333",
		"destination": "New York",
		"postedBy": "Jolly",
		"posterId": "13",
		"postedDate": Date.now(),
		"days": "1",
		"pois": "beach",
		"transportDetails": "Air",
		"lodgeDetails": "airbnb",
		"dayWisePlan":"lorem ipsum",
		"budget":"100",
		"travelPartner": "yes",
		"tpDetails":"lorem ipsum"
	});
	MOCK_ITINERARIES.itineraries.push({
		"id":"4444",
		"destination": "Oregon",
		"postedBy": "Sally",
		"posterId": "11",
		"postedDate": Date.now(),
		"days": "1",
		"pois": "beach",
		"transportDetails": "Air",
		"lodgeDetails": "airbnb",
		"dayWisePlan":"lorem ipsum",
		"budget":"100",
		"travelPartner": "yes",
		"tpDetails":"lorem ipsum"
	});
};

var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};