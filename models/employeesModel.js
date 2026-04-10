const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  phone: String,
  email: String,
  hireDate: Date,
  salary: Number,
  status: String
});

module.exports = mongoose.model('Employee', schema);