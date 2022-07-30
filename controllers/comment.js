const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const commentMailer = require('../mailers/newComment_mailers');

module.exports = {
  create: async (req, res) => {
    // validate the post id
    try {
      let post = await Post.findById(req.body.post);

      if (post) {
        let comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });
        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user', 'name email');
        // this will be handled by redis
        // commentMailer.newComment(comment);
        let job = queue.create('emails', comment).save(function (err) {
          if (err) {
            console.log('error is creating queue');
          }
          console.log(job.id);
        });

        if (req.xhr) {
          return res.json(200, {
            data: {
              comment,
            },
            message: 'Comment published.',
          });
        }
        req.flash('success', 'Comment successfully added!');
        return res.redirect('/');
      }
    } catch (err) {
      console.log(err);
      req.flash('error', err);
      return res.redirect('/');
    }
  },
  delete: async (req, res) => {
    let comment = await Comment.findById(req.params.id);

    if (comment && comment.user.toString() === req.user.id) {
      const postId = comment.post.toString();
      await comment.remove();
      await Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.params.id },
      });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: {
              id: req.params.id,
            },
          },
          message: 'Comment deleted.',
        });
      }
      req.flash('success', 'Comment got deleted!');
      return res.redirect('/');
    } else {
      req.flash('error', "You can't delete the comment.");
      return res.redirect('/');
    }
  },
};
