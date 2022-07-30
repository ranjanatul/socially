const User = require('../../models/user');
const fs = require('fs');
const path = require('path');

module.exports = {
  profile: function (req, res) {
    User.findById(req.params.id || req.user.id)
      .then((user) => {
        if (user) {
          return res.render('profile', {
            user_profile: user || [],
          });
        } else {
          req.flash('error', 'Please login to continue!');
          return res.redirect('/');
        }
      })
      .catch((err) => {
        req.flash('error', err);
        return res.redirect('/');
      });
  },
  edit: async function (req, res) {
    try {
      let user = await User.findById(req.user.id);
      if (user) {
        User.upload(req, res, function (err) {
          if (err) {
            console.log('****Multer****', err);
          }
          user.name = req.body.name;
          user.email = req.body.email;
          if (req.file) {
            if (user.avatar && fs.existsSync()) {
              fs.unlinkSync(__dirname, '..', user.avatar);
            }
            user.avatar = User.avatarPath + '/' + req.file.filename;
          }

          user.save();
          return res.redirect('/user/profile');
        });
      }
    } catch (err) {
      console.log('Error:', err);
    }
  },
};
