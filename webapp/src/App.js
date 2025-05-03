import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SettingsPage from './components/SettingsPage';
import TestFlow from './components/TestFlow';
import SummaryScreen from './components/SummaryScreen';
import './App.css';
import SettingsContext, { defaultSettings } from './contexts/SettingsContext';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  // Load settings from localStorage
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

  // Combine settings into context value
  const settingsValue = {
    numberOfQuestions,
    setNumberOfQuestions,
    googleSlidesLink,
    setGoogleSlidesLink,
    classNumber,
    setClassNumber,
    timerDuration,
    setTimerDuration,
    autoAdvance,
    setAutoAdvance,
  };

  // State for seat number (not persisted)
  const [seatNumber, setSeatNumber] = useState('');
  
  // Handle starting the test
  const handleStartTest = (settings) => {
    setSeatNumber(settings.seatNumber);
  };

  return (
    <SettingsContext.Provider value={settingsValue}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SettingsPage onStartTest={handleStartTest} />} />
            <Route path="/test" element={<TestFlow seatNumber={seatNumber} />} />
            <Route path="/summary" element={<SummaryScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </SettingsContext.Provider>
  );
}

export default App;
