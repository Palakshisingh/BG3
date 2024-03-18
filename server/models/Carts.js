const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        itemName: {
            type: String,
            required: true
        },
        itemPrice: {
            type: Number,
            required: true
        },
        itemImage: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        }
    }],
    canteenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner' 
    }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
