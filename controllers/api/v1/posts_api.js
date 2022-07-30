const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
        },
      });
    return res.json(200, {
      message: 'List of posts',
      posts: posts,
    });
  } catch (error) {}
};

module.exports.delete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({
        message: 'Post not found',
      });
    }

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      return res.json(200, {
        message: 'post deleted.',
      });
    }
    return res.status(401).json({
      message: 'You are not authorized to perform this operation.',
    });
  } catch (error) {
    console.log('ERROR:', error);
    return res.json(500, {
      message: 'Internal server error.',
    });
  }
};
