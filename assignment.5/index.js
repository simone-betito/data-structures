var diaryEntries = []; //template
var async = require('async'); // npm install async

class DiaryEntry {
  constructor(primaryKey, date, entry, type, artist, place) { //should reflect structure of your own no sql, all entries should have same parameter,
    this.pk = {};
    this.pk.S = primaryKey.toString(); // to discuss later
    this.date = {};
    this.date.S = new Date(date).toDateString();
    this.entry = {};
    this.entry.S = entry;
    this.type = {};
    this.type.S = type;
    this.artist = {};
    this.artist.S = artist;
    this.place = {};
    this.place.S = place;
    this.month = {};
    this.month.N = new Date(date).getMonth().toString();
  }
}

diaryEntries.push(
  new DiaryEntry(
    0,
    'October 8, 2018',
    "Today I saw a really lovely building with amazing crown molding on 10th street",
    "Architecture",
    "Unknown",
    "In transit",
    ));

diaryEntries.push(
  new DiaryEntry(
    1,
    'October 9, 2018',
    "Today I read a really great passage about climate in the new Rebecca Solnit book",
    "Literature",
    "Rebecca Solnit",
    "At home",
    ));

diaryEntries.push(
  new DiaryEntry(
    2,
    "October 11, 2018",
    "Today I listened to the new Kurt Vile album, it's great so far.",
    "Music",
    "Kurt Vile",
    "On my way to Stats class",
    ));

//console.log(diaryEntries);


var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

async.eachSeries(diaryEntries, function(value, callback) {

  var params = {};
  params.Item = value;
  params.TableName = "deardiary";

  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response

    setTimeout(callback, 2000);
  });

});
