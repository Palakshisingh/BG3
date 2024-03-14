const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/isAuth');
//route for homepage
router.post('/gethome', (req, res, next) => {
    // Pass the req object to the protectRoute middleware
    protectRoute(req, res, next);
}, (req, res) => {

    if (res.statusCode === 200) {
        res.redirect("http://localhost:3000/ownerlogin");
        console.log("common accessed");
    } else {

        res.redirect("http://localhost:3000/login");
    }
});
//route for owner's menu page
router.post('/getownermenu', (req, res, next) => {
    // Pass the req object to the protectRoute middleware
    protectRoute(req, res, next);
}, (req, res) => {
    if (res.statusCode === 200) {
        res.redirect("http://localhost:3000/ownerMenu");
        console.log("commonroute accessed");
    } else {
        res.redirect("http://localhost:3000/ownerlogin");
    }
});

module.exports = router;
