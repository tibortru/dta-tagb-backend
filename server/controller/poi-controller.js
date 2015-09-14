// Inject dependencies
var Poi = require('../model/poi-model.js');

//TODO Move to separate utils JS
var getErrorMessages = function (err) {
    var messages = new Array();

    for (var errName in err.errors) {
        if (err.errors[errName].message)
            messages.push(err.errors[errName].message);
    }
    return messages;
};

// Declare object constructor
function poiController() {
}

poiController.prototype.createPoi = function (req, res) {
    var poiParams = {
        title: req.body.title,
        photo: req.body.photo,
        audio: req.body.audio,
        coordinates: req.body.coordinates,
        createdBy: req.user
    };
    Poi.create(poiParams, function (error, poi) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject(error);
            } else {
                resolve(poi);
            }
        }).then(function (data) {
                res.status(201).json(poi);
            }).catch(function (error) {
                return res.status(400).send({
                    message: getErrorMessages(error)
                });
            });
    });
};

// Create controller object and it's methods
poiController.prototype.getAllPois = function (req, res) {
    Poi.find({}, function (error, users) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject(error);
            } else {
                resolve(users);
            }
        }).then(function (data) {
                res.status(200).json(data);
            }).catch(function (error) {
                res.status(500).send(new Error('An error brah'));
            });
    });
};

poiController.prototype.getPoiById = function (req, res) {
    Poi.findById(req.params.poiId).populate('createdBy', 'name username').exec(function (error, user) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        }).then(function (resolved) {
                if(resolved!=null && resolved.length!==0) {
                    res.status(200).json(resolved);
                }else {
                    res.status(500).json({'error':'Point of interest doesn\'t exist!'});
                }
            }).catch(function (rejected) {
                res.status(500).send(new Error('Error occurred bro'));
            });
    });
};

poiController.prototype.updatePoi = function (req, res) {
    var updateParams = {
        title: req.body.title,
        photo: req.body.photo,
        audio: req.body.audio,
        coordinates: req.body.coordinates
    };
    Poi.findOneAndUpdate({_id: req.params.poiId},
        updateParams, function (error, user) {
            return new Promise(function (resolve, reject) {
                if (error) {
                    reject(error);
                } else {
                    resolve(user);
                }
            }).then(function (resolved) {
                    if(resolved!=null && resolved.length!==0) {
                        res.status(200).json(resolved);
                    }else {
                        res.status(500).json({'error':'Point of interest doesn\'t exist!'});
                    }
                }).catch(function (rejected) {
                    res.status(500).send(new Error('Error occurred bro'));
                });
        });
};

poiController.prototype.deletePoi = function (req, res) {
    Poi.findByIdAndRemove(req.params.poiId, function (error, user) {
        return new Promise(function (resolve, reject) {
            if (error) {
                reject(error);
            } else {
                resolve(user);
            }
        }).then(function (resolved) {
                if(resolved!=null) {
                    res.status(200).json({'success':'Deleted.'});
                }else {
                    res.status(500).json({'error':'Point of interes doesn\'t exist!'});
                }
            }).catch(function (rejected) {
                res.status(500).send(new Error('Error occurred bro'));
            });
    });
};

module.exports = poiController;