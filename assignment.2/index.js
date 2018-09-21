var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
//var content = loadStrings('AfricaRenewableEnergy.txt');

//var Content = cheerio.load('<ul id="m05"></ul>', {
    //normalizeWhitespace: true,
    //xmlMode: true

// this is the file that we created in the starter code from last week
var content = fs.readFileSync('m05.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);
var finalAddress = [];
var Addresses;

// print (to the console) names of thesis students
$('td').each(function(i, elem) {
  if ($(elem).attr("style")  == "border-bottom:1px solid #e3e3e3; width:260px") {
  Addresses = $(elem).html().split('<br>')[2].trim().split(',')[0]; //+"/n"
  console.log(Addresses);
  finalAddress.push(Addresses);
  }
});


console.log(finalAddress);
fs.writeFileSync("m05Addresses.txt", finalAddress);

// write the project titles to a text file
//var Addresses = $(elem).html().split('<br>')[2].trim().split(',')[0] + ',' + $(elem).html().split('<br>')[2].trim().split(',')[1] + ','+ '\n' + $(elem).html().split('<br>')[3].trim().split(',')[0] +'\n'+'\n';
// finalAddress.push(Addresses);
// console.log(finalAddress);
//fs.writeFileSync("m05.txt", finalAddress);
