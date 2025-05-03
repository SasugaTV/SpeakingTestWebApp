// SummaryScreen.js: Final results display
import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SettingsContext from '../contexts/SettingsContext';
import { formatTime } from '../utils/timerUtils';
import { arrayToCSV, downloadCSV, generateFilename } from '../utils/csvUtils';
import './SummaryScreen.css';

function SummaryScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = useContext(SettingsContext);
  
  // Get responses from navigation state
  const { responses = [], testStartTime, seatNumber } = location.state || {};
  
  // Calculate final score and total time
  const finalScore = responses.reduce((sum, response) => sum + (response.score || 0), 0);
  const totalTimeTaken = responses.length > 0 
    ? responses[responses.length - 1].totalTimeTaken 
    : 0;
  
  // Download final CSV on component mount
  useEffect(() => {
    if (responses.length > 0) {
      const filename = generateFilename({
        date: testStartTime || new Date(),
        classNumber: settings.classNumber,
        seatNumber: seatNumber || 'Unknown'
      });
      
      const csv = arrayToCSV(responses);
      downloadCSV(csv, filename);
    }
  }, [responses, settings.classNumber, seatNumber, testStartTime]);
  
  // Handle restart button
  const handleRestart = () => {
    navigate('/');
  };
  
  // If no responses, redirect to settings
  if (!responses.length) {
    return (
      <div className="summary-screen">
        <div className="summary-error">
          <h2>No test data available</h2>
          <p>Please start a new test.</p>
          <button className="restart-button" onClick={handleRestart}>
            Return to Settings
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="summary-screen">
      <h1>Test Summary</h1>
      
      <div className="summary-header">
        <div className="summary-stat">
          <div className="stat-label">Seat Number</div>
          <div className="stat-value">{seatNumber || 'Unknown'}</div>
        </div>
        
        <div className="summary-stat">
          <div className="stat-label">Final Score</div>
          <div className="stat-value highlight">{finalScore}</div>
        </div>
        
        <div className="summary-stat">
          <div className="stat-label">Total Time</div>
          <div className="stat-value">{formatTime(totalTimeTaken)}</div>
        </div>
      </div>
      
      <div className="summary-table-container">
        <h2>Question Details</h2>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Question #</th>
              <th>Slide #</th>
              <th>Score</th>
              <th>Time Remaining</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>{response.questionNumber}</td>
                <td>{response.slideNumber}</td>
                <td className="score-cell">{response.score || 0}</td>
                <td>{formatTime(response.timeRemaining)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="summary-actions">
        <button className="restart-button" onClick={handleRestart}>
          Start New Test
        </button>
      </div>
    </div>
  );
}

export default SummaryScreen;
