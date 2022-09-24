const User = require('../../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { saltRounds } = require('../../config/removeMe');
const BcryptSalt = require('bcrypt-salt');

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
        // // const hash = bcrypt.hashSync(req.body.email, saltRounds);
        // const bs = new BcryptSalt(10);
        // req.body.user = bcrypt.hashSync(req.body.email, bs.saltRounds);
        // req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
        req.body.username_1 = 'asdf';
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
  find: async (req, res) => {
    const searchParam = req.body.name;
    const regex = new RegExp(searchParam, 'i');
    const userFound = await User.find({
      name: { $regex: regex },
    });
    if (userFound.length > 0) {
      const response = userFound.map(({ name, _id }) => {
        return {
          name,
          url: `/user/profile/${_id}`,
        };
      });
      return res.status(200).json({
        data: {
          result: response,
        },
      });
    } else {
      return res.status(404).json({
        data: {
          result: { name: 'No user found.' },
        },
      });
      console.log('Nothing Found');
    }
  },
};
