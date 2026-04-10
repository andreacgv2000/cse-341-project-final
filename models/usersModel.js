const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  role: { type: String, default: 'user' }
}, { timestamps: true });

module.exports = mongoose.model('User', schema);