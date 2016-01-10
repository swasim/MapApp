// Setup server dependencies
var express = require('express');
var path = require('path');
var favicon = require('favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require("passport");
var session = require('express-session');
var TwitterStrategy =  require("passport-twitter").Strategy;

var routes = require('./routes/routes.js');




// **Important password and keys **
var KEYS = require('../config.js');

// Setup server to listen on process.en.PORT delegating to port 3000
var port = process.env.PORT || 3000;

// ** NEED TO IMPLEMENT Setup server to listen to MongoLab URI delegating to local db 
var mapDB = process.env.MONGOLAB_URI || 'mongodb://' + KEYS.user + ':' + KEYS.password + '@ds039095.mongolab.com:39095/users-tweets';
mongoose.connect(mapDB);



/************************************************/
// TESTING PURPOSES ONLY 
// SETTING UP AUTHENTICATION 
// MOVE TO DIFFERENT FILE IF TIME

var strategyData = {
  consumerKey: KEYS.twitter["consumer_key"],
  consumerSecret: KEYS.twitter["consumer_secret"],
  callbackURL: "http://127.0.0.1:3000/login/callback"
};


var twitterCallback =  function(token, tokenSecret, profile, done) {
  // User.findOrCreate({ username: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
  console.log(profile);
  return done(profile);
}

passport.use(new TwitterStrategy(strategyData, twitterCallback));
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
/************************************************/



// Setup app and routing
var app = express();




// Create Session Middleware
// TODO Move to own file later
app.use(session({
  secret:'Keyboard Cat',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());






// Set up middleware stack

// O-Auth For Twitter


/** FOR FAVICON **/
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));


/* Routes */
app.use('/', routes);

app.listen(port);  

console.log('App listening on ' + port);

module.exports = app;
