const { Client } = require('pg');
var fs = require('fs');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'betis855';
db_credentials.host = "msdvdatastruc.cclilxizzkkf.us-east-1.rds.amazonaws.com";
db_credentials.database = 'msdvDataStruc';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table:
//var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";

//http://www.cs.toronto.edu/~nn/csc309-20085/guide/pointbase/docs/html/htmlfiles/dev_datatypesandconversionsFIN.html

//var thisQuery = "CREATE TABLE msdvdatastruc (oldAddress varchar(255),newAddress varchar(255),lat double precision, long double precision, title varchar(255), wheelc boolean, meetings integer, day varchar(100), startTime varchar(100), endTime varchar(100), meetingType varchar(50), details varchar(255));"
//unhighlight row 21 change name of table name + comment out select row 31


// Sample SQL statement to delete a table:
//var thisQuery = "DROP TABLE aalocations1;";

// Sample SQL statement to query the entire contents of a table:
// var thisQuery = "SELECT * FROM aalocations;";

var thisQuery = "SELECT * FROM 	msdvdatastruc;";
//var thisQuery = "SELECT oldAddress, newAddress, lat, long FROM 	msdvdatastruc WHERE day = 'Mondays' AND startTime='1:00 PM';";

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});

//fs.writeFileSync('table.txt', thisQuery);
