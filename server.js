var PORT = process.env.PORT||8081;
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var app = express();
var services = require('./app/Services');

var _ = require('underscore');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); 



app.get('/', function(req, res) {
    console.log("Index.html");
    res.send("OK!");
});

app.get('/dilbot', function(req, res) {
    services.getToday('fakefile.jpg'
                        , function(comicImg) { 
                            res.send('<img src="' + comicImg + '"/>');
                        });
});

app.get('/dilbot/:term', function(req, res) {
    console.log('--------------------------------------------------------------------------------------------');
    services.getRandomByTopic(req.params.term, 'fake2.jpg', function(comicImg) {
        console.log(comicImg);
        res.send('<img src="' + comicImg + '"/>');
    });
});


app.post('/dilbot', function(req, res) {
    // parameters from Slack
    var term = req.body.text;
    var token = req.body.token;
    var teamId=req.body.team_id;
    var teamDomain=req.body.team_domain;
    var channelId=req.body.channel_id;
    var channelName=req.body.channel_name;
    var userId=req.body.user_id;
    var userName=req.body.user_name;
    var command=req.body.command;
    console.log('--------------------------------------------------------------------------------------------');
    if(command=="dilbot") {
        if(term) {
            services.getRandomByTopic(term, 'fake2.jpg', function(comicImg) {
                console.log(comicImg);
                res.send('' + comicImg + '');
            });            
        } else {
            services.getToday('fakefile.jpg', function(comicImg) { 
                res.send('' + comicImg + '');
            });            
        }
    }
        
    
});



app.listen(PORT);
console.log('Welcome to Dilbot 0.1');
exports = module.exports = app;
