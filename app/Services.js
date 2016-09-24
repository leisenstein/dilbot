var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Services = { }
Services.BaseDilbertURL = 'http://dilbert.com/';
Services.BaseDilbertSearchURL = 'http://dilbert.com/search_results?terms=';


/////////////////////////////////////////////////////////////////////////////////////////////
Services.getToday = function(filename, callback) {
    console.log("Inside::: Services.getToday");
    request(Services.BaseDilbertURL, function(error, response, html) {
        if(error) {
            console.log("There is an ERROR in the request (getToday)!");
            console.log(error);
        } else {
            $ = cheerio.load(html);
            
            var MainComicDiv = $('div.meta-info-container .comic-item')[0];
            
            var todaysComicImg = $('img.img-comic, MainComicDiv').attr('src');
            var todaysComicAlt = $('img.img-comic', MainComicDiv).attr('alt');
            var todaysComicDate1 = $('.comic-title-date span', MainComicDiv)[0];
            var todaysComicDate2 = $('.comic-title-date span', MainComicDiv)[1];
            var todaysComicDate = todaysComicDate1.children[0].data + ' ' + todaysComicDate2.children[0].data;
            console.log(todaysComicImg + ' [' + todaysComicAlt +']' + ' (' + todaysComicDate + ')');
            callback(todaysComicImg, todaysComicAlt, todaysComicDate);
        }
    });
}; // getToday function


/////////////////////////////////////////////////////////////////////////////////////////////
Services.getRandomByTopic = function(term, filename, callback) {
    console.log("Inside::: Services.getRandomByTopic");
    var searchUrl = `${Services.BaseDilbertSearchURL}${term}`;
    console.log(searchUrl);
    request(searchUrl, function(error, response, html) {
       if(error) {
           console.log("There is an ERROR in the request (getRandomByTopic)!");
           console.log(error);
       } else {
           $ = cheerio.load(html);
           
           // MUST account for No Results
           var noResults = $('div.no-results').length > 0
           if(noResults) {
               callback('http://funny-pictures.funmunch.com/pictures/Soccer-Fail-2.jpg', 'None', 'None');
               return;
           }
               
           
           var numOfPages = parseInt($('ul.pagination li.next').prev().text());
           var random = require("random-js")();
           var randomPage = random.integer(1, numOfPages);
           console.log('Picked Random page #: ' + randomPage + ' of ' + numOfPages + '!');

           searchUrl = `${Services.BaseDilbertSearchURL}${term}&page=${randomPage}`;
           console.log('Now Searching: ' + searchUrl);
           request(searchUrl, function(err, resp, body) {
               if(err) {
                   console.log("There is an ERROR in the request (getRandomByTopic)!");
                   console.log(err);
               } else {
                   $ = cheerio.load(body);
                   var numberOfComics = $('div.img-comic-container').length;

                   random = require("random-js")();
                   var randomComic = random.integer(1, numberOfComics);
                   console.log('Picked Comic #: ' + randomComic + ' of ' + numberOfComics + '!');

                   var MainComicDiv = $('div.meta-info-container .comic-item')[random-1];
                   var todaysComicImg = $('img.img-comic', MainComicDiv).attr('src');
                   var todaysComicAlt = $('img.img-comic', MainComicDiv).attr('alt');
 
                   var todaysComicDate1 = $('.comic-title-date span', MainComicDiv)[0];
                   var todaysComicDate2 = $('.comic-title-date span', MainComicDiv)[1];
                   var todaysComicDate = todaysComicDate1.children[0].data + ' ' + todaysComicDate2.children[0].data;
                   console.log(todaysComicImg + ' [' + todaysComicAlt +']' + ' (' + todaysComicDate + ')');
                   callback(todaysComicImg, todaysComicAlt, todaysComicDate);
               }
           
           });

       }
    });
}; // getRandomByTopic function

module.exports = Services;