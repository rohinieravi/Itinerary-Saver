var ID = 0;

var postItineraryDetails = function(item, callback) {
	MOCK_ITINERARIES.itineraries.push(item);
	setTimeout(function(){ callback(MOCK_ITINERARIES)}, 100);
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
		id : ID +1,
		destination: $("#destination").val().trim(),
		days: $("#days").val(),
		pois: $("#pois").val(),
		transportDetails: $("#transport").val(),
		lodgeDetails: $("#lodgedetails").val(),
		dayWisePlan: $("#daywiseplan").val(),
		budget: $("#budget").val(),
		travelPartner: $("input[name='travelpartner']:checked").val(),
		tpDetails: $("#tpdetails").val(),
		postedBy: MY_POSTER_NAME,
		posterId: MY_POSTER_ID,
		postedDate: Date.now()
	};
	postItineraryDetails(newItin, renderNewItineraryAdded);
});
