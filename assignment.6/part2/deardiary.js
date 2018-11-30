// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = "AKIAIV6S4UXKQZOZMMOA";
AWS.config.secretAccessKey =  "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";
AWS.config.region = 'us-east-1';

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : 'deardiary',

    //Use the KeyConditionExpression parameter to provide a specific value for the partition key
    'KeyConditionExpression': '#dt = :date AND #art = :artist',
    'ExpressionAttributeNames': { // name substitution, used for reserved words in DynamoDB
        "#dt" : 'date',
        "#art" : 'artist'
    },
    'ExpressionAttributeValues': { // the query values
        ':date': {S: 'Oct 11 2018'},
        // ":minDate": {N: new Date("September 1, 2018").valueOf().toString()},
        // ":maxDate": {N: new Date("October 16, 2018").valueOf().toString()}
        ':artist': {S: 'Kurt Vile'}
    }
};

console.log(params);
dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        //console.log(data);
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});
