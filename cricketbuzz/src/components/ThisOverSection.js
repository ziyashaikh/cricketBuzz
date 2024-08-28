import React from 'react';

const ThisOverSection = ({ thisOverRuns, currentBall }) => {
  return (
    <div className="this-over-section">
      <h3>This Over</h3>
      <div className="balls">
        {[1, 2, 3, 4, 5, 6].map((ball) => (
          <span
            key={ball}
            className={`ball ${ball === currentBall ? 'current' : ''}`}
          >
            {thisOverRuns[ball - 1] || '-'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ThisOverSection;
