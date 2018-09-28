var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

var apiKey = process.env.NEW_VAR;

var meetingsData = [];


//load addresses from week 2
var data = JSON.parse(fs.readFileSync('data-structures/assignment.2/finalAddress.json'));
console.log(data);

//var addresses = [];
addresses.push(data);
console.log(addresses);

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';

    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            //push data into array for Lat/Long Objects
            meetingsData.push(tamuGeo);
            streetAddress: tamuGeo["InputAddress"]["StreetAddress"],
          latLong: {
            latitude: tamuGeo.OutputGeocodes[0]["OutputGeocode"]["Latitude"],
            longitude: tamuGeo.OutputGeocodes[0]["OutputGeocode"]["Longitude"]
            console.log(tamuGeo['FeatureMatchingResultType']);
        }
    });



    setTimeout(callback, 2000); //change if you don't have 28 addresses, see below
  },
  function() {
    fs.writeFileSync('first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);

  }
);


// add more time to 2000 - 3000 = 3 seconds, 4000 = 4 seconds
