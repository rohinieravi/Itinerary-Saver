var MOCK_ITINERARIES ={
	"itineraries": []
};

const MY_POSTER_ID = "11";
const MY_POSTER_NAME = "Sally";
var ID = 0;

var seedData = function() {
	MOCK_ITINERARIES.itineraries.push({
		"id":"1111",
		"destination": "Seattle",
		"postedBy": "Sally",
		"posterId": "11",
		"postedDate": 1470016976609,
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
		"postedDate": 1470016976609,
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
		"postedDate": 1470016976609,
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
		"postedDate": 1470016976609,
		"days": "1",
		"pois": "beach",
		"transportDetails": "Air",
		"lodgeDetails": "airbnb",
		"dayWisePlan":"lorem ipsum",
		"budget":"100",
		"travelPartner": "yes",
		"tpDetails":"lorem ipsum"
	});
}

var getItineraryList = function(callback) {
	if(MOCK_ITINERARIES.itineraries.length === 0) {
		seedData();
	}
	setTimeout(function(){ callback(MOCK_ITINERARIES)}, 100);
};

var getItineraryByDestination = function(query, callback) {
	if(MOCK_ITINERARIES.itineraries.length === 0) {
		seedData();
	}
	var ItinByDest = {"itineraries":MOCK_ITINERARIES.itineraries.filter(function(item){
		return item.destination.toLowerCase() == query.toLowerCase().trim();
	})};
	setTimeout(function(){ callback(ItinByDest)}, 100);
};

var postItineraryDetails = function(item, callback) {
	MOCK_ITINERARIES.itineraries.push(item);
	setTimeout(function(){ callback(MOCK_ITINERARIES)}, 100);
};


var displayItineraries = function(data) {
	var itinType = $("input[name='itinerary']:checked").val();

	var itinList;
	
	if(itinType === "myitinerary") {
		itinList = data.itineraries.filter(function(item) {
			return item.posterId === MY_POSTER_ID;
		});
	}
	else {
		itinList = data.itineraries.filter(function(item) {
			return item.posterId !== MY_POSTER_ID;
		});
	}
	renderItineraryList(itinList);
};

var renderItineraryList = function(itinList) {
	var list;
	itinList.forEach(function(item) {
		list += "<tr class='row'>"+
				"<td>" + item.destination + "</td>" +
				"<td>" + item.postedBy + "</td>" +
				"<td>" + item.postedDate + "</td>"+
				"</tr>";
	});
	$(".js-itinerarylist").append(list);
}

var renderNewItineraryAdded = function(data) {
	window.location.reload(true);
    window.location.href = 'index.html';
	$(".newadded").removeClass("hidden");
};

var getAndDisplayItineraries = function() {
	getItineraryList(displayItineraries);
};

var getAndDisplayItinerariesByDest = function(query) {
	getItineraryByDestination(query,displayItineraries);
};


$(function() {
	getAndDisplayItineraries();
});

$("input[name='itinerary']").click(function(event){
	$(".row").remove();
	getAndDisplayItineraries();
});

$(".js-search").submit(function(event) {
	event.preventDefault();
	$(".row").remove();
	var query = $(this).find('.js-input').val();
	getAndDisplayItinerariesByDest(query);
});

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
})
