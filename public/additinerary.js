

var postItineraryDetails = function(item, callback) {
	/*MOCK_ITINERARIES.itineraries.push(item);
	setTimeout(function(){ callback(MOCK_ITINERARIES)}, 100);*/
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

var renderNewItineraryAdded = function(data) {
	window.location.reload(true);
    window.location.href = 'index.html?newadded=true';
};

$("#choiceno").click(function(event) {
	$("#tpdetails").attr("disabled", true);
});

$("#choiceyes").click(function(event) {
	$("#tpdetails").attr("disabled", false);
});

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
		postedDate: new Date().toDateString()
	};
	postItineraryDetails(newItin, renderNewItineraryAdded);
});
