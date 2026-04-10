const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  duration: Number,
  category: String
}, { timestamps: true });

module.exports = mongoose.model('Service', schema);