var UserSchema = new Schema({
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
})

// This should connect to the users collection
module.exports = new UserSchema('users', UserSchema);
