var User = require('../models/userModel.js');

// Finding a User from a database
var signIn = function(queryData, callback){
  User.findOne(queryData, function(err, user){
    var sendBack = (!user) ? err : user ;
    callback(sendBack);
  });
};


// Adding a new user to the database
var signUp = function(userData, callback){
  var userObject = new User(userData);

  userObject.save(function(err, userInfo){
    var sendBack = (err) ? err : userInfo;
    callback(sendBack);
  });
}

// Expecting User data. 
// Is someother file going to pass me the data or should I have another query to find the user.
// If a session is persisting
// This is going to add data to the array
var addFavorite = function(userID, data, callback){
  userID.update({_id: userID}, {$push: {favorites: data}}, function(err, numAffected){
    if(numAffected.length === 1){
      callback();
    }
  });
};


module.exports = {
  signIn: signIn,
  signUp: signUp,
  addFavorite: addFavorite
};
