const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    userName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : mongoose.Schema.Types.ObjectId,
    }
    
});

const User = mongoose.model("User", userSchema);
module.exports = User;