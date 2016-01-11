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
var socketio = require('socket.io');
var TwitterAPI = require('./controllers/twitterApiController.js');


// **Important password and keys **
var KEYS = require('../config.js');

// Setup server to listen on process.en.PORT delegating to port 3000
var port = process.env.PORT || 3000;
//init socketSTream to null
var stream = null;
// ** NEED TO IMPLEMENT Setup server to listen to MongoLab URI delegating to local db 
var mapDB = process.env.MONGOLAB_URI || 'mongodb://' + KEYS.user + ':' + KEYS.password + '@ds039095.mongolab.com:39095/users-tweets';
mongoose.connect(mapDB);

// Set Up Authorization 
var Auth = require('./auth/auth.js');
Auth.initialize();


// Setup app and routing
var app = express();

// Use Session Middleware
app.use(session({
  secret:'Keyboard Cat',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


// Set up middleware stack

/** FOR FAVICON **/
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));


/* Routes */
app.use('/', routes);

//socket.io code below

var server = app.listen(port);  
console.log('App listening on ' + port);

var io = socketio.listen(server);

// Create web socket connection
io.sockets.on('connection', function(socket) {
 socket.on('tweet flow', function(topic) {
   console.log(topic);
   if (stream === null) {
     stream = true;
     console.log('connected');
     TwitterAPI.streamTweets(topic, function(data) {
       console.log(data);
       if(data.coordinates){
         if(data.coordinates!==null){
          var tweetObject = data;

         var scrubbedTweetObject = {
              name: tweetObject.user['name'],
              handle: tweetObject.user['screen_name'],
              verified: tweetObject.user['verified'],
              createdAt: tweetObject.user['created_at'],
              description: tweetObject.user['description'], 
              url: tweetObject.user['url'],
              followers_count: tweetObject.user['followers_count'], 
              friends_count: tweetObject.user['friends_count'],
              timezone: tweetObject.user['time_zone'],
              coordinates: tweetObject['coordinates'],
              geo: tweetObject['geo'],
              place: tweetObject['place'],
              tweetText: tweetObject['text'],
              tweetTime: tweetObject['created_at'],
              retweet_count: tweetObject['retweet_count'],
              favorite_count: tweetObject['favorite_count']
           };
           socket.broadcast.emit("tweet-stream", scrubbedTweetObject);
           socket.emit("tweet-stream", scrubbedTweetObject);
         }
       }
     });
   }
 });

 socket.emit("connected");
});

module.exports = app;
