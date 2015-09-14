var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

// Inject dependencies
var User = require('./model/user-model.js');

// Load the bcrypt module
var bcrypt = require('bcrypt-nodejs');
// Generate a salt
var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
var hash = bcrypt.hashSync('password', salt);

function onBulkInsert(err, myDocuments) {
  if (err) {
    return next(err);
  }
  else {
    console.log('%userCount users were inserted!', myDocuments.length);
  }
}

router.get('/resetmongodb', function (req, res, next) {
  User.remove({}, function (err) {
    if (err) {
      return next(err);
    }
  });

  var users = [
    { '_id': mongoose.Types.ObjectId('54f6612bb0e6af1800b5d33d'),
      'name': 'Tibor', '__v': 0,
      'username':'tibortru',
      'email':'tibortru@gmail.com',
      'password':hash,
      creationDate: new Date('2015-03-04T01:28:25.935Z')},
    {'_id': mongoose.Types.ObjectId('54f6615fb0e6af1800b5d33e'),
      'name': 'Alex', '__v': 0,
      'username':'ristica',
      'email':'alex@gmail.com',
      'password':hash,
      creationDate: new Date('2015-03-04T01:28:25.936Z')},
    {'_id': mongoose.Types.ObjectId('54f6616cb0e6af1800b5d33f'),
      'name': 'Bob Jones', '__v': 0,
      'username':'bob',
      'email':'bob@gmail.com',
      'password':hash,
      creationDate: new Date('2015-03-04T01:28:25.937Z')},
    {'_id': mongoose.Types.ObjectId('54f66177b0e6af1800b5d340'),
      'name': 'Aaron Baron', '__v': 0,
      'username':'aaron',
      'email':'aaron@gmail.com',
      'password':hash,
      creationDate: new Date('2015-03-04T01:28:25.938Z')},
    {'_id': mongoose.Types.ObjectId('54f66182b0e6af1800b5d341'),
      'name': 'Johnny Javascript', '__v': 0,
      'username':'johnny',
      'email':'johnny@gmail.com',
      'password':hash,
      creationDate: new Date('2015-03-04T01:28:25.939Z')},
    {'_id': mongoose.Types.ObjectId('54f66188b0e6af1800b5d342'),
      'name': 'Paul Pascal', '__v': 0,
      'username':'pascal',
      'email':'pascal@gmail.com',
      'password':hash,
      creationDate: new Date('2015-03-04T01:28:25.940Z')},
    {'_id': mongoose.Types.ObjectId('54f66190b0e6af1800b5d343'),
      'name': 'Joanna Java', '__v': 0,
      'username':'java',
      'email':'java@gmail.com',
      'password':hash,
      creationDate: new Date('2015-03-04T01:28:25.941Z')},
  ];
  User.collection.insert(users, onBulkInsert);

  res.json({'jobStatus': 'MongoDB Refresh Complete - It\'s All Good!'});
});

module.exports = router;