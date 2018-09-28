var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

var apiKey = process.env.NEW_VAR;

var meetingsData = [];


//load addresses from week 2
var addresses = JSON.parse(fs.readFileSync('finalAddress.json'));
//console.log(addresses);

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
            let geoAPI = {}
            geoAPI.street = tamuGeo.InputAddress.StreetAddress
            geoAPI.Latitude = tamuGeo.OutputGeocodes[0]["OutputGeocode"]["Latitude"]
            geoAPI.Longitude = tamuGeo.OutputGeocodes[0]["OutputGeocode"]["Longitude"]

            console.log(tamuGeo['FeatureMatchingResultType']);
            //push data into array for Lat/Long Objects
            //meetingsData.push(tamuGeo);
            meetingsData.push(geoAPI);

        }
    });

    setTimeout(callback, 2000);
  },
  function() {
    fs.writeFileSync('first.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);

  }
);


// add more time to 2000 - 3000 = 3 seconds, 4000 = 4 seconds
