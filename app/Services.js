var fs = require('fs');
var request = require('request');

var Services = { }


Services.download = function(uri, filename, callback) {
    request.head(uri, function(err, resp, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    }); 
};


Services.junk = function() {
    console.log("JUNK");
};













module.exports = Services;