// src/components/OverControl.js
import React from 'react';

const OverControl = ({ currentBall, handleScoreUpdate }) => {
  const scoreButtons = [0, 1, 2, 3, 4, 6];
  

  return (
    <div className="over-control">
      <h2>Current Ball: {currentBall}</h2>
      <div>
        {scoreButtons.map(score => (
          <button
            key={score}
            onClick={() => handleScoreUpdate(score, false)}
          >
            {score} Runs
          </button>
        ))}
        <button onClick={() => handleScoreUpdate(0, true)}>Out</button>
      </div>
    </div>
  );
};

export default OverControl;
