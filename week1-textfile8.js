request('https://parsons.nyc/aa/m08.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/m08.txt', body);
    }
    else {console.log("Request failed!")}
});
