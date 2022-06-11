const User = require('../../models/user');

module.exports = {
  authentication: (req, res) => {
    return res.render('auth');
  },
  signup: (req, res) => {
    console.log(req.body);
    User.create({ ...req.body })
      .then((response) => {
        return res.render('profile');
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  },
  login: (req, res) => {
    User.find({ ...req.body })
      .then((response) => {
        console.log(response);
        return res.render('profile');
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  },
};
