const express = require("express");
const router = express.Router();
const Canteen = require("../models/canteens");
// const protectRoute = require("../middleware/isAuth");
//route for owner to post canteen info to the db and register his canteen.
router.post("/ownerPost",async (req, res) => {
    try {
        const { canteenName, canteenDescription, canteenLocation, canteenImage } = req.body;

        if (!canteenName || !canteenDescription || !canteenLocation || !canteenImage) {
            return res.status(400).json({ message: "Invalid request body." });
        }

        const canteenInfo = {
            canteenName,
            canteenDescription,
            canteenLocation,
            canteenImage
        };

        await Canteen.create(canteenInfo);

        return res.status(201).json({ message: "Canteen registered successfully." });
    } catch (error) {
        console.error("Error in /ownerPost:", error);
        return res.status(500).json({ error: "Internal Server error." });
    }
});

module.exports = router;
