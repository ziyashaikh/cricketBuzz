// backend/models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  teamA: {
    type: String,
    required: true,
  },
  teamB: {
    type: String,
    required: true,
  },
  totalRuns: {
    type: Number,
    default: 0,
  },
  totalWickets: {
    type: Number,
    default: 0,
  },
  overs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Over',
  }],
  currentOver: {
    type: Number,
    default: 0,
  },
  currentBall: {
    type: Number,
    default: 0,
  },
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
