// Import twit npm module
var Twit = require('twit');
// Imports twitter credential config
var twitterCredentials = require('../../config.js').twitter;

var T = new Twit({
    "consumer_key": twitterCredentials["consumer_key"],
    "consumer_secret": twitterCredentials["consumer_secret"],
    "access_token": twitterCredentials["access_token"],
    "access_token_secret": twitterCredentials["access_token_secret"]
});


module.exports = { 

  // getTweets: Function that gets the 'n' most recent tweets given a query string and a number n
  getTweets: function(query, number, callback) {
    T.get('search/tweets', {q: query, count: number}, callback);
  },

  // streamTweets: Function that streams tweets with a location or geocode provided
  streamTweets: function(query, callback) {
    var stream = T.stream('statuses/filter', {'locations':['-180','-90','180','90']});
    stream.on('tweet', callback);
  }
};


