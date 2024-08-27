const express = require('express');
const Match = require('../models/match');
const Over = require('../models/over');
const Ball = require('../models/ball');

module.exports = function(io) {
  const router = express.Router();

  // Create a new match if one doesn't exist
  router.post('/match/create', async (req, res) => {
    try {
      let match = await Match.findOne();
      if (match) {
        return res.status(400).json({ error: 'A match already exists' });
      }
      const { teamA, teamB } = req.body;
      if (!teamA || !teamB) {
        return res.status(400).json({ error: 'Both teamA and teamB are required' });
      }
      match = new Match({ teamA, teamB });
      await match.save();
      res.status(201).json(match);
    } catch (err) {
      console.error('Error creating match:', err);
      res.status(500).json({ error: err.message, stack: err.stack });
    }
  });

  // Get current match details
  router.get('/match/current', async (req, res) => {
    try {
      const match = await Match.findOne().populate({
        path: 'overs',
        populate: { path: 'balls' }
      });
      if (!match) {
        return res.status(404).json({ error: 'No current match found' });
      }
      res.json({
        totalRuns: match.totalRuns,
        totalWickets: match.totalWickets,
        currentOver: match.currentOver,
        currentBall: match.currentBall,
        overs: match.overs
      });
    } catch (err) {
      console.error('Error fetching current match:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // Update score for the current ball
  router.post('/match/update', async (req, res) => {
    console.log('Received update request:', req.body);
    const { runs, isWicket } = req.body;

    try {
      let match = await Match.findOne().populate({
        path: 'overs',
        populate: { path: 'balls' }
      });

      if (!match) {
        console.log('No match found');
        return res.status(404).json({ error: 'Match not found' });
      }

      console.log('Current match state:', match);

      let currentOver = match.overs[match.currentOver];

      if (!currentOver) {
        console.log('Creating new over');
        currentOver = new Over({
          overNumber: match.currentOver + 1,
          match: match._id,
        });
        await currentOver.save();
        match.overs.push(currentOver._id);
      }

      const newBall = new Ball({
        ballNumber: match.currentBall + 1,
        runs,
        isWicket,
        over: currentOver._id,
      });
      await newBall.save();

      currentOver.balls.push(newBall._id);
      currentOver.totalRuns += runs;
      if (isWicket) {
        currentOver.wickets += 1;
        match.totalWickets += 1;
      }
      await currentOver.save();

      match.totalRuns += runs;
      match.currentBall += 1;

      if (match.currentBall >= 6) {
        match.currentOver += 1;
        match.currentBall = 0; // Reset ball count for new over
      }

      await match.save();
      const updatedMatch = await Match.findById(match._id).populate({
        path: 'overs',
        populate: { path: 'balls' }
      });

      const updatedMatchDetails = {
        totalRuns: updatedMatch.totalRuns,
        totalWickets: updatedMatch.totalWickets,
        currentOver: updatedMatch.currentOver,
        currentBall: updatedMatch.currentBall,
        overs: updatedMatch.overs,
        lastBallRuns: isWicket ? 'W' : runs
      };

      console.log('Updated match details:', updatedMatchDetails);

      // Emit the updated match details to all connected clients
      io.emit('scoreUpdate', updatedMatchDetails);

      res.json(updatedMatchDetails);
    } catch (err) {
      console.error('Error updating match:', err);
      res.status(500).json({ 
        error: err.message, 
        stack: err.stack,
        details: 'An error occurred while updating the match'
      });
    }
  });

  return router;
};