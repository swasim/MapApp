// Setup server dependencies
var express = require('express');
var path = require('path');
var favicon = require('favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// **Important password and keys **
var KEYS = require('../config.js');

// Setup server to listen on process.en.PORT delegating to port 3000
var port = process.env.PORT || 3000;

// ** NEED TO IMPLEMENT Setup server to listen to MongoLab URI delegating to local db 
var mapDB = process.env.MONGOLAB_URI || 'mongodb://' + KEYS.user + ':' + KEYS.password + '@ds039095.mongolab.com:39095/users-tweets';
mongoose.connect(mapDB);

// Setup app and routing
var app = express();

var routes = require('./routes/routes.js');

// Set up middleware stack

/** FOR FAVICON **/
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../')));

app.use('/', routes);

app.listen(port);  

console.log('App listening on ' + port);

module.exports = app;
