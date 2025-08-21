const mongoose = require("mongoose")

const connectDB = async (uri) => {
    await mongoose.connect(uri);
    console.log("mangoDB connected successfully!")
};

module.exports = connectDB;