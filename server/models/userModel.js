var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  
  favorites: [String],
<<<<<<< HEAD

  searchHistory: [String]
});
=======
})
>>>>>>> Twitter Auth works

// This should connect to the users collection
module.exports = mongoose.model('users', UserSchema);
