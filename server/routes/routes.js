// Setup dependences
var express = require('express');
var router = express.Router();
var path = require('path');

/* GET Request for index page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../client/views/index.html'));
});

module.exports = router;
