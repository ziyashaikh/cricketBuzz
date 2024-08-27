// src/components/OverListing.js
import React from 'react';
import { useEffect } from 'react';
import './overListing.css';  // Make sure to create this CSS file

const OverListing = ({ overs }) => {
  useEffect(() => {
    console.log('Overs received in OverListing:', overs);
  }, [overs]);

  if (!overs || overs.length === 0) {
    return <p className="no-data">No overs data available</p>;
  }

  return (
    <div className="over-listing">
      {overs.map((over, index) => (
        <div key={index} className="over-item">
          <h3 className="over-number">Over {over.overNumber}</h3>
          <div className="over-summary">
            <span className="runs">Runs: {over.totalRuns}</span>
            <span className="wickets">Wickets: {over.wickets}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverListing;