var MOCK_ITINERARIES = {
	"itineraries": [
		{
			"id":"1111",
			"destination": "Seattle",
			"postedBy": "Sally",
			"posterId": "11",
			"postedDate": 1470016976609
		},
		{
			"id":"2222",
			"destination": "San Francisco",
			"postedBy": "Wally",
			"posterId": "12",
			"postedDate": 1470016976609
		},
		{
			"id":"3333",
			"destination": "New York",
			"postedBy": "Jolly",
			"posterId": "13",
			"postedDate": 1470016976609
		},
		{
			"id":"4444",
			"destination": "Oregon",
			"postedBy": "Sally",
			"posterId": "11",
			"postedDate": 1470016976609
		}
	]
};
var MY_POSTER_ID = "11";
var getItineraryList = function(callback) {
	setTimeout(function(){ callback(MOCK_ITINERARIES)}, 100);
};

var getItineraryByDestination = function(query, callback) {
	var ItinByDest = {"itineraries":MOCK_ITINERARIES.itineraries.filter(function(item){
		return item.destination == query;
	})};
	setTimeout(function(){ callback(ItinByDest)}, 100);
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

var getAndDisplayItineraries = function() {
	getItineraryList(displayItineraries);
};

var getAndDisplayItierariesByDest = function(query) {
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
	getAndDisplayItierariesByDest(query);
})