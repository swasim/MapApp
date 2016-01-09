var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  favorites: [String],

  searchHistory: [String]
});

// This should connect to the users collection
module.exports = mongoose.model('users', UserSchema);
