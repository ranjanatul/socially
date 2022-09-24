const { Like, Dislike } = require('./utils/consts');
const { genericResponse } = require('./utils/response');
const User = require('../models/user');
const Friend = require('../models/friends');

module.exports = {
  add: async function (req, res) {
    try {
      // /friends/add?fid=
      if (req.query.fid && req.query.fid !== '') {
        const to = await User.findOne({ _id: req.query.fid });
        const existingFriend = await Friend.findOne({
          from: req.user.id,
          to: req.query.fid,
        });

        if (existingFriend) {
          return genericResponse({ code: 400, res, msg: 'Incorrect request' });
        }
        if (to) {
          const entryDone = await Friend.create({
            from: req.user.id,
            to: req.query.fid,
            accepted: false,
          });
          try {
            const friendListUpdated = await User.findByIdAndUpdate(
              req.user.id,
              {
                $push: { friends: entryDone._id },
              }
            );
            console.log(friendListUpdated);
          } catch (err) {
            throw err;
          }

          // await User.findById(req.query.id).friends.push(req.query.fid).save();
          if (entryDone) {
            return genericResponse({
              code: 200,
              res,
              msg: 'Added successfully',
            });
          }
        } else {
          return genericResponse({ code: 400, res, msg: 'Incorrect request' });
        }
      }
    } catch (error) {
      console.log(error);
      return genericResponse({ code: 500, res, msg: error });
    }
  },
  delete: async function (req, res) {
    try {
      // /friends/delete?fid=
      if (req.query.id && req.query.id !== '') {
        // const to = await User.findOne({ _id: req.query.fid });
        const existingFriend = await Friend.findOne(req.query.fid);

        if (existingFriend) {
          await existingFriend.remove();
          await User.findByIdAndUpdate(req.user.id, {
            $pull: { _id: req.query.id },
          });
          return genericResponse({
            code: 200,
            res,
            msg: 'Friend removed successfully',
          });
        } else {
          throw '404';
        }
      } else {
        throw '400';
      }
    } catch (error) {
      switch (error) {
        case '404': {
          return genericResponse({ code: error, res, msg: 'Nothing Found' });
        }
        case '400': {
          return genericResponse({
            code: error,
            res,
            msg: 'Incorrect request',
          });
        }
        default: {
          console.log(error);
          return genericResponse({ code: 500, res, msg: error });
        }
      }
    }
  },
};
