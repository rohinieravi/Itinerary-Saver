var MOCK_ITINERARIES = {
	"itineraries": []
};
const MY_POSTER_ID = "11";
const MY_POSTER_NAME = "Sally";

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