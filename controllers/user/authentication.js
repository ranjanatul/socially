const User = require('../../models/user');

module.exports = {
  authentication: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/user/profile');
    }
    return res.render('auth', {
      title: 'socially | lets connect',
    });
  },
  signup: (req, res) => {
    if (req.isAuthenticated()) {
      return res.redirect('/user/profile');
    }
    if (
      req.body.password !== req.body.password2 ||
      !req.body.password ||
      !req.body.email ||
      !req.body.name
    ) {
      return res.render('auth');
    }
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          User.create(req.body).then((user) => {
            return res.render('profile', {
              user,
            });
          });
        } else {
          return res.render('auth');
        }
      })
      .catch((error) => {
        console.error(error);
        return res.render('auth');
      });
  },
  login: (req, res) => {
    return res.redirect('/user/profile');
  },
  logout: (req, res) => {
    req.logout(function (err) {
      console.log(err || 'Logged out successfully!');
    });
    return res.redirect('/');
  },
};
