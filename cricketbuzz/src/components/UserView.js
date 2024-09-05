import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { io } from 'socket.io-client';
import Header from './Header';
import AnimationSection from './AnimationSection';
import ThisOverSection from './ThisOverSection';

const UserView = () => {
  const [matchData, setMatchData] = useState({
    totalRuns: 0,
    totalWickets: 0,
    currentOver: 0,
    currentBall: 0,
    thisOverRuns: [],
  });
  const [animation, setAnimation] = useState(null);

  useEffect(() => {
    fetchMatchData();

    console.log('Setting up WebSocket connection');
    const socket = io('https://cricket-buzz-server-ekuzh34i6-ziyashaikhs-projects.vercel.app/', {
      transports: ['websocket'],
      upgrade: false
    });
    
    socket.on('connect', () => {
      console.log('WebSocket connected, socket id:', socket.id);
    });
  
    socket.on('scoreUpdate', (data) => {
      console.log('Received scoreUpdate event:', data);
      handleScoreUpdate(data);
    });
  
    socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
    });
  
    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });
  
    return () => {
      console.log('Cleaning up WebSocket connection');
      socket.disconnect();
    };
  }, []);

  const fetchMatchData = async () => {
    try {
      const response = await axios.get('/match/current');
      console.log('Initial match data:', response.data);
      const { totalRuns, totalWickets, currentOver, currentBall, overs } = response.data;
      const thisOverRuns = overs[currentOver]?.balls.map(ball => ball.runs) || [];
      setMatchData({ totalRuns, totalWickets, currentOver, currentBall, thisOverRuns });
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  };

  const handleScoreUpdate = (data) => {
    console.log('Handling score update:', data);
    setMatchData(prevData => ({
      totalRuns: data.totalRuns,
      totalWickets: data.totalWickets,
      currentOver: data.currentOver,
      currentBall: data.currentBall,
      thisOverRuns: data.overs[data.currentOver]?.balls.map(ball => ball.runs) || [],
    }));
  
    // Trigger animation
    setAnimation(data.lastBallRuns === 'W' ? 'wicket' : `runs-${data.lastBallRuns}`);
    setTimeout(() => setAnimation(null), 2000);
  };

  return (
    <div className="user-view">
      <Header
        totalRuns={matchData.totalRuns}
        totalWickets={matchData.totalWickets}
        currentOver={matchData.currentOver}
      />
      <AnimationSection animation={animation} />
      <ThisOverSection
        thisOverRuns={matchData.thisOverRuns}
        currentBall={matchData.currentBall}
      />
    </div>
  );
};

export default UserView;
