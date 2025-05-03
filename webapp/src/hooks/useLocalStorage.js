// useLocalStorage.js: Custom hook for localStorage state
import { useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/storageUtils';

export default function useLocalStorage(key, initialValue) {
  // Get stored value or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    return getItem(key, initialValue);
  });

  // Update localStorage when state changes
  useEffect(() => {
    setItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
