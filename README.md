# Itinerary Saver

## Summary:
The Itinerary Saver is an app that helps to organize and save travel itineraries. Whether it be to look up a previous trip itinerary or to plan a trip in the future, this app helps to store the details of your trips for later reference. It also allows to share itineraries with others and also, view itineraries shared by others. This could help in trip planning as well.

## API Documentation:
The API for the Itinerary Saver provides the following methods:
* GET /itineraries
Success: Returns a JSON response containing an array of all the itineraries.
Failure: Returns status code 500 with error message and log.
* GET /itineraries/:id
Success: Returns a JSON response containing the itinerary with the specified id parameter.
Failure: Returns status code 500 with error message and log. 
* GET /itineraries/search/:destination
Success: Returns a JSON response containing an array of itineraries which match the specified destination parameter.
Failure: Returns status code 500 with error message and log. 
* POST /itineraries
Success: Creates a new itinerary by posting the JSON object passed in the request. The response will return status code 201 with a JSON object representing the new itinerary.
Failure: Returns status code 400 with error message if a required field is 
		 missing in request.
	  	 Returns status code 500 with error message if the post failed.



## Technology Used:
* HTML
* CSS
* JavaScript
* jQuery
* Node JS with Express
* Mocha, Chai and Chai HTTP
* Mongoose

