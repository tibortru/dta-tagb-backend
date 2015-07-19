var express = require('express');
var userRouter = express.Router();
var controller = require('./../controller/user-controller.js');
require('../config/express-conf.js');

userRouter.route('/reset-password')
    .get()
    .post(controller.prototype.resetUserPassword)
    .delete();

userRouter.route('/users')
    .get(controller.prototype.getAllUsers)
    .post(controller.prototype.createUser)
    .delete();

userRouter.route('/users/:username')
    .get(controller.prototype.getUserByUsername)
    .post(controller.prototype.updateUser)
    .delete(controller.prototype.deleteUser);

module.exports = userRouter;