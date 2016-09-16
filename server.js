var PORT = 8081;
var express = require('express');
var fs = require('fs');
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var app = express();
var services = require('./app/Services');


app.get('/scrape', function(req, res) {
    services.getToday('fakefile.jpg'
                        , function(comicImg) { 
                            res.send('<img src="' + comicImg + '"/>');
                        });
});


app.listen(PORT);
console.log('Welcome to Dilbot 0.1');
exports = module.exports = app;
