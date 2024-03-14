const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");
// const protectRoute = require("../middleware/isAuth");

router.post("/menuUpload",async (req, res) => {
    try {
        const { ItemName, ItemPrice, ItemQuantity, ItemImage } = req.body;

        if (!ItemName || !ItemPrice || !ItemQuantity || !ItemImage) {
            return res.status(400).json({ message: "Invalid request body." });
        }

        const itemInfo = {
                ItemName,
                ItemPrice,
                ItemQuantity,
                ItemImage,
        };

        await Menu.create(itemInfo);

        return res.status(201).json({ message: "Menu uploaded successfully." });
    } catch (error) {
        console.error("Error in /menuUpload:", error);
        return res.status(500).json({ error: "Internal Server error." });
    }
});

module.exports = router;
