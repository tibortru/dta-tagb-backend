// Inject dependencies
var User = require('../model/user-model.js');

// Declare object constructor
function indexController() {
}

// Create controller object and it's methods
indexController.prototype.indexPage = function (req, res) {
  res.render('index', {
    title: 'Howdy World! This is TAGB Web app!'
  });
};

indexController.prototype.loginUser = function (req, res) {
  var userParams = {
    email: req.body.email,
    password: req.body.password
  };
  User.findOne(userParams, function (error, user) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    }).then(function (resolved) {
          if(resolved!=null) {
            res.status(200).json(resolved);
          }else {
            res.status(500).json({'error':'Wrong email or password!'});
          }
        }).catch(function (rejected) {
          res.status(500).send(new Error('An error brah'));
        });
  });

};

module.exports = indexController;