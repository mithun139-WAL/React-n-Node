var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
  name: {type: String, required: true, maxLength: 100},
  price: {type: Number, required: true},
  availability: {type: Boolean, required: true},
});
module.exports = mongoose.model('Product', ProductSchema);
