// ScoreButtons.js: Score selection UI (1-5)
import React, { useState, useEffect } from 'react';
import './ScoreButtons.css';

function ScoreButtons({ onScoreSelect, initialScore = null }) {
  const [selectedScore, setSelectedScore] = useState(initialScore);
  
  // Reset selected score when initialScore changes (including to null)
  useEffect(() => {
    setSelectedScore(initialScore);
  }, [initialScore]);
  
  const handleScoreClick = (score) => {
    setSelectedScore(score);
    if (onScoreSelect) {
      onScoreSelect(score);
    }
  };
  
  return (
    <div className="score-buttons">
      <div className="score-label">Score:</div>
      <div className="score-options">
        {[1, 2, 3, 4, 5].map(score => (
          <button
            key={score}
            className={`score-button ${selectedScore === score ? 'selected' : ''}`}
            onClick={() => handleScoreClick(score)}
            aria-pressed={selectedScore === score}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScoreButtons;
