const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  date: Date,
  time: String,
  status: String,
  notes: String
});

module.exports = mongoose.model('Appointment', schema);