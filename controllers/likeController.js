const { Like, Dislike } = require('./utils/consts');
const { genericResponse } = require('./utils/response');
const Comment = require('../models/comment');
const Post = require('../models/post');
const LikeModel = require('../models/like');

module.exports = {
  toggleLike: async function (req, res) {
    try {
      if (req.query.category && req.query.type && req.query.id) {
        // likes/toggle/?id=abcdef&type=Post&category
        let likeable;
        let deleted = false;
        if (req.query.type.toUpperCase() == 'post'.toUpperCase()) {
          likeable = await Post.findById(req.query.id).populate('likes');
        } else {
          likeable = await Comment.findById(req.query.id).populate('likes');
        }

        if (!likeable) {
          return genericResponse({
            code: 400,
            res,
            msg: 'You are trying something wrong!',
          });
        }

        // if nothing present not liked not disliked
        // if liked -> like entry made or dislike updated to like
        // if unliked -> like entry deleted
        // if disliked -> dislike entry made or like updated to dislike
        // if undisliked -> dislike entry deleted
        // value = like[lk]/remove-like[rlk]/dislike[dlk]/remove-dislike[rdlk]
        let value;

        if (req.query.category === Like) {
          value = 'liked';
        } else if (req.query.category === Dislike) {
          value = 'disliked';
        } else {
          return genericResponse({
            code: 400,
            res,
            msg: 'You are trying something wrong!',
          });
        }

        // check if a like already exist
        let existingLike = await LikeModel.findOne({
          likeable: req.query.id,
          onModle: req.query.type,
          user: req.user._id,
        });

        if (existingLike && existingLike.value === value) {
          // likeable.likes.pull({ likeId: existingLike._id });
          likeable.likes.pull(existingLike._id);
          likeable.save();
          existingLike.remove();
          deleted = true;
        } else if (existingLike && existingLike.value !== value) {
          // const existingKeyId = existingLike.value.indexOf('like') > -1 ? "likeId" : "dislikeId";
          // const newKeyId = value.indexOf('like') > -1 ? "likeId" : "dislikeId";
          // Post.updateOne({_id: req.query.id},{$set: {[existingKeyId]: undefined, [newKeyId]: existingLike._id}});
          await existingLike.update({ value: value });
        } else {
          // else make a new like
          let newLike = await LikeModel.create({
            user: req.user._id,
            onModel: req.query.type,
            likeable: req.query.id,
            value: value,
          });

          likeable.likes.push(newLike._id);
          likeable.save();
        }

        return res.json(200, {
          message: 'success',
          data: {
            deleted: deleted,
          },
        });
      } else {
        console.log('Like, dislike, id or type missing in the request query.');
        return genericResponse({
          code: 400,
          res,
          msg: 'Please send a valid request.',
          err: 'Like, dislike, id or type missing in the request query.',
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
