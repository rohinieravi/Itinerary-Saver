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

//API request to get itineraries based on destination
var getItineraryByDestination = function(destination, callback) {
	var settings = {
		url: API_URL + '/itineraries/search/'+ destination,
		datatype: 'json',
		type: 'GET',
		success: callback
	};
	$.ajax(settings);
};

//API callback that filters itineraries based on user
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

//Renders all filtered itineraries
var renderItineraryList = function(itinList) {
	var list='';
	var itinType = $("input[name='itinerary']:checked").val();

	if(itinList.length === 0) {
		list = "<div class ='row tRow'>No results found.</div>"
	}
	else {
		itinList.forEach(function(item) {
			list += "<div class='row tRow'>"+
					"<div class='col-12 js-destination' ><a href='itinerarydetails.html?id="+item.id+"'>" + item.destination + "</a>" ;
			if(itinType === "otheritinerary") {
				list += " by <b>" + item.poster + "</b>";
			}
			list +=	" posted on <i>" + new Date(item.postedDate).toDateString() + "</i></div>"+
					"</div>";
		});
	}
	$(".js-itinerarylist").append(list);
}

//gets itineraries from API and displays them
var getAndDisplayItineraries = function() {
	getItineraryList(displayItineraries);
};

//gets itineraries with specified destination and displays them
var getAndDisplayItinerariesByDest = function(query) {
	getItineraryByDestination(query,displayItineraries);
};

//Invokes getAndDisplayItineraries method on page load
$(function() {
	var queryString = window.location.search;
	queryString = queryString.substring(1);
	if(loggedin === false && parseQueryString(queryString).loggedin !== "true") {
		$(".demoUser").addClass("hidden");
	}
	else {
		getAndDisplayItineraries();
		$(".demolink").addClass("hidden");
		loggedin = true;
		if(parseQueryString(queryString).newadded === "true"){
			$(".newadded").removeClass("hidden");
		}
	}
});

$(".js-userlogin").submit(function(event) {
	event.preventDefault();
	var currUsername = $("#username").val();
	var currPassword = $("#password").val();
	if(currUsername == DEMO_USERNAME && currPassword == DEMO_PASSWORD) { 
		loggedin = true;
		lity.current().close();
		$(".demoUser").removeClass("hidden");
		$(".demolink").addClass("hidden");
		getAndDisplayItineraries();
	}
	else {
		$(".js-comments").removeClass("hidden");
	}

});

$(".logout").click(function(event) {
	loggedin = false;
	window.location.href = 'index.html';
});

$(".js-addItin").click(function(event) {
    window.location.href = 'add-itinerary.html';
});

//Event listener for the radio input to filter itinerary list
$("input[name='itinerary']").click(function(event) {
	$(".tRow").remove();
	getAndDisplayItineraries();
	$('.js-input').val("");

});

//Event listener for search form that generates itinerary list for specified destination
$(".js-search").submit(function(event) {
	event.preventDefault();
	$(".tRow").remove();
	var query = $(this).find('.js-input').val();
	getAndDisplayItinerariesByDest(query);
});



