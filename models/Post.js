const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: [true, 'Please add a text'],
  },
  name: {
    type: String,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      text: {
        type: String,
        required: [true, 'Please add a text'],
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('Post', PostSchema);
