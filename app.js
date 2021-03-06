// Inject dependencies
var express = require('express');
var passport = require('passport');

// Init application
var app = express();

// Inject application definition
// 
require('./server/mongodb.js');
require('./server/config/express-conf.js')(app);
require('./server/config/passport-conf.js')(passport);

app.use('/', require('./server/mongo-insert.js'));

app.use('/', require('./server/routes/index-routes.js'));
app.use('/', require('./server/routes/category-routes.js'));
app.use('/', require('./server/routes/user-routes.js'));
app.use('/', require('./server/routes/poi-routes.js'));
app.use('/', require('./server/routes/resource-routes.js'));

app.use(express.static('./public'));


//ERROR HANDLING

app.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(500).json('File is larger than 2MB!');
  }
});

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

// Start the application
var port = 5000;
app.listen(port, function () {
  console.log('TAGB Webapp started on port: ' + port);
});