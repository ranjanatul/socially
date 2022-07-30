const Post = require('../models/post');
const Comment = require('../models/comment');
module.exports = {
  create: async function (req, res) {
    try {
      const post = await Post.create({
        content: req.body.content,
        user: req.user._id,
      });

      if (req.xhr) {
        // res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({
          data: {
            post: {
              ...post._doc,
              name: req.user.name,
            },
          },
          message: 'Post created.',
        });
      }
      req.flash('success', 'Post created successfully');
      return res.redirect('/');
    } catch (error) {
      if (req.xhr) {
        return res.status(500).json({
          responseText: error,
          message: 'Something went wrong.',
        });
      }
      req.flash('error', 'Something went wrong');
      return;
    }
  },
  delete: async function (req, res) {
    try {
      let post = await Post.findById(req.params.id);
      // .id converts the object id into string.
      // post.user will return "new objectId('asdfaserqwerqwer')" like this. to get it like string, we use
      // post.user.id then it will give 'asdfaserqwerqwer'
      if (post && post.user == req.user.id) {
        post.remove();
        // after removing the post, delete the comments for that post.
        await Comment.deleteMany({ post: req.param.id });

        if (req.xhr) {
          return res.status(200).json({
            data: {
              postId: req.params.id,
            },
            message: 'Post Deleted',
          });
        }

        req.flash('success', 'Post deleted successfully!');
        return res.redirect('/');
      } else {
        return res.status(400).json({
          message: 'Incorrect behavior',
        });
      }
    } catch (error) {
      console.log(err);
      req.flash('error', 'Something went wrong.');
      return res.redirect('/');
    }
  },
};
