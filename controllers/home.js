const Post = require('../models/post');

module.exports.home = function (req, res) {
  if (req.isAuthenticated) {
    Post.find({})
      .populate('user')
      .populate({ path: 'comments', populate: { path: 'user' } })
      .then((posts) => {
        return res.render('home', {
          posts,
        });
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  } else {
    return res.render('home', { posts: [] });
  }
};
