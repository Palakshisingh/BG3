const mongoose = require("mongoose");

const canteenSchema = mongoose.Schema({
    canteenName: {
        type: String,
        required: true,
    },
    canteenImage: {
        type: String,
        requried: false,
    },
    canteenDescription: {
        type: String,
        requried: true,
    },
    canteenLocation: {
        type: String,
        requried: true,
    }
});

const canteen = mongoose.model("canteen", canteenSchema);
module.exports = canteen;
