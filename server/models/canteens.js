const mongoose = require("mongoose");

const canteenSchema = mongoose.Schema({

    username : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        requried : true,
    },
    menu : {
        type : Buffer,
        contentType : String,
    }
});

const Canteens = mongoose.model("Canteens", canteenSchema);
module.exports = Canteens;