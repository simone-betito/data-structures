var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'betis855';
db_credentials.host = "msdvdatastruc.cclilxizzkkf.us-east-1.rds.amazonaws.com";
db_credentials.database = 'msdvDataStruc';
db_credentials.password = process.env.AWS_KEY;
db_credentials.port = 5432;

// AWS DynamoDB credentials
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAJ2WTPJTJQSYJERCA";
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = 'us-east-1';

// respond to requests for /sensor
// app.get('/sensor', function(req, res) {
//
//     // Connect to the AWS RDS Postgres database
//     const client = new Pool(db_credentials);
//
//     // SQL query
//     var q = `SELECT EXTRACT(DAY FROM sensorTime) as sensorday,
//              AVG(sensorValue::int) as num_obs
//              FROM sensorData
//              GROUP BY sensorday
//              ORDER BY sensorday;`;
//
//     client.connect();
//     client.query(q, (qerr, qres) => {
//         if (qerr) { throw qerr }
//         else {
//             res.send(qres.rows);
//             client.end();
//             console.log('1) responded to request for sensor data');
//         }
//     });
// });

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

// respond to requests for /deardiary
app.get('/deardiary', function(req, res) {

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
        TableName : 'deardiary',

        //Use the KeyConditionExpression parameter to provide a specific value for the partition key
        KeyConditionExpression: "#primaryS = :pk",
        //KeyConditionExpression: '#dt = :date AND #art = :artist',
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#primaryS" : "pk"
            // "#dt" : 'date'
            // "#art" : 'artist'
        },
        ExpressionAttributeValues: { // the query values
          ":pk" : {S: "0"}
            // ':date': {S: 'Oct 11 2018'},
            // ":minDate": {N: new Date("September 1, 2018").valueOf().toString()},
            // ":maxDate": {N: new Date("October 16, 2018").valueOf().toString()}
            // ':artist': {S: 'Kurt Vile'}
        }
    };

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            res.send(data.Items);
            console.log('3) responded to request for dear diary data');
        }
    });

});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});
