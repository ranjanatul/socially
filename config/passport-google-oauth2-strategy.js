const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// passing google strategy to the passport
// it returns profile which contains the user information of google
passport.use(
  new googleStrategy(
    {
      clientID:
        '882805485844-jml8t6kknbjr6srt80o9unl1hdfljsha.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8000/users/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      User.findOne({ email: profile.emails[0].value }, function (err, user) {
        if (err) {
          console.log('EROR:', err);
          return;
        }
        if (user) {
          return done(null, user);
        } else {
          User.create(
            {
              email: profile.emails[0].value,
              name: profile.displayName,
              password: crypto.randomBytes(20).toString('hex'),
              avatar: profile.photos[0] && profile.photos[0].value,
            },
            function (err, user) {
              if (err) {
                console.log('EROR:', err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;
