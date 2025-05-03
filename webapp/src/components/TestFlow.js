// TestFlow.js: Main test interface with slides, timer, and scoring
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsContext from '../contexts/SettingsContext';
import ProgressBar from './ProgressBar';
import ScoreButtons from './ScoreButtons';
import useTimer from '../hooks/useTimer';
import { formatTime } from '../utils/timerUtils';
import { arrayToCSV, downloadCSV, generateFilename } from '../utils/csvUtils';
import './TestFlow.css';

function TestFlow({ seatNumber }) {
  const navigate = useNavigate();
  const settings = useContext(SettingsContext);
  
  // State for current question and responses
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [currentScore, setCurrentScore] = useState(null);
  const [testStartTime] = useState(new Date());
  
  // Timer hook
  const { 
    timeRemaining, 
    isRunning, 
    start, 
    reset, 
    isComplete 
  } = useTimer(settings.timerDuration);
  
  // Format Google Slides embed URL
  const formatEmbedUrl = useCallback((url) => {
    console.log('Original URL:', url);
    
    // For Opera compatibility, ensure we're using https
    let secureUrl = url;
    if (url.startsWith('http://')) {
      secureUrl = url.replace('http://', 'https://');
    }
    
    // If it's already an embed URL, just update the slide number
    if (secureUrl.includes('/embed')) {
      const baseUrl = secureUrl.split('?')[0];
      return `${baseUrl}?start=false&loop=false&delayms=3000&slide=${currentIndex}`;
    }
    
    // Handle standard Google Slides URL formats
    if (secureUrl.includes('docs.google.com/presentation')) {
      // Try to extract the presentation ID using various patterns
      let presentationId = null;
      
      // Pattern: /presentation/d/PRESENTATION_ID/...
      const pattern1 = /\/presentation\/d\/([a-zA-Z0-9_-]+)/;
      const matches1 = secureUrl.match(pattern1);
      if (matches1 && matches1[1]) {
        presentationId = matches1[1];
      }
      
      // Pattern: /presentation/u/0/d/PRESENTATION_ID/...
      const pattern2 = /\/presentation\/u\/\d+\/d\/([a-zA-Z0-9_-]+)/;
      const matches2 = secureUrl.match(pattern2);
      if (!presentationId && matches2 && matches2[1]) {
        presentationId = matches2[1];
      }
      
      // If we found an ID, create the embed URL
      if (presentationId) {
        // For Opera compatibility, use the preview embed format
        const embedUrl = `https://docs.google.com/presentation/d/${presentationId}/preview?slide=${currentIndex}`;
        console.log('Formatted URL:', embedUrl);
        return embedUrl;
      }
    }
    
    // If it's a public presentation link
    if (secureUrl.includes('docs.google.com/presentation/d/e/')) {
      // Pattern: /presentation/d/e/PRESENTATION_ID/...
      const pattern = /\/presentation\/d\/e\/([a-zA-Z0-9_-]+)/;
      const matches = secureUrl.match(pattern);
      if (matches && matches[1]) {
        const presentationId = matches[1];
        const embedUrl = `https://docs.google.com/presentation/d/e/${presentationId}/preview?slide=${currentIndex}`;
        console.log('Formatted URL:', embedUrl);
        return embedUrl;
      }
    }
    
    // If we couldn't parse the URL, try using it directly with /preview
    if (secureUrl.includes('/edit')) {
      const previewUrl = secureUrl.replace('/edit', '/preview');
      console.log('Using preview URL:', previewUrl);
      return previewUrl;
    }
    
    // Last resort: return the original URL
    console.warn('Could not parse Google Slides URL:', secureUrl);
    return secureUrl;
  }, [currentIndex]);
  
  // Auto-advance when timer completes
  useEffect(() => {
    if (isComplete && settings.autoAdvance) {
      handleNext();
    }
  }, [isComplete, settings.autoAdvance]);
  
  // Start timer when component mounts
  useEffect(() => {
    start();
  }, [start]);
  
  // Generate and download CSV for current responses
  const downloadCurrentCSV = useCallback(() => {
    if (responses.length === 0) return;
    
    // Generate filename with current question number
    const filename = generateFilename({
      date: testStartTime,
      classNumber: settings.classNumber,
      seatNumber,
      questionNumber: currentIndex
    });
    
    // Convert responses to CSV and download
    const csv = arrayToCSV(responses);
    downloadCSV(csv, filename);
  }, [responses, currentIndex, settings.classNumber, seatNumber, testStartTime]);
  
  // Handle advancing to next question with a score
  const handleAdvance = useCallback((score) => {
    // Record response for current question
    const newResponse = {
      questionNumber: currentIndex + 1,
      slideNumber: currentIndex + 1, // Adjust if slides aren't sequential
      questionText: `Question ${currentIndex + 1}`, // Replace with actual question text if available
      score: score,
      timeRemaining: timeRemaining,
      googleSlidesLink: settings.googleSlidesLink,
      seatNumber,
      cumulativeScore: (responses.reduce((sum, r) => sum + (r.score || 0), 0) + score),
      totalTimeTaken: Math.round((new Date() - testStartTime) / 1000)
    };
    
    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    
    // Move to next question or summary immediately (no download delay)
    if (currentIndex < settings.numberOfQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentScore(null); // Reset score selection
      reset(settings.timerDuration);
      start();
      
      // Download CSV after state updates (in the next render cycle)
      setTimeout(() => {
        downloadCurrentCSV();
      }, 10);
    } else {
      // Test complete, navigate to summary
      navigate('/summary', { 
        state: { 
          responses: updatedResponses,
          testStartTime,
          seatNumber
        } 
      });
    }
  }, [
    currentIndex, 
    downloadCurrentCSV, 
    navigate, 
    reset, 
    responses, 
    seatNumber, 
    settings.googleSlidesLink, 
    settings.numberOfQuestions, 
    settings.timerDuration, 
    start, 
    testStartTime, 
    timeRemaining
  ]);
  
  // Handle Next button click (score of 0)
  const handleNext = useCallback(() => {
    handleAdvance(0);
  }, [handleAdvance]);
  
  // Handle Back button click
  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      // Restore previous score if available
      if (responses[currentIndex - 1]) {
        setCurrentScore(responses[currentIndex - 1].score);
      }
      reset(settings.timerDuration);
      start();
    }
  }, [currentIndex, reset, responses, settings.timerDuration, start]);
  
  return (
    <div className="test-flow">
      <div className="test-header">
        <h1>Speaking Test</h1>
        <div className="test-info">
          <div>Seat #: {seatNumber}</div>
          <div>Question: {currentIndex + 1} / {settings.numberOfQuestions}</div>
          <div className="timer">{formatTime(timeRemaining)}</div>
        </div>
        <ProgressBar 
          current={currentIndex + 1} 
          total={settings.numberOfQuestions}
          label="Test Progress"
        />
        <ProgressBar 
          current={timeRemaining} 
          total={settings.timerDuration}
          label="Time Remaining"
          type="timer"
        />
      </div>
      
      <div className="slides-container">
        <iframe
          src={formatEmbedUrl(settings.googleSlidesLink)}
          title="Google Slides Presentation"
          width="100%"
          height="480"
          allowFullScreen={true}
          frameBorder="0"
        />
      </div>
      
      <div className="test-controls">
        <ScoreButtons 
          onScoreSelect={(score) => {
            setCurrentScore(score);
            // Advance to next question when a score button is clicked
            handleAdvance(score);
          }} 
          initialScore={currentScore}
        />
        
        <div className="navigation-buttons">
          <button 
            className="back-button"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            Back
          </button>
          
          <button 
            className="next-button"
            onClick={handleNext}
          >
            {currentIndex < settings.numberOfQuestions - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestFlow;
