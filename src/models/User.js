const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  credits: { type: Number, default: 0 },
  successfulWorkShifts: { type: Number, default: 0 },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
