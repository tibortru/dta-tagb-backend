var express = require('express');
var indexRouter = express.Router();
var controller = require('./../controller/index-controller.js');
require('../config/express-conf.js');

indexRouter.route('/')
    .get(controller.prototype.renderIndex)
    .post()
    .delete();

module.exports = indexRouter;