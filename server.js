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
    console.log("POST TO DILBOT!");
    
    
    
    var term = req.body.text;
    console.log(term);
    var token = req.body.token;
    console.log(token);
    var teamId=req.body.team_id;
    console.log(teamId);
    var teamDomain=req.body.team_domain;
    console.log(teamDomain);
    var channelId=req.body.channel_id;
    console.log(channelId);
    var channelName=req.body.channel_name;
    console.log(channelName);
    var userId=req.body.user_id;
    console.log(userId);
    var userName=req.body.user_name;
    console.log(userName);
    var command=req.body.command;
    console.log(command);
    
    
    console.log('--------------------------------------------------------------------------------------------');
    if(command=="/dilbot") {
        console.log("command==dilbot");
        if(term) {
            console.log("TERM");
            res.send("TERM");
            services.getRandomByTopic(term, 'fake2.jpg', function(comicImg) {
                console.log(comicImg);
                res.send('' + comicImg + '');
            });            
        } else {
            console.log("!TERM");
            res.send("!TERM");
            services.getToday('fakefile.jpg', function(comicImg) { 
                res.send('' + comicImg + '');
            });            
        }
    } else {
        console.log("!COMMAND");
        res.send("!COMMAND");
    }
        
    
});



app.listen(PORT);
console.log('Welcome to Dilbot 0.1');
exports = module.exports = app;
