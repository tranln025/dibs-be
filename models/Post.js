const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = mongoose.Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  photo: {
    type: String,
    required: [true, 'Image is required']
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  currentDib: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  claimant: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Post', PostSchema);