request('https://parsons.nyc/aa/m09.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/m09.txt', body);
    }
    else {console.log("Request failed!")}
});
