// Setup dependences
var express = require('express');
var router = express.Router();
var path = require('path');
var twitterApiController = require('../controllers/twitterApiController');

/* GET Request for index page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../client/views/index.html'));
});

// Handle GET request to Twitter API
router.get('/api/tweets/:category', function(req, res) {
  console.log('Received query from client:', req.params);
  // Using req.query, provide the query by client and the number of tweets to get
  twitterApiController.getTweets(req.params.category, 10, function(err, data) {
    // ** Reject data that doesn't have a location ** !!! Need to do this
    if (err) {
      console.log('Error getting data from Twttier API');
      throw new Error(err);

    } else {
      res.json(data);
    }
  });

});

router.post('/user/signup', function(req, res) {
});

module.exports = router;
