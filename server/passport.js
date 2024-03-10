const goth = require("./models/goth");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy

passport.use(new GoogleStrategy({
    clientID: '472353109993-bvebi129jggs6rbcmfru3mel9ufnrknf.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user based on profile data
      let user = await goth.findOne({ userName: profile.id });
      
      if (!user) {
        // Create new user with profile data
        const newUser = new goth({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value
        });
        await newUser.save();
        return done(null, newUser);
      } else {
        // User already exists
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;