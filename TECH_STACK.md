# Technology Stack & Coding Standards

This file tracks our chosen technologies and ensures consistency throughout the project.

## Languages & Frameworks

- JavaScript (ES2021)
- React 18.x (Create React App)
- React Router v6

## Styling

- Plain CSS (CSS Modules optional in future)

## State & Data

- React Context & Hooks for state
- localStorage for settings/persistence

## Utilities & Build

- CSV generation using native Blob and link download
- Node.js >=16.x
- npm >=8.x

## Tooling & Testing

- ESLint (with React, React Hooks, JSX-a11y plugins)
- Prettier for code formatting
- Jest + React Testing Library for unit tests

## CI / Collaboration

- Git with `.gitignore` in root
- BUGS.md for bug tracking
- PROGRESS.md for status reporting

## Dependencies

| Package                | Installed | Version   |
|------------------------|-----------|-----------|
| react                  | ✅        | 18.x      |
| react-dom              | ✅        | 18.x      |
| react-router-dom       | ✅        | 6.x       |
| eslint                 | ✅        | latest    |
| prettier               | ✅        | latest    |
| jest                   | ✅        | latest    |
| @testing-library/react | ✅        | latest    |
| typescript             | ❌        | N/A       |
| @types/react           | ❌        | N/A       |
| @types/react-dom       | ❌        | N/A       |

## Implemented Features

| Feature                | Status    | Notes                                          |
|------------------------|-----------|------------------------------------------------|
| Settings persistence   | ✅ Complete | Using localStorage via custom useLocalStorage hook |
| Google Slides embed    | ✅ Complete | iframe with dynamic URL formatting              |
| Timer & auto-advance   | ✅ Complete | Custom useTimer hook with configurable duration |
| CSV generation         | ✅ Complete | Per-question and final summary downloads        |
| Filename collision     | ✅ Complete | Auto-incrementing counters to avoid prompts     |
| Score tracking         | ✅ Complete | 1-5 scoring UI with visual feedback            |
| Progress indicators    | ✅ Complete | Test progress and timer progress bars          |
| Summary screen         | ✅ Complete | Final results with question details table       |

> **Note:** TypeScript support is not yet implemented but may be added if the project grows in complexity.
