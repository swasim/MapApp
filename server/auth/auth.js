



// var passport = require("passport");
// var session = require('express-session');
// var twitterStrategy =  require("passport-twitter").Strategy;
// var twitterCredentials = require("../../config.js").twitter;

// Just a basic server
// var express = require('express');
// var app = express();
// var port = process.env.PORT || 3275 ;
// app.listen(port, function(){
//   console.log("Listening on 127.0.0.1:" + port);
// });


// var checkAuth = function(req, res, next){
//   if(req.session.user){
//     next();
//   } else {
//     req.session.error = "Access Denied";
//     res.redirect('/auth/twitter');
//   }
// };


// MiddleWare

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({
//   secret:'Keyboard Cat',
//   saveUninitialized: false,
//   resave: false
// }));


// Add these keys to process.Env



var strategyData = {
  consumerKey:twitterCredentials["consumer_key"],
  consumerSecret: twitterCredentials["consumer_secret"],
  callbackURL: "http://127.0.0.1:3275/login/callback"
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














