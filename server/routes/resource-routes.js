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

var imgMulter = multer({
    storage: imageStorage ,
    limits:{
        fileSize:2*1024*1024
    },
    fileFilter: function (req, file, cb) {

        // The function should call `cb` with a boolean
        // to indicate if the file should be accepted

        // To reject this file pass `false`, like so:
        if (file.mimetype !== 'image/png'
            && file.mimetype !== 'image/jpg'
            && file.mimetype !== 'image/jpeg'
            && file.mimetype !== 'image/gif') {
            console.log('Got file of type', file.mimetype);
            return cb('Only image files are allowed!');
        }

        // To accept the file pass `true`, like so:
        cb(null, true);

    }
});
var audioMulter = multer({ dest: './uploads/audio/' });
require('../config/express-conf.js');

resourceRouter.route('/uploads/images/:poiId')
    .post(userController.prototype.requiresLogin,
            imgMulter.single('file'),
            resourceController.prototype.removeImage,
            poiController.prototype.updatePoiImage);

resourceRouter.route('/uploads/images/:filename')
    .get(userController.prototype.requiresLogin, resourceController.prototype.getImage);

module.exports = resourceRouter;