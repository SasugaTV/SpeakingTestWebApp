// SettingsPage.js: Configure test settings
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.css';
import useLocalStorage from '../hooks/useLocalStorage';
import { defaultSettings } from '../contexts/SettingsContext';

function SettingsPage({ onStartTest }) {
  const navigate = useNavigate();
  // Persistent settings (localStorage)
  const [numberOfQuestions, setNumberOfQuestions] = useLocalStorage(
    'numberOfQuestions',
    defaultSettings.numberOfQuestions
  );
  const [googleSlidesLink, setGoogleSlidesLink] = useLocalStorage(
    'googleSlidesLink',
    defaultSettings.googleSlidesLink
  );
  const [classNumber, setClassNumber] = useLocalStorage(
    'classNumber',
    defaultSettings.classNumber
  );
  const [timerDuration, setTimerDuration] = useLocalStorage(
    'timerDuration',
    defaultSettings.timerDuration
  );
  const [autoAdvance, setAutoAdvance] = useLocalStorage(
    'autoAdvance',
    defaultSettings.autoAdvance
  );

  // Non-persistent seat number (clears each time)
  const [seatNumber, setSeatNumber] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (seatNumber.trim() === '') return;
    
    // Pass settings to parent
    if (onStartTest) {
      onStartTest({
        numberOfQuestions,
        googleSlidesLink,
        classNumber,
        timerDuration,
        autoAdvance,
        seatNumber,
      });
    }
    
    // Navigate to test page
    navigate('/test');
  };

  return (
    <div className="settings-page">
      <h1>Speaking Test Settings</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="seatNumber">
            Student Seat Number <span className="required">*</span>
          </label>
          <input
            type="text"
            id="seatNumber"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
            required
            aria-required="true"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfQuestions">Number of Questions</label>
          <input
            type="number"
            id="numberOfQuestions"
            min="1"
            max="50"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="googleSlidesLink">Google Slides Link</label>
          <input
            type="url"
            id="googleSlidesLink"
            value={googleSlidesLink}
            onChange={(e) => setGoogleSlidesLink(e.target.value)}
            placeholder="https://docs.google.com/presentation/d/..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="classNumber">Class Number</label>
          <input
            type="text"
            id="classNumber"
            value={classNumber}
            onChange={(e) => setClassNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="timerDuration">Timer Duration (seconds)</label>
          <input
            type="number"
            id="timerDuration"
            min="5"
            max="300"
            value={timerDuration}
            onChange={(e) => setTimerDuration(Number(e.target.value))}
          />
        </div>

        <div className="form-group checkbox">
          <input
            type="checkbox"
            id="autoAdvance"
            checked={autoAdvance}
            onChange={(e) => setAutoAdvance(e.target.checked)}
          />
          <label htmlFor="autoAdvance">
            Auto-advance when timer ends
          </label>
        </div>

        <button 
          type="submit" 
          className="start-button"
          disabled={seatNumber.trim() === ''}
        >
          Start Test
        </button>
      </form>
    </div>
  );
}

export default SettingsPage;
