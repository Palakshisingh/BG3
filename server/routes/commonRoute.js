const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/isAuth');

router.post('/gethome', (req, res, next) => {
    // Pass the req object to the protectRoute middleware
    protectRoute(req, res, next);
}, (req, res) => {
    // Check if status is 200
    if (res.statusCode === 200) {
        res.redirect("http://localhost:3000/ownerlogin");
        console.log("common accessed");
    } else {
        // Redirect to login page if status is not 200
        res.redirect("http://localhost:3000/login");
    }
});

router.post('/getownermenu', (req, res, next) => {
    // Pass the req object to the protectRoute middleware
    protectRoute(req, res, next);
}, (req, res) => {
    // Check if status is 200, then send welcome message
    if (res.statusCode === 200) {
        res.redirect("http://localhost:3000/ownerMenu");
        console.log("commonroute accessed");
    } else {
        // Redirect to login page if status is not 200
        res.redirect("http://localhost:3000/ownerlogin");
    }
});

module.exports = router;
