const User = require('../../models/user');

module.exports = {
  authentication: (req, res) => {
    return res.render('auth');
  },
  signup: (req, res) => {
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
          User.create(req.body).then((response) => {
            return res.render('profile');
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
    console.log(req.body);
    if (!req.body.password || !req.body.email) {
      return res.render('auth');
    }
    User.findOne({ email: req.body.email, password: req.body.password })
      .then((user) => {
        if (!user) {
          return res.render('auth');
        } else {
          return res.render('profile');
        }
      })
      .catch((error) => {
        console.error(error);
        return res.render('auth');
      });
  },
};
