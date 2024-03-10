const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const LocalStrategy = require('passport-local').Strategy; 
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const app = express();
const User = require("./models/User");
const auth = require('./routes/auth')
app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'fstiwrhsb', resave: false, saveUninitialized: false }));
app.use('/register', auth);
// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization and deserialization
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(async function(id, done) {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (error) {
      done(error);
  }
});

fs.readdirSync('./routes').map((r)=> app.use(require('./routes/' + r)));
mongoose
  .connect("mongodb+srv://altshreyas:fstiwrhsb@cluster0.420rowf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB Error => ", err))
  
const port = process.env.PORT || 8000;
const server = app.listen(port,()=> console.log(`server is running ${port}`));