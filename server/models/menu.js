const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    itemImage: {
        type: String,
        required: true,
    },
    canteenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'canteen'
    }
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
