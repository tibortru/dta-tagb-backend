var express = require('express');
var userRouter = express.Router();
var controller = require('./../controller/user-controller.js');
var passport = require('passport');
require('../config/express-conf.js');

userRouter.route('/reset-password')
    .get()
    .post(controller.prototype.resetUserPassword)
    .delete();

userRouter.route('/users')
    .get(controller.prototype.getAllUsers)
    .post()
    .delete();

userRouter.route('/users/:username')
    .get(controller.prototype.getUserByUsername)
    .post(controller.prototype.updateUser)
    .delete(controller.prototype.deleteUser);

userRouter.route('/login')
    .get(controller.prototype.renderLogin)
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

userRouter.route('/logout')
    .get(controller.prototype.logoutUser);

userRouter.route('/register')
    .get(controller.prototype.renderRegister)
    .post(controller.prototype.registerUser)
    .delete();

module.exports = userRouter;