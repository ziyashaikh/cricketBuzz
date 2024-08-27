const mongoose = require('mongoose');

const ballSchema = new mongoose.Schema({
  ballNumber: {
    type: Number,
    required: true,
  },
  runs: {
    type: Number,
    required: true,
    enum: [0, 1, 2, 3, 4, 6],
  },
  isWicket: {
    type: Boolean,
    default: false,
  },
  over: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Over',
    required: true,
  },
});

const Ball = mongoose.model('Ball', ballSchema);
module.exports = Ball;
