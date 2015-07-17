var Category = require('../model/category-model.js');
var express = require('express');
var categoryRouter = express.Router();
var controller = require('./category-controller.js');
require('../config/express-conf.js');

categoryRouter.route('/')
    .get(controller.prototype.getAllCategories)
    .post(controller.prototype.createCategoryI18n)
    .delete();

categoryRouter.route('/locale=:locale')
    .get(controller.prototype.getCategoryByLocale)
    .post()
    .delete();


categoryRouter.route('/locale=:locale/name=:name')
    .get(controller.prototype.findOneCategory)
    .post()
    .delete();

module.exports = categoryRouter;