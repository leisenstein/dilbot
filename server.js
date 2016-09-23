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
var Slack = require('node-slack');

app.use(bodyParser.urlencoded({ extended: false })); 

app.get('/', function(req, res) {
    console.log("Index.html");
    res.send("OK!");
});

app.get('/dilbot', function(req, res) {
    services.getToday('fakefile.jpg'
                        , function(comicImg, todaysComicAlt) { 
                            res.send('<img src="' + comicImg + '" alt="' + todaysComicAlt + '"/>');
                        });
});

app.get('/dilbot/:term', function(req, res) {
    console.log('--------------------------------------------------------------------------------------------');
    services.getRandomByTopic(req.params.term, 'fake2.jpg', function(comicImg, todaysComicAlt) {
        console.log(comicImg);
        res.send('<img src="' + comicImg + '" alt="' + todaysComicAlt + '"/>');
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
            services.getRandomByTopic(term, 'fake2.jpg', function(comicImg, todaysComicAlt) {
                console.log(comicImg);
                res.send('' + comicImg + '');
                return;
            });            
        } else {
            console.log("!TERM");
            var config = {
                hook: 'https://hooks.slack.com/services/'+token,
                channel: channelName,
            };
            var slack = new Slack(config.hook);
            
            services.getToday('fakefile.jpg', function(comicImg, todaysComicAlt) { 
            
                res.append('Content-type','application/json');
                //res.attachment(comicImg);
                //res.send(comicImg);
                
                var msg = {
                    'text': comicImg,
                    'unfurl_links': true,
                    'unfurl_media': true,
                    "attachments": [
                        {
                            "fallback": comicImg,
                            "color": "#36a64f",
                            "author_name": "Scott Adams - Dilbert.com (September 21, 2016)",
                            "title": todaysComicAlt,
                            "image_url": comicImg
                        }
                    ]
                };
                res.send(msg);
                
                // SAMPLE
                // token:V9aolfXvw29w4HnT63T0C0ZA
                // team_id:carelike
                // team_domain:carelike
                // channel_id:C2147483705
                // channel_name:dilbot
                // user_id:leisenstein
                // user_name:Larry
                // command:/dilbot
                // text:
                // response_url:https://hooks.slack.com/commands/1234/5678


                // slack.send({
                    // 'text': comicImg,
                    // 'unfurl_links': true,
                    // 'unfurl_media': true,
                    // "attachments": [
                        // {
                            // "fallback": comicImg,
                            // "color": "#36a64f",
                            // "author_name": "Scott Adams - Dilbert.com (September 21, 2016)",
                            // "title": todaysComicAlt,
                            // "image_url": comicImg
                        // }
                    // ]
                // });
                return;
            });            
        }
    } else {
        console.log("!COMMAND");
        res.send("!COMMAND");
        return;
    }
    
});

app.listen(PORT);
console.log('Welcome to Dilbot 0.1');
exports = module.exports = app;