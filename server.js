var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var app = express();



app.get('/scrape', function(req, res) {
    url = 'http://dilbert.com/';
    
    console.log("URL: " + url);
    request(url, function(error, response, html) {
        if(error) {
            console.log("There is an ERROR in the request!");
        } else {
            console.log("Its all good: " + response.statusCode);
            $ = cheerio.load(html);
            
            var wrapped = moment(new Date());
            var logDate = wrapped.format( "YYYY-MM-DD HH:mm").toString();
            
            
            var todaysComicImg = $('img.img-comic').attr('src');
            var todaysComicAlt = $('img.img-comic').attr('alt');
            console.log(logDate + ' : ' + todaysComicImg + ' [' + todaysComicAlt +']');
            res.send(html);
        }
    });
  
    
});


app.listen('8081');
console.log('Welcome to Dilbot 0.1');


exports = module.exports = app;
