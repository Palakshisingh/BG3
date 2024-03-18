const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");
//add to cart function
router.post("/addtocart", async (req, res) => {
    try {
        //take data from req body to upload to cart
        const { itemName, itemPrice, itemImage} = req.body;

        const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 
        console.log("JWT Token from Request Cookies:", token); 

        if (!token) {
            throw new Error("JWT token not provided in request cookies");
        }

        // verify the token
        //decode the payload
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Payload:", decodedToken); 

        // Extract the userId from the decoded token
        const userId = decodedToken.ownerId;
        let cart = await Cart.findOne({ userId });

        // If the cart doesn't exist --> create a new one
        if (!cart) {
            cart = new Cart({ userId });
        }

        // Add to cart
        cart.items.push({ itemName, itemPrice, itemImage, canteenId });
        await cart.save();

        res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error("Error adding item to cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = router;
//delete cart function
