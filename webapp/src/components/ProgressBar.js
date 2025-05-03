// ProgressBar.js: Visual indicator of test progress or timer
import React from 'react';
import './ProgressBar.css';

function ProgressBar({ current, total, label = '', type = 'progress' }) {
  // Calculate percentage (0-100)
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  // Determine color based on type and percentage
  let colorClass = 'progress-default';
  
  if (type === 'timer') {
    if (percentage <= 25) {
      colorClass = 'progress-danger';
    } else if (percentage <= 50) {
      colorClass = 'progress-warning';
    } else {
      colorClass = 'progress-success';
    }
  }

  return (
    <div className="progress-container">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-track">
        <div 
          className={`progress-bar ${colorClass}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}

export default ProgressBar;
