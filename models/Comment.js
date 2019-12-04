const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    require: [true, 'Post is required'],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: [true, 'Author is required'],
  },
  content: {
    type: String,
    require: [true, 'Comment content is required'],
  },
  commentDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);