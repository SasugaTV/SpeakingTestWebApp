// SettingsContext.js: Context for app settings
import { createContext } from 'react';

// Default settings values
export const defaultSettings = {
  numberOfQuestions: 5,
  googleSlidesLink: 'https://docs.google.com/presentation/d/1EiZelt92rXHzgPyh1pXwI9RvQ8WWEpJ9ZZ9IPPKtbwQ/edit?usp=sharing',
  classNumber: '101',
  timerDuration: 60, // seconds
  autoAdvance: false,
};

// Create context with default values
const SettingsContext = createContext(defaultSettings);

export default SettingsContext;
