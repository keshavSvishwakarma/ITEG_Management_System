const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/user/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

module.exports = passport;
