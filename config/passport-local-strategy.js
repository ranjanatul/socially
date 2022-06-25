const passport = require('passport');

const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

// establishing a local strategy for finding the user and handling if user not found
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function verify(email, password, done) {
      User.findOne({ email }, function (err, user) {
        if (err) {
          console.error(err);
          return done(err);
        }
        if (!user || user.password != password) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serialize the user id found for the user
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// deserialize the user coming from the browser request
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.error(err);
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
  });
});

// check if the user is authenticated then only pass to the protected controllers
passport.checkAuthentication = function (req, res, next) {
  // req.isAuthenticated is a function set by passport for verification of the authenticated user.
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/user/auth');
};

// if user is authenticated then set the current user to the session response to access it in the views.
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // setting the session user in the response locals. which we are sending to the views.
    // req.user is created by passport.
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
