// Inject dependencies
var Category = require('../model/category-model.js');
var CategoryI18n = require('../model/category-i18n-model.js');

// Declare object constructor
function categoryController() {
}

// Create controller object and it's methods
categoryController.prototype.getAllCategories = function (req, res) {
  Category.find({'i18ns': { locale : 'en_US'}}).populate('i18ns')
                   .exec(function (error, categories) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(categories);
      }
    }).then(function (data) {
          res.status(200).json(categories);
        }).catch(function (error) {
          res.status(500).send(new Error('An error brah'));
        });
  });
};

categoryController.prototype.createCategoryI18n = function (req, res) {
  CategoryI18n.create({
    name: req.body.name,
    locale: req.body.locale
  }, function (error, cati18n) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(cati18n);
      }
    }).then(function (data) {
          categoryController.prototype.createCategory(data, res);
        }).catch(function (error) {
          res.status(500).send(new Error('An error brah'));
        });
  });
};

categoryController.prototype.createCategory = function (req, res) {
  Category.create({i18ns:[req]}, function (error, cat) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(cat);
      }
    }).then(function (data) {
          res.status(201).json(cat);
        }).catch(function (error) {
          res.status(500).send(new Error('An error brah'));
        });
  });
};

categoryController.prototype.getCategoryByLocale = function (req, res) {
  var categoryParams = {
    locale: req.params.locale
  };
  Category.find(categoryParams, function (error, category) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(category);
      }
    }).then(function (resolved) {
          res.status(200).json(resolved);
        }).catch(function (rejected) {
          res.status(500).send(new Error('Error occurred bro'));
        });
  });
};

categoryController.prototype.findOneCategory = function (req, res) {
  var categoryParams = {
    locale: req.params.locale,
    name: req.params.name
  };
  Category.findOne(categoryParams, function (error, category) {
    return new Promise(function (resolve, reject) {
      if (error) {
        reject(error);
      } else {
        resolve(category);
      }
    }).then(function (resolved) {
          res.status(200).json(resolved);
        }).catch(function (rejected) {
          res.status(500).send(new Error('Error occurred bro'));
        });
  });

};

module.exports = categoryController;