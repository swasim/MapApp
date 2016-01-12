var passport = require("passport");
var TwitterStrategy =  require("passport-twitter").Strategy;
<<<<<<< dbef13786e544c01c06d953dc49772e02caa4899

=======
var KEYS = require('../../config.js');
>>>>>>> Fixes some deploy conflicts

if(!process.env.CONSUMER_KEY){
  var KEYS = process.env.CONSUMER_KEY || require('../../config.js');
}

<<<<<<< dbef13786e544c01c06d953dc49772e02caa4899

=======
>>>>>>> Fixes some deploy conflicts
var mongoose = require('mongoose');
var User = require('../models/userModel.js');

module.exports = {
  
  initialize: function() {

    var strategyData = {
<<<<<<< dbef13786e544c01c06d953dc49772e02caa4899
      consumerKey: process.env.CONSUMER_KEY || KEYS.twitter["consumer_key"],
      consumerSecret: process.env.CONSUMER_SECRET || KEYS.twitter["consumer_secret"],
      callbackURL: "https://fast-garden-2543.herokuapp.com/auth/twitter/callback"
=======
      consumerKey: KEYS.twitter["consumer_key"],
      consumerSecret: KEYS.twitter["consumer_secret"],
      // callbackURL: "https://fast-garden-2543.herokuapp.com/auth/twitter/callback",
      callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
>>>>>>> Fixes some deploy conflicts
    };

    passport.serializeUser(function(user, cb) {
      cb(null, user);
    });

    passport.deserializeUser(function(obj, cb) {
      cb(null, obj);
    });

    var twitterCallback =  function(token, tokenSecret, profile, done) {
      User.findOneAndUpdate(
        {username: profile.username},
        {$setOnInsert: { username: profile.username, favorites: [], searchHistory: []}},
        { new: true, upsert:true}, //return new doc if one is upserted and insert the document if it does not exist
        function(err, data) { 
          if(err) {
            console.log(err);
          }
        }
      );
      return done(null, profile);
    };

    passport.use(new TwitterStrategy(strategyData, twitterCallback));
  }
};










