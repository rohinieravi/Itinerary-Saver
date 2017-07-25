

var getItineraryList = function(callback) {
	/*if(MOCK_ITINERARIES.itineraries.length === 0) {
		seedData();
	}
	setTimeout(function(){ callback(MOCK_ITINERARIES)}, 100);*/
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
	var list;
	itinList.forEach(function(item) {
		list += "<tr class='row'>"+

				"<td class='js-destination' ><a href='itinerarydetails.html?id="+item.id+"'>" + item.destination + "</a></td>" +
				"<td>" + item.poster + "</td>" +
				"<td>" + item.postedDate + "</td>"+
				"</tr>";
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
	$(".row").remove();
	getAndDisplayItineraries();
});

$(".js-search").submit(function(event) {
	event.preventDefault();
	$(".row").remove();
	var query = $(this).find('.js-input').val();
	getAndDisplayItinerariesByDest(query);
});



