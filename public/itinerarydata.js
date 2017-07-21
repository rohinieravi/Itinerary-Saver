var getItinDetailsById = function(id,callback) {
	/*if(MOCK_ITINERARIES.itineraries.length === 0) {
		seedData();
	}
	var ItinById = MOCK_ITINERARIES.itineraries.filter(function(item){
		return item.id == id;
	});
	setTimeout(function() {
		callback(ItinById)
	},100);*/
	var settings = {
		url: API_URL + '/itineraries/'+id,
		datatype: 'json',
		type: 'GET',
		success: callback
	};
	$.ajax(settings);
};

var renderItineraryDetails = function(data) {
	var results = "<div>Destination: " + data.destination + "</div>" +
	"<div>Number of Days: " + data.days + "</div>" +
	"<div>Places of Interest: " + data.pois + "</div>" +
	"<div>Transportation Details: " + data.transportDetails + "</div>" +
	"<div>Lodging Details: " + data.lodgeDetails + "</div>" +
	"<div>Day Wise Plan: " + data.dayWisePlan + "</div>" +
	"<div>Budget: $" + data.budget + "</div>" +
	"<div>Travel Partner: " + data.travelPartner + "</div>" ;
	if(data.travelPartner === 'yes') {
		results += "<div>Travel Partner Details: " + data.tpDetails + "</div>" ;
	}
	$(".js-itinerarydetails").html(results);
};





$(function(){
		var queryString = window.location.search;

		queryString = queryString.substring(1);

		getItinDetailsById(parseQueryString(queryString).id,renderItineraryDetails);
});
