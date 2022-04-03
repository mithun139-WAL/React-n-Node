var mongoose = require('mongoose');
var ForumSchema = new mongoose.Schema({
  title: {type: String, required: true, minlength: 10, maxLength: 100},
  author: {type: String, required: true, minlength: 5, maxLength: 50},
  date_of_creation: {type: Date},
  body: {type: String, required: true, minlength: 50, maxLength: 500},
});
module.exports = mongoose.model('Forum', ForumSchema);
