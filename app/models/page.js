var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Page', new Schema({
    title: String,
    body: String,
    user: String,
    url: String
}));
