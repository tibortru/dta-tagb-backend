// Inject dependencies
var express = require('express');

// Init application
var app = express();

// Inject application definition
// 
require('./server/mongodb.js');
require('./server/config/express-conf.js')(app);


app.use('/', require('./server/controller/category-routes.js'));
app.use('/', require('./server/controller/user-routes.js'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Start the application
var port = 5000;
app.listen(port, function () {
  console.log('TAGB Webapp started on port: ' + port);
});