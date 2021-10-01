var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarSchema = new Schema({
  make: String,
  model: String,
  colour: String
});

module.exports = mongoose.model('Cars', CarSchema);
