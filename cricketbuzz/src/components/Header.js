import React from 'react';

const Header = ({ totalRuns, totalWickets, currentOver }) => {
  return (
    <div className="header">
      <h1>Current Score</h1>
      <p>Runs: {totalRuns} / Wickets: {totalWickets}</p>
      <p>Over: {currentOver}</p>
    </div>
  );
};

export default Header;
