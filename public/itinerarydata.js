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
	var results = "<div class='row'>Destination: " + data.destination + "</div>" +
	"<div class='row'>Number of Days: " + data.days + "</div>" +
	"<div class='row'>Places of Interest: " + data.pois + "</div>" +
	"<div class='row'>Transportation Details: " + data.transportDetails + "</div>" +
	"<div class='row'>Lodging Details: " + data.lodgeDetails + "</div>" +
	"<div class='row'>Day Wise Plan: " + data.dayWisePlan + "</div>" +
	"<div class='row'>Budget: $" + data.budget + "</div>" +
	"<div class='row'>Travel Partner: " + data.travelPartner + "</div>" ;
	if(data.travelPartner === 'yes') {
		results += "<div class='row'>Travel Partner Details: " + data.tpDetails + "</div>" ;
	}
	$(".js-itinerarydetails").html(results);
};





$(function(){
		var queryString = window.location.search;

		queryString = queryString.substring(1);

		getItinDetailsById(parseQueryString(queryString).id,renderItineraryDetails);
});
