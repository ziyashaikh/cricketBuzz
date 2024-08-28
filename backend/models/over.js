const mongoose = require('mongoose');

const overSchema = new mongoose.Schema({
  overNumber: {
    type: Number,
    required: true,
  },
  balls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ball',
  }],
  totalRuns: {
    type: Number,
    default: 0,
  },
  wickets: {
    type: Number,
    default: 0,
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: true,
  },
});

const Over = mongoose.model('Over', overSchema);
module.exports = Over;

