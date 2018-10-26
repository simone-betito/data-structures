const { Client } = require('pg');
const cTable = require('console.table');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'simoneb';
db_credentials.host = 'msdvdatastruc.cclilxizzkkf.us-east-1.rds.amazonaws.com';
db_credentials.database = 'msdvdatastruc';
db_credentials.password = "database123";
db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm:
//var thisQuery = "SELECT mtgday, mtgtime, mtglocation, mtgaddress, mtgtypes FROM aadata WHERE mtgday = 'Monday' and mtghour >= 7;";
var thisQuery = "SELECT oldAddress, newAddress, lat, long FROM aalocations1 WHERE day = 'Mondays' AND startTime='1:00 PM';";


client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        client.end();
    }
});
