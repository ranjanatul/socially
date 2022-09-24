const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    accepted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Friend = mongoose.model('Friend', friendSchema);
module.exports = Friend;
