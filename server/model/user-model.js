// Inject dependencies
var mongoose = require('mongoose');

// Define schema
// Each schema maps to a MongoDB collection
// and defines the shape of the documents within that collection.
UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  creationDate: Date
});

// Define model
// Models are fancy constructors compiled from our Schema definitions.
// Instances of these models represent documents
// which can be saved and retrieved from our database.
// All document creation and retrieval from the database
// is handled by these models.
var User = mongoose.model('User', UserSchema);

//Export domain model
module.exports = User;