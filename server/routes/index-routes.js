var express = require('express');
var indexRouter = express.Router();
var controller = require('./../controller/index-controller.js');
require('../config/express-conf.js');

indexRouter.route('/index')
    .get(controller.prototype.indexPage)
    .post()
    .delete();

indexRouter.route('/login')
    .get()
    .post(controller.prototype.loginUser)
    .delete();

module.exports = indexRouter;