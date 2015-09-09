var passport = require('passport');
var User = require('../model/user-model.js');

module.exports = function() {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne(
            {_id: id},
            '-password',
            function(err, user) {
                done(err, user);
            }
        );
    });

    require('./strategies/passport-local-conf.js')();
};