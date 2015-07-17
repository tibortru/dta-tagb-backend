// Inject dependencies
var mongoose = require('mongoose');

// Build the connection string
var dbURI = 'mongodb://localhost/tagb';

// Create the database connection
mongoose.connect(dbURI, function(){
  // TODO Remove this function
  mongoose.connection.db.dropDatabase();
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(terminate);
});
function terminate() {
  console.log('Mongoose default connection ' +
      'disconnected through app termination');
  process.exit(0);
}
