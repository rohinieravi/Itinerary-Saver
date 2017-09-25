//API request to get the itinerary details for specified id
var getItinDetailsById = function(id,callback) {
	var settings = {
		url: API_URL + '/itineraries/'+id,
		datatype: 'json',
		type: 'GET',
		success: callback
	};
	$.ajax(settings);
};

//Callback method that displays the itinerary details for the selected id
var renderItineraryDetails = function(data) {
	var results = "<div class='row'><b>Destination:</b> " + data.destination + "</div>" +
	"<div class='row'><b>Number of Days:</b> " + data.days + "</div>" +
	"<div class='row'><b>Places of Interest:</b> " + data.pois + "</div>" +
	"<div class='row'><b>Transportation Details:</b> " + data.transportDetails + "</div>" +
	"<div class='row'><b>Lodging Details:</b> " + data.lodgeDetails + "</div>" +
	"<div class='row'><b>Day Wise Plan:</b> " + data.dayWisePlan + "</div>" +
	"<div class='row'><b>Budget:</b> $" + data.budget + "</div>" +
	"<div class='row'><b>Travel Partner:</b> " + data.travelPartner + "</div>" ;
	if(data.travelPartner === 'yes') {
		results += "<div class='row'><b>Travel Partner Details:</b> " + data.tpDetails + "</div>" ;
	}
	$(".js-itinerarydetails").html(results);
};

//Extracts id from query string on page load and invokes api request and callback
$(function(){
		var queryString = window.location.search;
		queryString = queryString.substring(1);
		getItinDetailsById(parseQueryString(queryString).id,renderItineraryDetails);
});

$(".js-back").click(function(event) {
    window.location.href = 'index.html?loggedin=true';
});