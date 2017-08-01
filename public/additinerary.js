//API call to post the new itinerary details
var postItineraryDetails = function(item, callback) {
	var settings = {
		url: API_URL + '/itineraries',
		data: JSON.stringify(item),
		datatype: 'json',
		type: 'POST',
		contentType: 'application/json',
		success: callback
	};
	$.ajax(settings);
};

//callback method that confirms that the new itinerary was added
var renderNewItineraryAdded = function(data) {
	window.location.reload(true);
    window.location.href = 'index.html?newadded=true';
};

$(".js-cancel").click(function(event) {
    window.location.href = 'index.html#itineraries';
});

//Event listener for travel partner 'no' radio input 
$("#choiceno").click(function(event) {
	$("#tpdetails").attr("disabled", true);
});

//Event listener for travel partner 'yes' radio input 
$("#choiceyes").click(function(event) {
	$("#tpdetails").attr("disabled", false);
});

//Event listener for the new itinerary details form submission
$(".js-itinDetails").submit(function(event) {
	event.preventDefault();
	var newItin = {
		destination: $("#destination").val().trim(),
		days: $("#days").val(),
		pois: $("#pois").val(),
		transportDetails: $("#transport").val(),
		lodgeDetails: $("#lodgedetails").val(),
		dayWisePlan: $("#daywiseplan").val(),
		budget: $("#budget").val(),
		travelPartner: $("input[name='travelpartner']:checked").val(),
		tpDetails: $("#tpdetails").val(),
		poster: {
		firstName: MY_POSTER_FNAME,
		lastName: MY_POSTER_LNAME,
		id: MY_POSTER_ID,
		},
		postedDate: new Date()
	};
	postItineraryDetails(newItin, renderNewItineraryAdded);
});
