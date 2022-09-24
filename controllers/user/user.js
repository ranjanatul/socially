const User = require('../../models/user');
const fs = require('fs');
const path = require('path');

module.exports = {
  profile: async function (req, res) {
    // const user = req.user
    try {
      let friendshipStatus;
      let isFriend;
      let requestedProfile;
      const userProfile = await User.findById(req.user.id).populate([
        { path: 'friends' },
      ]);

      if (userProfile) {
        requestedProfile =
          req.params.id &&
          (await User.findById(req.params.id).populate([{ path: 'friends' }]));
        isFriend =
          req.params.id &&
          userProfile.friends.find(({ to }) => {
            console.log(to._id, req.params.id);
            return to._id == req.params.id;
          });
        // console.log('isFriend', isFriend);
        if (isFriend && isFriend.accepted) {
          friendshipStatus = true;
        } else if (isFriend && !isFriend.accepted) {
          friendshipStatus = false;
        }
      } else {
        console.log("User in the request doesn't exists");
        throw 'Incorrect response';
      }

      // console.log('userProfile', userProfile);
      // return res.status(200).json({
      //   user_profile: requestedProfile,
      //   friendshipStatus,
      // });
      return res.render('profile', {
        user_profile: (req.params.id && requestedProfile) || userProfile,
        friendshipStatus,
      });
    } catch (err) {
      console.log(err);
      req.flash('error', err);
      return res.redirect('/');
    }
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
