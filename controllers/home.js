const Post = require('../models/post');
const User = require('../models/user');
const { all } = require('../routes');

module.exports = {
  home: async function (req, res) {
    try {
      let posts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate('user')
        .populate({ path: 'comments', populate: { path: 'user' } });

      let users = await User.find({});

      return res.render('home', {
        users: users || [],
        posts: posts || [],
      });
    } catch (error) {
      req.flash('error', 'Something went wrong!');
      res.redirect('/');
    }
  },
};
