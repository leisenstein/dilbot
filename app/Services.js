var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');



var Services = { }
Services.BaseDilbertURL = 'http://dilbert.com/';
Services.BaseDilbertSearchURL = 'http://dilbert.com/search_results?terms=';

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
Services.download = function(uri, filename, callback) {
    request.head(uri, function(err, resp, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    }); 
}; // download function


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
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
}; // getToday function


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
Services.getRandomByTopic = function(term, filename, callback) {
    var searchUrl = `${Services.BaseDilbertSearchURL}${term}`;
    console.log(searchUrl);
    request(searchUrl, function(error, response, html) {
       if(error) {
           console.log("There is an ERROR in the request (getRandomByTopic)!");
           console.log(error);
       } else {
           $ = cheerio.load(html);
           // $('div.no-results').length > 0
           
           var quickCount = parseInt($('ul.pagination li.next').prev().text());
           console.log('Number of Pages: ' + quickCount);
           
           var random = require("random-js")();
           var randomPage = random.integer(1, quickCount);
           console.log('Random page num:  ' + randomPage);
           // Load the random page
           searchUrl = `${Services.BaseDilbertSearchURL}${term}&page=${randomPage}`;
           console.log('Now Searching: ' + searchUrl);
           request(searchUrl, function(err, resp, body) {
               if(err) {
                   console.log("There is an ERROR in the request (getRandomByTopic)!");
                   console.log(err);
               } else {
                   $ = cheerio.load(body);
                   var firstOnRandomPage = $('img.img-comic').attr('src');
                   
                   var numberOfComics = $('div.img-comic-container').length;
                   console.log('Number of Comics on  Random Page: ' + numberOfComics);
                   
                   random = require("random-js")();
                   var imgRandomComic = $('div.img-comic-container img.img-comic')[random-1];
                   var todaysComicImg = $('img.img-comic').attr('src');
                   var todaysComicAlt = $('img.img-comic').attr('alt');
                   console.log('Final ::::::::: ' + todaysComicImg + ' [' + todaysComicAlt +']');
                   callback(todaysComicImg);
               }
           
           });
           
           
           // get the # of comics
           
           
           // pick a random comic
           
           
           // get the url of the random comic
       }
    });
}; // getRandomByTopic function
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////












//////////////////////////////////
///////// TEST ///////////////////
//////////////////////////////////
// GET nTH comic on page

Services.getComicFromHtml = function(html, n) {
    $ = cheerio.load(html);
    
}; // getComicFromHtml function



//////////////////////////////////
///////// TEST ///////////////////
//////////////////////////////////











module.exports = Services;