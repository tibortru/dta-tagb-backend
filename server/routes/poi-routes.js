var express = require('express');
var poiRouter = express.Router();
var poiController = require('./../controller/poi-controller.js');
var userController = require('./../controller/user-controller.js');

poiRouter.route('/pois')
    .get(userController.prototype.requiresLogin, poiController.prototype.getAllPois)
    .post(userController.prototype.requiresLogin, poiController.prototype.createPoi);

poiRouter.route('/pois/:poiId')
    .get(userController.prototype.requiresLogin, poiController.prototype.getPoiById)
    .put(userController.prototype.requiresLogin, poiController.prototype.updatePoi)
    .delete(userController.prototype.requiresLogin, poiController.prototype.deletePoi);

module.exports = poiRouter;