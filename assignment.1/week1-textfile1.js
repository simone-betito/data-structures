console.log("hello world")

// npm install request
// mkdir data

var request = require('request');
var fs = require('fs');

var zones = ["m01", "m02", "m03", "m04", "m05", "m06", "m07", "m08", "m09", "m10"];
var baseURL = "https://parsons.nyc/aa/"

//making HTTP requests
for  (let i = 0; i < zones.length; i++){
  request(baseURL + zones[i] + ".html", function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync("./Data/" + zones[i] + ".txt", body);
    }
    else {console.log("Request failed!")}
  });
  }
