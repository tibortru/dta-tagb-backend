// Inject dependencies
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

module.exports = function (app) {

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'OurSuperSecretCookieSecret'
  }));

  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());

  app.set('views', './server/views/');
  app.set('view engine', 'ejs');

};