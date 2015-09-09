// Declare object constructor
function indexController() {
}

// Create controller object and it's methods
indexController.prototype.renderIndex = function (req, res) {
    res.render('index', {
        title: 'TAGB - Tourist Audio Guide Belgrade',
        user: JSON.stringify(req.user)
    });
};

module.exports = indexController;