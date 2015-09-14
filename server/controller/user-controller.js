// Inject dependencies
var User = require('../model/user-model.js');

//TODO Move to separate utils JS
var getErrorMessages = function (err) {
    var messages = new Array();

    for (var errName in err.errors) {
        if (err.errors[errName].message)
            messages.push(err.errors[errName].message);
    }
    return messages;
};

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

userController.prototype.renderLogin = function(req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'TAGB - Login',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

userController.prototype.logoutUser = function(req, res) {
    req.logout();
    res.redirect('/');
};

userController.prototype.renderRegister = function(req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'TAGB - Register',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

userController.prototype.registerUser = function (req, res) {
    var userParams = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };
    User.create(userParams, function (error, user) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        }).then(function (data) {
                req.login(user, function(err) {
                    if (err)
                        return next(err);

                    return res.redirect('/');
                });
            }).catch(function (error) {
                req.flash('error', getErrorMessages(error));
                return res.redirect('/register');
            });
    });
};

userController.prototype.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    next();
};

module.exports = userController;