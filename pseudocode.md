# Speaking Tests - Pseudocode Outline

**Date:** 2025-05-03

## src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## src/App.js

```js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SettingsPage from './components/SettingsPage';
import TestFlow from './components/TestFlow';
import SummaryScreen from './components/SummaryScreen';
import SettingsContext from './contexts/SettingsContext';

function App() {
  const settings = /* read from storageUtils */;
  return (
    <SettingsContext.Provider value={settings}>
      <Router>
        <Routes>
          <Route path="/" element={<SettingsPage />} />
          <Route path="/test" element={<TestFlow />} />
          <Route path="/summary" element={<SummaryScreen />} />
        </Routes>
      </Router>
    </SettingsContext.Provider>
  );
}

export default App;
```

## src/components/SettingsPage.js

```js
// 1. useLocalStorage for NumberOfQuestions, GoogleSlidesLink, ClassNumber, TimerDuration, AutoAdvance
// 2. useState for SeatNumber
// 3. Form inputs bound to state/hooks
// 4. Submit button disabled if SeatNumber empty
// 5. onSubmit: navigate to '/test'
```

## src/components/TestFlow.js

```js
// 1. useContext(SettingsContext) to get config
// 2. useState for currentIndex, responses array (objects with question data)
// 3. useTimer hook for countdown
// 4. Embed slide iframe using GoogleSlidesLink and currentIndex
// 5. Render ProgressBar(currentIndex, total)
// 6. Render ScoreButtons(onSelect)
// 7. Next handler:
//    - record {questionNumber, slideNumber, questionText, score, timeRemaining, cumulativeScore, totalTime}
//    - call csvUtils.downloadCSV(responses, filename)
//    - advance index, reset timer
//    - if last, navigate to '/summary'
// 8. Back handler: adjust index, reset timer
```

## src/components/SummaryScreen.js

```js
// 1. Read final responses from in-memory or session storage
// 2. Display SeatNumber, Final Score, Total Time at top
// 3. Table listing each question: Question#, Slide#, Score, Time Remaining
// 4. Option to restart or return home
```

## src/components/ProgressBar.js

```js
// Functional component that takes current and total
// Returns a styled div with width = current/total * 100%
```

## src/components/ScoreButtons.js

```js
// Functional component rendering buttons 1 to 5
// onClick calls provided handler with score
```

## src/utils/storageUtils.js

```js
// export function getItem(key, defaultValue) { /* JSON.parse localStorage or default */ }
// export function setItem(key, value) { /* JSON.stringify to localStorage */ }
```

## src/utils/csvUtils.js

```js
// export function arrayToCSV(dataArray) { /* convert array of objects to CSV string */ }
// export function downloadCSV(csvString, filename) { /* create Blob, link.click() */ }
// maintain in-memory map for filename collisions
```

## src/utils/timerUtils.js

```js
// export function formatTime(sec) { /* mm:ss */ }
```

## src/hooks/useLocalStorage.js

```js
// hook useLocalStorage(key, initialValue)
// returns [value, setValue] with sync to localStorage
```

## src/hooks/useTimer.js

```js
// hook useTimer(initialDuration)
// returns { timeRemaining, start(), reset() }
// uses setInterval internally
```

## src/contexts/SettingsContext.js

```js
// import React
// export const SettingsContext = React.createContext();
// Optionally wrap settings logic here
```

## src/styles/*.css

/* Add basic layout and theming for components */

---
This pseudocode outlines the structure and key logic for each file. Let me know if you’d like tweaks before implementation begins!
