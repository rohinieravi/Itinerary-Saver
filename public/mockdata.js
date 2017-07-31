const MY_POSTER_ID = 11;
const MY_POSTER_FNAME = "Sally";
const MY_POSTER_LNAME = "Sam";
var API_URL = "https://fast-savannah-13472.herokuapp.com";

//extracts query string values
var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
};