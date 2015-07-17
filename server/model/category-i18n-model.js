var mongoose = require('mongoose');

CategoryI18nSchema = new mongoose.Schema({
    name: { type : String, required : true },
    locale: { type : String, required : true }
});

CategoryI18nSchema.index({ name: 1, locale: 1}, { unique: true });

var CategoryI18n = mongoose.model('CategoryI18n', CategoryI18nSchema);

module.exports = CategoryI18n;