var PORT = process.env.PORT||8081;
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')
var request = require('request');
var cheerio = require('cheerio');
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
                        , function(comicImg, todaysComicAlt, comicDate) { 
                            res.send('<img src="' + comicImg + '" alt="' + todaysComicAlt + '"/>');
                        });
});

app.get('/dilbot/:term', function(req, res) {
    console.log('--------------------------------------------------------------------------------------------');
    services.getRandomByTopic(req.params.term, 'fake2.jpg', function(comicImg, todaysComicAlt, comicDate) {
        console.log(comicImg);
        res.send('<img src="' + comicImg + '" alt="' + todaysComicAlt + '"/>');
    });
});


app.post('/dilbot', function(req, res) {
    // parameters from Slack
    var term = req.body.text;
    console.log('term: ' + term);
    var command=req.body.command;
    console.log('command: ' + command);
    var token = req.body.token;
    console.log('token: ' + token);
    var teamId=req.body.team_id;
    console.log('teamId: ' + teamId);
    var teamDomain=req.body.team_domain;
    console.log('teamDomain: ' + teamDomain);
    var channelId=req.body.channel_id;
    console.log('channelId: ' + channelId);
    var channelName=req.body.channel_name;
    console.log('channelName: ' + channelName);
    var userId=req.body.user_id;
    console.log('userId: ' + userId);
    var userName=req.body.user_name;
    console.log('userName: ' + userName);
    
    
    console.log('--------------------------------------------------------------------------------------------');
    if(command=="/dilbot") {
        console.log("command==dilbot");
        if(term) {
            console.log("term: " +term);
            services.getRandomByTopic(term, 'fake2.jpg', function(comicImg, todaysComicAlt, comicDate) {
                // header
                res.append('Content-type','application/json');
                
                // body
                var msg = {
                    'text': comicImg,
                    'unfurl_links': true,
                    'unfurl_media': true,
                    "attachments": [
                        {
                            "fallback": comicImg,
                            "color": "#36a64f",
                            "author_name": "Scott Adams - \u00A9Dilbert.com (" + comicDate + ")",
                            "title": todaysComicAlt,
                            "image_url": comicImg
                        }
                    ]
                };
                res.send(msg);
                
                // SAMPLE FOR POSTMAN
                // token:YOUR_TOKEN
                // team_id:carelike
                // team_domain:carelike
                // channel_id:C2147483705
                // channel_name:dilbot
                // user_id:leisenstein
                // user_name:Larry
                // command:/dilbot
                // text:
                // response_url:https://hooks.slack.com/commands/1234/5678

                return;
            });            
        } else {
            console.log("!term");
            
            services.getToday('fakefile.jpg', function(comicImg, todaysComicAlt, comicDate) { 
                // header
                res.append('Content-type','application/json');
                
                // body
                var msg = {
                    'text': comicImg,
                    'unfurl_links': true,
                    'unfurl_media': true,
                    "attachments": [
                        {
                            "fallback": comicImg,
                            "color": "#36a64f",
                            "author_name": "Scott Adams - \u00A9Dilbert.com (" + comicDate + ")",
                            "title": todaysComicAlt,
                            "image_url": comicImg
                        }
                    ]
                };
                res.send(msg);
                return;
            });            
        }
    } else {
        console.log("!command");
        res.send("!command");
        return;
    }
    
});

app.listen(PORT);
console.log('Welcome to Dilbot 0.1');
exports = module.exports = app;