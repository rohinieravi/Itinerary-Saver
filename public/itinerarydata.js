var getItinDetailsById = function(id,callback) {
	if(MOCK_ITINERARIES.itineraries.length === 0) {
		seedData();
	}
	var ItinById = MOCK_ITINERARIES.itineraries.filter(function(item){
		return item.id == id;
	});
	setTimeout(function() {
		callback(ItinById)
	},100);
};

var renderItineraryDetails = function(data) {
	var results = "<div>Destination: " + data[0].destination + "</div>" +
	"<div>Number of Days: " + data[0].days + "</div>" +
	"<div>Places of Interest: " + data[0].pois + "</div>" +
	"<div>Transportation Details: " + data[0].transportDetails + "</div>" +
	"<div>Lodging Details: " + data[0].lodgeDetails + "</div>" +
	"<div>Day Wise Plan: " + data[0].dayWisePlan + "</div>" +
	"<div>Budget: $" + data[0].budget + "</div>" +
	"<div>Travel Partner: " + data[0].travelPartner + "</div>" ;
	if(data[0].travelPartner === 'yes') {
		results += "<div>Travel Partner Details: " + data[0].tpDetails + "</div>" ;
	}
	$(".js-itinerarydetails").html(results);
};





$(function(){
		var queryString = window.location.search;

		queryString = queryString.substring(1);

		getItinDetailsById(parseQueryString(queryString).id,renderItineraryDetails);
});
