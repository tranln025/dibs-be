const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var moment = require('moment');

const DibSchema = mongoose.Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    unique: true,
  },
  timeCreated: {
    type: Date,
    default: Date.now,
  },
  timeExpired: {
    type: Date,
    default: function() {
      return moment().add(1, 'hour');
    }
  },
  claimed: {
    type: Boolean,
    default: false,
  },
  dibber: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Dib', DibSchema);