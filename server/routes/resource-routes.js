var express = require('express');
var resourceRouter = express.Router();
var resourceController = require('./../controller/resource-controller.js');
var userController = require('./../controller/user-controller.js');
var poiController = require('./../controller/poi-controller.js');

//MULTER
var multer  = require('multer');
var imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/images/')
    }
});
var imgMulter = multer({ storage: imageStorage });
var audioMulter = multer({ dest: './uploads/audio/' });
require('../config/express-conf.js');

resourceRouter.route('/uploads/images/:poiId')
    .post(userController.prototype.requiresLogin,
            resourceController.prototype.removeImage,
            imgMulter.single('file'),
            poiController.prototype.updatePoiImage);

resourceRouter.route('/uploads/images/:filename')
    .get(userController.prototype.requiresLogin, resourceController.prototype.getImage);

module.exports = resourceRouter;