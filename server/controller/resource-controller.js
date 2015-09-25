// Inject dependencies
var fs = require('fs');
var Poi = require('../model/poi-model.js');

// Declare object constructor
function resourceController() {
}

function deleteImage(image) {
    fs.unlink(image);
}

resourceController.prototype.removeImage = function (req, res, next) {
    Poi.findById(req.params.poiId, function (error, data) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        }).then(function (resolved) {
                var oldPhoto = resolved._doc.photo;
                if (oldPhoto) {
                    deleteImage(oldPhoto);
                }
                next();
            })
            .catch(function (rejected) {
                res.status(500).json({'error': 'Point of interest doesn\'t exist!'});
            });
    });
};


resourceController.prototype.getImage = function(req, res) {
    var fileName = req.params.filename;
    var options = {
        root: 'uploads/images',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    res.sendFile(fileName, options, function(error){
        if(error){
            res.status(error.status).end();
        }
    });
};

module.exports = resourceController;