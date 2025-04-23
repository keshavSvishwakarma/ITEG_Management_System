const mongoose = require('mongoose');
// const Admin = require('../modules/Admin/models/adminmodels');

const UserSchema = new mongoose.Schema({
  position: { type: String, required: true}, // role in college 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  adharCard: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin'},// role in the application 
  department: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);