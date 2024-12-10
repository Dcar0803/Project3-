const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  membershipDate: { type: Date, default: Date.now },
  membershipType: { type: String, enum: ['Standard', 'Premium'], required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Member', memberSchema);
