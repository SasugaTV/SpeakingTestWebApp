# Speaking Tests

**Date:** 2025-05-03

## Overview

A React-based web application for conducting speaking assessments. Instructors can configure a session, navigate through Google Slides questions, score responses, and automatically download cumulative CSV reports.

## Key Features

- **Settings Configuration**: Set seat number, number of questions, Google Slides link, class number, and timer duration
- **Google Slides Integration**: Embed slides directly in the application
- **Timer with Auto-Advance**: Configurable countdown timer with optional auto-advance
- **Scoring Interface**: Simple 1-5 scoring buttons for each question
- **CSV Downloads**: Automatic CSV generation after each question and at test completion
- **Progress Tracking**: Visual indicators for test progress and remaining time
- **Summary Screen**: Final results display with question-by-question breakdown

## Getting Started

### Prerequisites
- Node.js (>=16.x)
- npm

### Installation
```bash
cd webapp
npm install
```

### Available Scripts

In the `webapp` directory, you can run:

- `npm start`
  Starts the development server at http://localhost:3000

- `npm test`
  Launches the test runner in interactive watch mode

- `npm run build`
  Builds the app for production to the `build` folder

- `npm run lint`
  Runs ESLint on source code

- `npm run format`
  Formats code using Prettier

### Linting and Formatting

After installing dependencies, run:
```bash
npm run lint
npm run format
```

### Configuration

Add any environment variables to `.env` in `webapp` (for example, REACT_APP_API_URL).

## Contributing

Please open issues and pull requests following best practices. Ensure linting and tests pass before merging.
