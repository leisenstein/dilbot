var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

var Services = { }
Services.BaseDilbertURL = 'http://dilbert.com/';
Services.BaseDilbertSearchURL = 'http://dilbert.com/search_results?terms=';

Services.download = function(uri, filename, callback) {
    request.head(uri, function(err, resp, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    }); 
};

Services.getToday = function(filename, callback) {
    request(Services.BaseDilbertURL, function(error, response, html) {
        if(error) {
            console.log("There is an ERROR in the request (getToday)!");
            console.log(error);
        } else {
            console.log("Its all good: " + response.statusCode);
            $ = cheerio.load(html);
            
            var wrapped = moment(new Date());
            var logDate = wrapped.format( "YYYY-MM-DD HH:mm").toString();
            var todaysComicImg = $('img.img-comic').attr('src');
            var todaysComicAlt = $('img.img-comic').attr('alt');
            console.log(logDate + ' : ' + todaysComicImg + ' [' + todaysComicAlt +']');
            callback(todaysComicImg);
        }
    });
};

Services.getRandomByTopic = function(term, uri, filename, callback) {
    
};

Services.junk = function() {
    console.log("JUNK");
};













module.exports = Services;