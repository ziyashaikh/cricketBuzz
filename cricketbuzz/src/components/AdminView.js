import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import Header from './Header';
import OverControl from './OverControl';
import OverListing from './OverListing';
import { io } from 'socket.io-client';
import './cricketStyle.css';

const AdminView = () => {
  const [totalRuns, setTotalRuns] = useState(0);
  const [totalWickets, setTotalWickets] = useState(0);
  const [currentOver, setCurrentOver] = useState(0);
  const [currentBall, setCurrentBall] = useState(0);
  const [overs, setOvers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const socket = io('https://cricket-buzz-server.vercel.app/', {
      transports: ['websocket'],
      upgrade: false,
      withCredentials: true 
    });
    socket.on('scoreUpdate', data => {
      console.log('Received scoreUpdate:', data);
      setTotalRuns(data.totalRuns);
      setTotalWickets(data.totalWickets);
      setCurrentOver(data.currentOver);
      setCurrentBall(data.currentBall);
      if (data.overs) {
        setOvers(data.overs);
      }
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const initializeMatch = async () => {
      try {
        // Try to fetch current match
        const res = await axios.get('/match/current');
        updateMatchState(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // If no match exists, create a new one
          try {
            await axios.post('/match/create', { teamA: 'Team A', teamB: 'Team B' });
            const res = await axios.get('/match/current');
            updateMatchState(res.data);
          } catch (createErr) {
            console.error('Error creating new match:', createErr);
          }
        } else {
          console.error('Error fetching match details:', err);
        }
      }
    };

    initializeMatch();
  }, []);



  const updateMatchState = (data) => {
    const { totalRuns, totalWickets, currentOver, currentBall, overs } = data;
    console.log('Updated overs:', overs);
    setTotalRuns(totalRuns);
    setTotalWickets(totalWickets);
    setCurrentOver(currentOver);
    setCurrentBall(currentBall);
    setOvers(overs || []);
    setIsLoading(false);
  };

  const handleScoreUpdate = async (runs, isWicket) => {
    try {
      const res = await axios.post('/match/update', { runs, isWicket });
      updateMatchState(res.data);
    } catch (err) {
      console.error('Error updating score:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error setting up request:', err.message);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-view">
      <Header totalRuns={totalRuns} totalWickets={totalWickets} currentOver={currentOver} />
      <OverControl currentBall={currentBall} handleScoreUpdate={handleScoreUpdate} />
      {overs && overs.length > 0 ? (
        <OverListing overs={overs} />
      ) : (
        <p>No overs data available</p>
      )}
    </div>
  );
};

export default AdminView;
