const User = require('../../models/user');
const passport = require('passport');

module.exports = {
  authentication: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/user/profile');
    }
    req.flash('error', 'Please login to continue!');
    return res.render('auth', {
      title: 'socially | lets connect',
    });
  },
  signup: async (req, res) => {
    try {
      if (req.isAuthenticated()) {
        req.flash('error', 'You are already logged in!');
        return res.redirect('/user/profile');
      }

      if (
        req.body.password !== req.body.password2 ||
        !req.body.password ||
        !req.body.email ||
        !req.body.name
      ) {
        req.flash('error', 'Please provide all the required details.');
        return res.render('auth');
      }

      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        let newUser = await User.create(req.body);
        if (newUser) {
          return res.render('auth');
        }
      }
      req.flash('error', 'User already present. Please login.');
      return res.render('auth');
    } catch (error) {
      console.error(error);
      return res.render('auth');
    }
  },
  login: (req, res) => {
    req.flash('success', 'Logged in successfully!');
    return res.redirect('/user/profile');
  },
  logout: (req, res) => {
    req.logout(function (err) {
      if (err) {
        console.log(err);
      }
    });
    // if using console.log before or after req.flash, then it is creating issue in printing the message on the uI side.
    req.flash('success', 'Logged out successfully!');
    return res.redirect('/');
  },
};
