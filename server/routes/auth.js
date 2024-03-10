const express = require('express');
const router = express.Router();
const session = require('express-session');
const User = require("../models/User");
const goth = require("../models/goth")
const bcrypt = require("bcrypt");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

router.use(session({
    secret: 'fstiwrhsb', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, 
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000 
    }
}));


passport.use(new GoogleStrategy({
  clientID: '472353109993-bvebi129jggs6rbcmfru3mel9ufnrknf.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: '/auth/google/callback'
}, async function(accessToken, refreshToken, profile, done) {
  try {
      // Check if a user with the same Google ID already exists
      let existingUser = await goth.findOne({ email : profile.emails[0].value });

      if (existingUser) {
          // Redirect the existing user to the login page
          return done(null, existingUser);
      } else {
          // Create a new user with profile data
          const newUser = new goth({
              googleId: profile.id,
              userName: profile.displayName, // You can change this according to your requirements
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

router.post("/login", async (req, res) => {
    console.log("Login Route accessed");

    const { email, password } = req.body;
    console.log("Received login request with email:", email);

    if (!email || !password) {
        console.log("Invalid request body: Missing email or password");
        return res.status(400).json({ error: "Invalid request body" });
    }

    try {
        const user = await User.findOne({ email: email.trim() });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log("Invalid password for email:", email);
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Set session data
        req.session.user = user;

        // Log session token info
        console.log("Session ID:", req.sessionID);
        console.log("Session Data:", req.session);

        // If username and password are valid, return success
        console.log("Login successful for email:", email);
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error in login route:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/home", (req, res) => {
    // Check if user is logged in (session contains user data)
    if (req.session.user) {
        return res.render("home", { user: req.session.user });
    }
    const redirectUrl = 'http://localhost:3000/home'; // Adjust the port as needed
    res.redirect(redirectUrl);
});

// OAuth2 authentication route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to home page
    const redirectUrl = 'http://localhost:3000/home'; // Adjust the port as needed
    res.redirect(redirectUrl);
  }
);


module.exports = router;
