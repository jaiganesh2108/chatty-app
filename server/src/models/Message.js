const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true,
    },
    senderID: {
        type: mongoose.Types.ObjectId, 
        ref: "User", 
        required: true,
    },
    senderName: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },},{ timestamps: true });
    
module.exports = mongoose.model("Message", userSchema);
