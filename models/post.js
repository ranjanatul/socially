const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
      },
      // {
      //   likeId: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'Like',
      //     unique: true,
      //   },
      //   user: {
      //     type: mongoose.Schema.Types.ObjectId,
      //     ref: 'User',
      //   },
      //   _id: false,
      // },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
