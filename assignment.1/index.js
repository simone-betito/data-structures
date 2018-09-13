# Studio I

_ @ index.js:131
p @ index.js:86
a82VCPaZyE @ UsageRightsForm.js:72
r @ bootstrap 08ab7ec4087b895463d0:54
msv2jvjPY2 @ UploadForm.js:54
r @ bootstrap 08ab7ec4087b895463d0:54
FDENDP7t4l @ FilesPanel.js:26
r @ bootstrap 08ab7ec4087b895463d0:54
JT3PPsBjGQ @ Sidebar.js:37
r @ bootstrap 08ab7ec4087b895463d0:54
QsztpksFCR @ Sidebar.js:7
r @ bootstrap 08ab7ec4087b895463d0:54
GmWxucBhcY @ root.js:16
r @ bootstrap 08ab7ec4087b895463d0:54
IY4P6bQfsk @ async.js:9
r @ bootstrap 08ab7ec4087b895463d0:54
(anonymous) @ serviceRCELoader.js:85
Promise.then (async)
loadRCE @ serviceRCELoader.js:83
preload @ serviceRCELoader.js:29
preloadRemoteModule @ RichContentEditor.js:161
qAcR/0mG+X @ SyllabusBehaviors.js:33
r @ bootstrap 08ab7ec4087b895463d0:54
XLDgHddQIo @ syllabus.js:21
r @ bootstrap 08ab7ec4087b895463d0:54
window.canvasWebpackJsonp @ bootstrap 08ab7ec4087b895463d0:25
(anonymous) @ syllabus.bundle-69bfd6be39.js:1
var students = ["Alonso","Aaditi", "Betool","Stephanie","Simone","Andrew","Felix","Mikaela","Candice","Michael"];
undefined
students
(10) ["Alonso", "Aaditi", "Betool", "Stephanie", "Simone", "Andrew", "Felix", "Mikaela", "Candice", "Michael"]
var readings = [];
undefined
readings [0] = 'Kurgan, Laura (2013). Close up at a Distance: Mapping, Technology, and Politics. Cambridge, US: Zone Books, 2013. ProQuest ebrary. Web. 24 January 2017. Introduction (pp. 7–36);

VM892:1 Uncaught SyntaxError: Invalid or unexpected token
readings [0] = 'Kurgan, Laura (2013). Close up at a Distance: Mapping, Technology, and Politics. Cambridge, US: Zone Books, 2013. ProQuest ebrary. Web. 24 January 2017. Introduction (pp. 7–36);'
"Kurgan, Laura (2013). Close up at a Distance: Mapping, Technology, and Politics. Cambridge, US: Zone Books, 2013. ProQuest ebrary. Web. 24 January 2017. Introduction (pp. 7–36);"
readings [0] = 'Crawford, Kate (2016), Can an Algorithm be Agonistic? Ten Scenes from Life in Calculated Publics. Science, Technology & Human Values, 41(1), 77-92, 2016';
"Crawford, Kate (2016), Can an Algorithm be Agonistic? Ten Scenes from Life in Calculated Publics. Science, Technology & Human Values, 41(1), 77-92, 2016"
readings [0] = 'Cultural Data: Possibilities and Limitations of Digitized Archives. Grau, Oliver; Coones, Wendy; Rühse, Viola (Ed.), Museum and Archive on the Move. Changing Cultural Institutions in the Digital Era (Berlin, Boston: De Gruyter, 2017), pp. 259-276.';
"Cultural Data: Possibilities and Limitations of Digitized Archives. Grau, Oliver; Coones, Wendy; Rühse, Viola (Ed.), Museum and Archive on the Move. Changing Cultural Institutions in the Digital Era (Berlin, Boston: De Gruyter, 2017), pp. 259-276."

readings [0] = 'Kurgan, Laura (2013). Close up at a Distance: Mapping, Technology, and Politics. Cambridge, US: Zone Books, 2013. ProQuest ebrary. Web. 24 January 2017. Introduction (pp. 7–36);'
"Kurgan, Laura (2013). Close up at a Distance: Mapping, Technology, and Politics. Cambridge, US: Zone Books, 2013. ProQuest ebrary. Web. 24 January 2017. Introduction (pp. 7–36);"
readings [1] = 'Crawford, Kate (2016), Can an Algorithm be Agonistic? Ten Scenes from Life in Calculated Publics. Science, Technology & Human Values, 41(1), 77-92, 2016';
"Crawford, Kate (2016), Can an Algorithm be Agonistic? Ten Scenes from Life in Calculated Publics. Science, Technology & Human Values, 41(1), 77-92, 2016"

readings [2] = 'Cultural Data: Possibilities and Limitations of Digitized Archives. Grau, Oliver; Coones, Wendy; Rühse, Viola (Ed.), Museum and Archive on the Move. Changing Cultural Institutions in the Digital Era (Berlin, Boston: De Gruyter, 2017), pp. 259-276.';
"Cultural Data: Possibilities and Limitations of Digitized Archives. Grau, Oliver; Coones, Wendy; Rühse, Viola (Ed.), Museum and Archive on the Move. Changing Cultural Institutions in the Digital Era (Berlin, Boston: De Gruyter, 2017), pp. 259-276."

for(var i=0; i<readings.length; i++) { assignment[i] = { report: readings [i], team: []} };
{report: "Cultural Data: Possibilities and Limitations of Di… (Berlin, Boston: De Gruyter, 2017), pp. 259-276.", team: Array(0)}

for (var i in assignment) { while(assignment[i].team.length < 3) {var rnd = Math.floor(Math.random() * students.length);} }
for (var i in assignment) {while(assignment[i].team.length < 3) {var rnd = Math.floor(Math.random() * students.length); assignment[i].team.push(students[rnd]); } }
