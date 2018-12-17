
var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');
const moment = require('moment-timezone'); // moment-timezone --save

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'betis855';
db_credentials.host = "msdvdatastruc.cclilxizzkkf.us-east-1.rds.amazonaws.com";
db_credentials.database = 'msdvDataStruc';
db_credentials.password = process.env.AWS_KEY;
db_credentials.port = 5432;

// respond to requests for /sensor
app.get('/sensor', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
             AVG(sensorValue::int) as num_obs
             FROM sensorData
             GROUP BY sensorday
             ORDER BY sensorday;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('1) responded to request for sensor data');
        }
    });
});

var s1x = `<!DOCTYPE html>
<!-- Adapted from: http://bl.ocks.org/Caged/6476579 -->
<head>
  <meta charset="utf-8">
  <title>Sensor</title>
  <link rel="stylesheet" href="css/sensorstyle.css">
</head>

<body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js"></script>
<script>
var data = `;

var s2x = `;
console.log(data);
var margin = {top: 40, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
// var formatPercent = d3.format(".0%");
const numFormatF = d3.format(".2f")
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    // .tickFormat(formatPercent);


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Average Temperature:</strong> <span style='color:red'>" + numFormatF(d.avg_temp) + "</span>";
  })
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
svg.call(tip);



  x.domain(data.map(function(d) { return d.sensorhour; }));
  y.domain([0, d3.max(data, function(d) { return d.avg_temp; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Average Temperature");

      var sum = d3.sum(data, function(d) { return d.avg_temp; });
    var average = sum/data.length;

    var line = d3.svg.line()
        .x(function(d, i) { return x(d.sensorhour) + i; })
        .y(function(d, i) { return y(average); });

    svg.append("path")
        .datum(data)
        .attr("class", "mean")
        .attr("d", line);



  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.sensorhour); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.avg_temp); })
      .attr("height", function(d) { return height - y(d.avg_temp); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);


</script>`;

app.get('/ss', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(HOUR FROM sensorTime) as sensorhour,
             AVG(sensorValue::float) as avg_temp
             FROM sensorTableFinal
             GROUP BY sensorhour
             ORDER BY sensorhour;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            var resp = s1x + JSON.stringify(qres.rows) + s2x;
            res.send(resp);
            client.end();
            console.log('1) responded to request for sensor graph');
        }
    });
});

// respond to requests for /aameetings
app.get('/aameetings', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var thisQuery = `SELECT newAddress, title as location, json_agg(json_build_object('day', day, 'st', starttime, 'et', endtime, 'latitude', lat, 'longitude', long, 'type', meetingtype, 'details', details )) as meetings FROM aalocations1 WHERE day = 'Saturdays' OR day = 'Sundays' GROUP BY newAddress, title ;`;var thisQuery = `SELECT newAddress, title as location, json_agg(json_build_object('day', day, 'st', starttime, 'et', endtime, 'latitude', lat, 'longitude', long, 'type', meetingtype, 'details', details )) as meetings FROM msdvdatastruc WHERE day = 'Saturdays' OR day = 'Sundays' GROUP BY newAddress, title ;`;

    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

var oneDD = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>A Month In Inspiration</title>
  <link rel="shortcut icon" type="image/png" href="assets/dd.png" />

  <meta name="description" content="Simone's Dear Diary Entries">
  <meta name="author" content="DD">
  <link rel="stylesheet" href="css/DDstyles.css">
  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,600" rel="stylesheet">
</head>
<body>
<div class="container">
    <h2 class="title">A Month In Inspiration</h2>
    <div class="main">
        <div class="sidebar">
            <p>By: <strong>Simone Betito</strong></p>
            <hr align="right">
            <ul>
                <form action="/action_page.php">
                    <li> <label for="1">Art</label> <input type="radio" id="1" name="topic" value="Art" onClick=updateQuery(value)></li>
                    <li><label for="2">Architecture</label> <input type="radio" id="2" name="topic" value="Architecture" onClick=updateQuery(value)></li>
                    <li><label for="3">Food</label> <input type="radio" id="3" name="topic" value="Food" onClick=updateQuery(value)></li>
                    <li><label for="4">Comedy</label> <input type="radio" id="4" name="topic" value="Comedy" onClick=updateQuery(value)></li>
                    <li><label for="5">Fitness</label> <input type="radio" id="5" name="topic" value="Fitness" onClick=updateQuery(value)></li>
                    <li><label for="6">Music</label> <input type="radio" id="6" name="topic" value="Music" onClick=updateQuery(value)></li>
                    <li><label for="7">Film</label> <input type="radio" id="7" name="topic" value="Film" onClick=updateQuery(value)></li>
                    <li><label for="8">Literature</label> <input type="radio" id="8" name="topic" value="Literature" onClick=updateQuery(value)></li>
                    <li><label for="9">Clothing</label> <input type="radio" id="9" name="topic" value="Clothing" onClick=updateQuery(value)></li>
                    <li><label for="10">All Topics</label> <input type="radio" id="10" name="topic" value="" checked="checked" onClick=updateQuery(value)></li>
                </form>
            </ul>
        </div>
        <div class="posts">
        </div>
    </div>
</div>
  <script>

  var data =
  `;

var twoDD = `;

// sort entries by date on front end
// function compare(a,b) {
//     if (a.date.S > b.date.S)
//     return -1;
//     if (a.date.S < b.date.S)
//     return 1;
//     return 0;
// }
// data = data.sort(compare);
console.log(data);

    var currentValue = 0;
    var filteredData;

    const posts = document.querySelector(".posts");

    function displayPosts() {
        reset();
        for(var x = 0; x < filteredData.length; x++){
        let article = posts.appendChild(document.createElement("article"));

        let title = article.appendChild(document.createElement("h3"));
        title.innerHTML = \`<span class="topic">\${filteredData[x].type.S}</span>\`;

        // let postDate = article.appendChild(document.createElement("h5"));
        // postDate.className="date";
        // postDate.innerHTML = \`\${new Date(new Date(JSON.parse(filteredData[x].date.S)))}\`;

        let content = article.appendChild(document.createElement("p"));
        content.className="content";
        content.innerHTML = \`\${filteredData[x].entry.S}\`

        let artist = article.appendChild(document.createElement("h5"));
        artist.className="artist";
        artist.innerHTML = \`\${filteredData[x].artist.S}\`

        let place = article.appendChild(document.createElement("h5"));
        place.className="place";
        place.innerHTML = \`\${filteredData[x].place.S}\`
        }
    }

    function reset() {
        posts.innerHTML = "";
    }

    function updateQuery(e) {
        currentValue = e;
        if (!currentValue){
            filteredData = data;
        } else {
        filteredData = data.filter(d => d.type.S == currentValue);
        }
        displayPosts()
    } updateQuery();

    //
    // const activeRadio= document.getElementsByName("topic");
    // const colorObject = {
    //     0: "#f77cf6",
    //     1: "#f7cc7c",
    //     2: "#f77c7c",
    //     3: "#7c92f7",
    // }
    //
    // for (var i = 0; i < activeRadio.length; i++) {
    //     index(i);
    //     function index(i) {
    //         activeRadio[i].addEventListener('click', x => selectTopic(i));
    //     }
    // }
    //
    // function selectTopic(e) {
    //     document.styleSheets[0].rules[0].style.setProperty('--active', colorObject[e]);
    //     activeRadio.forEach(resetCheck => {
    //     resetCheck.previousElementSibling.classList.remove('active');
    //     });
    //     activeRadio[e].previousElementSibling.classList.add('active');
    // } selectTopic(3);

    </script>
    </body>
    </html>`;


// respond to requests for /deardiary
app.get('/deardiary', function(req, res) {

    // AWS DynamoDB credentials
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIAJ2WTPJTJQSYJERCA";
    AWS.config.secretAccessKey = process.env.AWS_KEY;
    AWS.config.region = 'us-east-1';

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
        TableName : 'deardiary',

        // //Use the KeyConditionExpression parameter to provide a specific value for the partition key
        // KeyConditionExpression: "#primaryS = :pk",
        // //KeyConditionExpression: '#dt = :date AND #art = :artist',
        // ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        //     "#primaryS" : "pk"
        //     // "#dt" : 'date'
        //     // "#art" : 'artist'
        // },
        // ExpressionAttributeValues: { // the query values
        //   ":pk" : {S: "0"}
        //     // ':date': {S: 'Oct 11 2018'},
        //     // ":minDate": {N: new Date("September 1, 2018").valueOf().toString()},
        //     // ":maxDate": {N: new Date("October 16, 2018").valueOf().toString()}
        //     // ':artist': {S: 'Kurt Vile'}
        // }
    };

    dynamodb.scan(params, function(err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
        var resp = oneDD + JSON.stringify(data.Items) + twoDD;
        //   res.send(data.Items);
        res.send(resp);

        console.log("3) responded to request for dear diary data");
      }
    });
});

// create templates BUILD MAP HERE
var hx = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AA Meetings</title>
  <meta name="description" content="Meetings of AA in Manhattan">
  <meta name="author" content="AA">
  <link rel="stylesheet" href="css/AAstyles.css?v=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
</head>
<body>
<div id="mapid"></div>
  <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
   integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
   crossorigin=""></script>
  <script>
  var data =
  `;

var jx = `;
console.log(data);
    var mymap = L.map('mapid').setView([40.734636,-73.994997], 13);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        // accessToken: 'your.mapbox.access.token'
        accessToken: 'pk.eyJ1Ijoidm9ucmFtc3kiLCJhIjoiY2pveGF0aDV2MjIyOTNsbWxlb2hhMmR4dCJ9.JJdYD_jWgRwUeJkDWiBz3w'
    }).addTo(mymap);
    for (var i=0; i<data.length; i++) {
        L.marker( [data[i].meetings[0].latitude, data[i].meetings[0].longitude] ).bindPopup(\`\${JSON.stringify(data[i].meetings)} <br><br>\${JSON.parse(JSON.stringify(data[i].location))}\`).addTo(mymap); //<-add information here
    }
    </script>
    </body>
    </html>`;

// respond to requests for /aameetings
app.get('/aa', function(req, res) {

    var now = moment.tz(Date.now(), "America/New_York");
    var dayy = now.day().toString();
    var hourr = now.hour().toString();

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var thisQuery = `SELECT newAddress, title as location, json_agg(json_build_object('day', day, 'st', starttime, 'et', endtime, 'latitude', lat, 'longitude', long, 'type', meetingtype, 'details', details )) as meetings FROM aalocations1 WHERE day = 'Saturdays' OR day = 'Sundays' GROUP BY newAddress, title ;`;var thisQuery = `SELECT newAddress, title as location, json_agg(json_build_object('day', day, 'st', starttime, 'et', endtime, 'latitude', lat, 'longitude', long, 'type', meetingtype, 'details', details )) as meetings FROM msdvdatastruc WHERE day = 'Saturdays' OR day = 'Sundays' GROUP BY newAddress, title ;`;


    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }

        else {
            var resp = hx + JSON.stringify(qres.rows) + jx;
            res.send(resp);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});
