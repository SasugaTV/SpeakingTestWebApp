// useTimer.js: Custom hook for countdown timer
import { useState, useEffect, useRef, useCallback } from 'react';

export default function useTimer(initialDuration) {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start the timer
  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRunning]);

  // Pause the timer
  const pause = useCallback(() => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  }, [isRunning]);

  // Reset the timer
  const reset = useCallback((newDuration = initialDuration) => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeRemaining(newDuration);
  }, [initialDuration]);

  return {
    timeRemaining,
    isRunning,
    start,
    pause,
    reset,
    isComplete: timeRemaining === 0
  };
}
