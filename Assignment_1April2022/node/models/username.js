const mongoose = require('mongoose');
const UsernameSchema = new mongoose.Schema({
  username: {type: String, required: true, maxLength: 15},
});

module.exports = mongoose.model('Username', UsernameSchema);
