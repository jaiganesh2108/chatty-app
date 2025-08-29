const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // changed from username
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true } // changed from password
});

const User = mongoose.model("User", userSchema);

module.exports = User;