// Inject dependencies
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var uniqueValidator = require('mongoose-unique-validator');

// Define schema
// Each schema maps to a MongoDB collection
// and defines the shape of the documents within that collection.
UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name cannot be blank'
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: 'Username cannot be blank'
  },
  password: {
    type: String,
    trim: true,
    required: 'Password cannot be blank'
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: 'Email cannot be blank'
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(uniqueValidator);

// Check if password is correct
UserSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// Execute before each user.save() call
UserSchema.pre('save', function (callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) {
    return callback();
  }

  // Password changed so we need to hash it
  bcrypt.genSalt(10, function (error, salt) {
    if (error) {
      return callback(error);
    }
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return callback(err);
      }
      user.password = hash;
      callback();
    });
  });
});

// Define model
// Models are fancy constructors compiled from our Schema definitions.
// Instances of these models represent documents
// which can be saved and retrieved from our database.
// All document creation and retrieval from the database
// is handled by these models.
var User = mongoose.model('User', UserSchema);

// Export domain model
module.exports = User;