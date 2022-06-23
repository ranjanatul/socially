const User = require('../../models/user');

module.exports.profile = function (req, res) {
  User.findById(req.cookies.userId)
    .then((user) => {
      if (user) {
        console.log(user);
        return res.render('profile', {
          title: `${user.name} | profile`,
          name: user.name,
          email: user.email,
        });
      } else {
        return res.render('auth');
      }
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};
