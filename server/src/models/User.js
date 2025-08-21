const mangoose = require("mongoose");

const userSchema = new mongoose.schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 32,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        lowercase: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },}, { Timestamp: true });

model.exports = mongoose.model("User", userScheme);