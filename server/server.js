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
if(!process.env.CONSUMER_KEY){
  var KEYS = require('../config.js');
}

// Setup server to listen on process.en.PORT delegating to port 3000
var port = process.env.PORT || 3000;

var key = process.env.CONSUMER_KEY || KEYS.user;
var db_pass = process.env.DB_PASSWORD || KEYS.password;
// ** NEED TO IMPLEMENT Setup server to listen to MongoLab URI delegating to local db 
var mapDB = process.env.MONGOLAB_URI || 'mongodb://' + key + ':' + db_pass + '@ds039095.mongolab.com:39095/users-tweets';
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

app.listen(port);  

console.log('App listening on ' + port);

module.exports = app;
