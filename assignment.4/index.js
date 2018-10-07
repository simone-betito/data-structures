const { Client } = require('pg');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'betis855';
db_credentials.host = "msdvdatastruc.cclilxizzkkf.us-east-1.rds.amazonaws.com";
db_credentials.database = 'msdvDataStruc';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

//console.log(process.env.AWSRDS_PW)
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();



// Sample SQL statement to create a table:
//var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";

// Sample SQL statement to delete a table:
 //var thisQuery = "DROP TABLE aalocations;";
// Sample SQL statement to query the entire contents of a table:
 var thisQuery = "SELECT * FROM aalocations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});


//Endpoint msdvdatastruc.ck7tanqdnh2x.us-east-2.rds.amazonaws.com
