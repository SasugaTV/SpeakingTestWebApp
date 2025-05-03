# Speaking Tests - Project Blueprint

**Date:** 2025-05-03

## 1. Root Structure

/ (root)
├─ design_document.md    # Detailed design spec
├─ project_blueprint.md  # This high-level blueprint
└─ webapp/               # React front-end app

## 2. webapp Directory

webapp/
├─ public/
│  ├─ index.html
│  └─ favicon.ico
├─ src/
│  ├─ index.js           # Entry point
│  ├─ App.js             # Routes & layout
│  ├─ components/        # UI components
│  │  ├─ SettingsPage.js
│  │  ├─ TestFlow.js
│  │  ├─ SummaryScreen.js
│  │  ├─ ProgressBar.js
│  │  └─ ScoreButtons.js
│  ├─ utils/             # Helper functions
│  │  ├─ csvUtils.js     # CSV generation & download
│  │  ├─ storageUtils.js # localStorage wrapper
│  │  └─ timerUtils.js   # Timer logic
│  ├─ hooks/             # Custom React hooks
│  │  ├─ useTimer.js
│  │  └─ useLocalStorage.js
│  ├─ contexts/          # Context providers (if needed)
│  │  └─ SettingsContext.js
│  └─ styles/            # CSS files or modules
│     ├─ App.css
│     ├─ SettingsPage.css
│     ├─ TestFlow.css
│     └─ SummaryScreen.css
└─ package.json          # Dependencies and scripts

## 3. Routing & Pages

- `/` → SettingsPage (enter configuration)
- `/test` → TestFlow (embed slides, timer, scoring, CSV download)
- `/summary` → SummaryScreen (final results view)

## 4. Data Flow

1. SettingsPage saves config to localStorage.  
2. TestFlow reads config on mount, fetches slides via embed URL.  
3. On each Next (or auto-advance), build cumulative CSV, call download helper.  
4. After last question, SummaryScreen displays summary and triggers final CSV.

## 5. Utilities & State

- **storageUtils.js**: get/set with default, JSON parse/stringify.  
- **csvUtils.js**: convert array of objects to CSV string, trigger browser download, handle filename collisions.  
- **useTimer.js**: countdown hook, exposes timeRemaining, start, reset.  
- **SettingsContext** (optional): provide settings across components without prop drilling.

## 6. Styles & UX

- Simple, responsive UI with clear buttons.  
- ProgressBar: CSS width animation.  
- ScoreButtons: highlight current selection.  

## 7. Next Steps

1. Install React Router.  
2. Build SettingsPage form and storage logic.  
3. Scaffold TestFlow with iframe embed and timer.  
4. Implement csvUtils and integrate download.  
5. Create SummaryScreen and final CSV logic.  
6. Apply styling and test across browsers.
