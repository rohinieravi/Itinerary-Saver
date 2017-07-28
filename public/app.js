//API request to get all itineraries
var getItineraryList = function(callback) {
	var settings = {
		url: API_URL + '/itineraries',
		datatype: 'json',
		type: 'GET',
		success: callback
	};
	$.ajax(settings);
};

var getItineraryByDestination = function(destination, callback) {
	/*if(MOCK_ITINERARIES.itineraries.length === 0) {
		seedData();
	}
	var ItinByDest = {"itineraries":MOCK_ITINERARIES.itineraries.filter(function(item){
		return item.destination.toLowerCase() == query.toLowerCase().trim();
	})};
	setTimeout(function(){ callback(ItinByDest)}, 100);*/
	var settings = {
		url: API_URL + '/itineraries/search/'+ destination,
		datatype: 'json',
		type: 'GET',
		success: callback
	};
	$.ajax(settings);
};

var displayItineraries = function(data) {
	var itinType = $("input[name='itinerary']:checked").val();

	var itinList;
	
	if(itinType === "myitinerary") {
		itinList = data.filter(function(item) {
			return item.posterId === MY_POSTER_ID;
		});
	}
	else {
		itinList = data.filter(function(item) {
			return item.posterId !== MY_POSTER_ID;
		});
	}
	renderItineraryList(itinList);
};

var renderItineraryList = function(itinList) {
	var list='';
	itinList.forEach(function(item) {
		list += "<div class='row tRow'>"+
				"<div class='col-3 js-destination' ><a href='itinerarydetails.html?id="+item.id+"'>" + item.destination + "</a></div>" +
				"<div class='col-3'>" + item.poster + "</div>" +
				"<div class='col-3'>" + new Date(item.postedDate).toDateString() + "</div>"+
				"</div>";
	});
	$(".js-itinerarylist").append(list);
}


var getAndDisplayItineraries = function() {
	getItineraryList(displayItineraries);
};

var getAndDisplayItinerariesByDest = function(query) {
	getItineraryByDestination(query,displayItineraries);
};


$(function() {
	getAndDisplayItineraries();
	var queryString = window.location.search;
	queryString = queryString.substring(1);
	if(parseQueryString(queryString).newadded === "true"){
			$(".newadded").removeClass("hidden");
	}
});

$("input[name='itinerary']").click(function(event){
	$(".tRow").remove();
	getAndDisplayItineraries();
});

$(".js-search").submit(function(event) {
	event.preventDefault();
	$(".tRow").remove();
	var query = $(this).find('.js-input').val();
	getAndDisplayItinerariesByDest(query);
});



