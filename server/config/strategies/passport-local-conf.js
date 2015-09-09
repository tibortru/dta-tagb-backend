// Inject dependencies
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../model/user-model.js');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, callback){
        User.findOne({username:username}, function(err, user){
            if (err) {
                return callback(err);
            }

            // No user found with that username
            if (!user) {
                return callback(null, false, {message: 'Unknown user'});
            }

            // Make sure the password is correct
            user.verifyPassword(password, function (err, isMatch) {
                if (err) {
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false, {message: 'Invalid password'});
                }

                // Success
                return callback(null, user);
            });
        })
    }));
};