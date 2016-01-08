var User = require('../models/userModel.js');

var signIn = function(queryData, callback){
  User.findOne(queryData, function(err, user){
    var sendBack = (!user) ? err : user ;
    callback(sendBack);
  });
};

var signUp = function(userData, callback){
  var userObject = new User(userData);

  userObject.save(function(err, userInfo){
    var sendBack = (err) ? err : userInfo
    callback(sendBack);
  });
}

// expecting User data. If a session is persisting
// I am going to add data to the schema array
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
}
