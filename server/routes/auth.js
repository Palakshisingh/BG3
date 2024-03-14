const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '472353109993-gjg126553g4he0fe7gs5ajepuoqpekv4.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
}, async function(accessToken, refreshToken, profile, done) {
    try {
        let existingUser = await goth.findOne({ email : profile.emails[0].value });

        if (existingUser) {
            return done(null, existingUser);
        } else {
            const newUser = new goth({
                googleId: profile.id,
                userName: profile.displayName, 
                displayName: profile.displayName,
                email: profile.emails[0].value
            });
            await newUser.save();
            return done(null, newUser);
        }
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    goth.findById(id, (err, user) => {
        done(err, user);
    });
});

router.post('/register',async (req, res) => {
    console.log("Register Route accessed");

    try {
        const { username, email, password } = req.body;
        console.log("Request Body:", req.body);

        if (!username || !email || !password) {
            console.log("Invalid request body");
            return res.status(400).json({ error: "Invalid request body" });
        }

        const existingUserByEmail = await User.findOne({ email: email.trim() });
        const existingUserByUsername = await User.findOne({ username: username.trim() });

        if (existingUserByEmail || existingUserByUsername) {
            console.log("User with email or username already exists");
            return res.status(409).json({ error: "A user with this email or username already exists" });
        }
        console.log("Creating a new user");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserDetails = {
            userName: username, 
            email,
            password: hashedPassword,
        };

        const newUser = await User.create(newUserDetails);
        console.log("New User Created:", newUser);

        return res.status(200).json({ message: "User created successfully" });
        
    } catch (error) {
        console.error("Error in route:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login route for local authentication
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });

        // If user doesn't exist, return error
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords don't match, return error
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5d' });

        // Send token in response
        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error in login route:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// OAuth2 authentication route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect to home page
        const redirectUrl = 'http://localhost:3000/home';
        res.redirect(redirectUrl);
    }
);

module.exports = router;
