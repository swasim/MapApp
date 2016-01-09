var passport = require("passport");
var session = require('express-session');
var twitterStrategy =  require("passport-twitter").Strategy;
var twitterCredentials = require("../../config.js").twitter;

// Just a basic server
var express = require('express');
var app = express();
var port = process.env.PORT || 3275 ;
app.listen(port, function(){
  console.log("Listening on 127.0.0.1:" + port);
});



// MiddleWare

app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret:'Keyboard Cat',
  saveUninitialized: false,
  resave: false
}));


// Add these keys to process.Env

var strategyData = {
  consumerKey:twitterCredentials["consumer_key"],
  consumerSecret: twitterCredentials["consumer_secret"],
  callbackURL: "http://127.0.0.1:3275/auth/twitter/callback"
};


var twitterCallback =  function(token, tokenSecret, profile, done) {
  // User.findOrCreate({ username: profile.id }, function (err, user) {
  //   return done(err, user);
  // });
  
  
  console.log(profile);
  return done(profile);
}

passport.use(new twitterStrategy(strategyData, twitterCallback));

// When we go to the 
app.get('/', function(req, res){
  res.redirect('/auth/twitter');
});


// When we are routed to this URL. We will authenticate a twitter Strategy.
app.get('/auth/twitter',
  passport.authenticate('twitter'));



// app.get('/auth/twitter/callback', 
//   passport.authenticate('twitter', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });







