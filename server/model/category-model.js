var mongoose = require('mongoose');

CategorySchema = new mongoose.Schema({
  i18ns: [{type: mongoose.Schema.Types.ObjectId, ref: 'CategoryI18n'}]
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;