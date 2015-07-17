// Inject dependencies
var express = require('express');

// Init application
var app = express();

// Inject application definition
// 
require('./server/mongodb.js');
require('./server/config/express-conf.js')(app);


app.use('/', require('./server/controller/category-routes.js'));


// Start the application
var port = 5000;
app.listen(port, function () {
  console.log('TAGB Webapp started on port: ' + port);
});