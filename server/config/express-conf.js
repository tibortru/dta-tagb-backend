var bodyParser = require('body-parser');

module.exports = function (app) {

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());

  app.set('views', './public/views/');
  app.set('view engine', 'ejs');


};