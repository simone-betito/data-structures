var fs = require('fs'); // fs = file system module
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
//var content = loadStrings('AfricaRenewableEnergy.txt');

//var Content = cheerio.load('<ul id="m05"></ul>', {
    //normalizeWhitespace: true,
    //xmlMode: true

// this is the file that we created in the starter code from last week
var content = fs.readFileSync('m05.txt'); // .. <- goes back into a level

// load `content` into a cheerio object
var $ = cheerio.load(content);
var finalAddress = [];
var Addresses;

// print (to the console) names of thesis students
$('td').each(function(i, elem) { // td guarantee way to get to addresses

  if ($(elem).attr("style")  == "border-bottom:1px solid #e3e3e3; width:260px") { //styling being unique to table containing addresses
  Addresses = $(elem).html().split('<br>')[2].trim().split(',')[0]; //+"\n" <- adds new line marker
  //let cleanData = Addresses.substring(0, Addresses.indexOf(","))
  //console.log(Addresses);
  finalAddress.push(Addresses);

  }
});
//JSON.stringify to turn file into JSON
//fs.writeFileSync("m05.txt", JSON.stringify(m05Addresses.txt))

console.log(finalAddress); // node on terminal to print
fs.writeFileSync("finalAddress.json", JSON.stringify(finalAddress));
// fs.writeFileSync("m05Addresses.txt", JSON.stringify(finalAddress));


// write the project titles to a text file
// finalAddress.push(Addresses);
// console.log(finalAddress);
//fs.writeFileSync("m05.txt", finalAddress);
