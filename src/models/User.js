const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
  successfulWorkShifts: {
    type: Number,
    default: 0,
  },
});

module.exports = model("userSchema", userSchema);
