// Inject dependencies
var User = require('../model/user-model.js');

// Declare object constructor
function userController() {
}

// Create controller object and it's methods
userController.prototype.getAllUsers = function (req, res) {
  User.find({}, function (error, users) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(users);
      }
    }).then(function (data) {
          res.status(200).json(data);
        }).catch(function (error) {
          res.status(500).send(new Error('An error brah'));
        });
  });
};

userController.prototype.createUser = function (req, res) {
  var userParams = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    creationDate: Date.now()
  };
  User.create(userParams, function (error, user) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    }).then(function (data) {
          res.status(201).json(data);
        }).catch(function (error) {
          res.status(500).send(new Error('An error brah'));
        });
  });
};

userController.prototype.getUserByUsername = function (req, res) {
  var userParams = {
    username: req.params.username
  };
  User.find(userParams, function (error, user) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    }).then(function (resolved) {
          if(resolved!=null && resolved.length!==0) {
            res.status(200).json(resolved);
          }else {
            res.status(500).json({'error':'Username doesn\'t exist!'});
          }
        }).catch(function (rejected) {
          res.status(500).send(new Error('Error occurred bro'));
        });
  });
};

userController.prototype.updateUser = function (req, res) {
  var updateParams = {
    name: req.body.name,
    email: req.body.email
  };
  User.findOneAndUpdate({username: req.params.username},
      updateParams, function (error, user) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    }).then(function (resolved) {
          if(resolved!=null) {
            res.status(200).json({'success':'Updated.'});
          }else {
            res.status(500).json({'error':'Username doesn\'t exist!'});
          }
        }).catch(function (rejected) {
          res.status(500).send(new Error('Error occurred bro'));
        });
  });
};

userController.prototype.deleteUser = function (req, res) {
  var userParams = {
    username: req.params.username
  };
  User.findOneAndRemove(userParams, function (error, user) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    }).then(function (resolved) {
          if(resolved!=null) {
            res.status(200).json({'success':'Deleted.'});
          }else {
            res.status(500).json({'error':'Username doesn\'t exist!'});
          }
        }).catch(function (rejected) {
          res.status(500).send(new Error('Error occurred bro'));
        });
  });
};

userController.prototype.loginUser = function (req, res) {
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

userController.prototype.resetUserPassword = function (req, res) {
  var resetParams = {
    password: req.body.newPassword
  };
  User.findOneAndUpdate({email: req.body.email, password: req.body.oldPassword},
      resetParams, function (error, user) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    }).then(function (resolved) {
          if(resolved!=null) {
            res.status(200).json({'success':'Password updated.'});
          }else {
            res.status(500).json({'error':'Wrong email or password!'});
          }
        }).catch(function (rejected) {
          res.status(500).send(new Error('An error brah'));
        });
  });

};

module.exports = userController;