# Speaking Tests - Design Document

**Date:** 2025-05-03
**Version:** 0.1

## 1. Project Overview

Speaking Tests is a web application that allows instructors to configure and run speaking assessments for students. Users can enter a student’s seat number, set the number of questions to ask, and then proceed through a series of prompts. The app ensures each session is tagged with the correct student and remembers the preferred question count.

## 2. Goals and Objectives

- List the primary goals and success criteria for the project.

## 3. Scope

- Define what's in scope and out of scope for the initial release.

## 4. User Stories

As an instructor, I want to enter a student’s seat number before starting the test so that each session is correctly recorded.
As an instructor, I want to set the number of questions on a settings page and have that preference persisted for the session so I don’t need to reconfigure until I close the browser.
As an instructor, I want to enter the share link to a Google Slides presentation and have it remembered for the session so the correct slides are always used.
As an instructor, I want to set the class number and time on the settings page and have them remembered for the session to tag each test run accurately.
As an instructor, I want the application to prevent me from proceeding until a valid seat number is entered to avoid anonymous test sessions.
As an instructor, I want each recorded response to trigger an automatic download of a CSV file named `Date_Class#_Seat#_Question#_SpeakingTest.csv` containing slide number, question text, score, time remaining, Google Slides link, seat number, cumulative final score, and cumulative total time taken up to that question.
As an instructor, I want a final download of all responses as a CSV file named `Date_Class#_Seat#_SpeakingTest.csv` when the test is complete, including slide number, question text, score, time remaining, Google Slides link, seat number, final score, and total time taken.
As an instructor, I want navigational controls (Back, Next) and scoring buttons (1–5) per question so I can review and rate each response.
As an instructor, I want the Next button to trigger a cumulative CSV download (with zero score for skips), Back to navigate without download, and filenames to auto-increment on collision with minimal browser prompts.

## 5. Features

• **Settings Page**: Inputs for **Seat Number** (required), **Number of Questions**, **Google Slides Link**, **Class Number**, **Timer Duration**, and **Auto-Advance** toggle.
• **Defaults & Persistence**: Each field has a default; changes are saved in `localStorage` and persist until the browser is closed.
• **Timer & Auto-Advance**: Use configured **Timer Duration** per question; if **Auto-Advance** is enabled, automatically trigger **Next** when the timer hits zero.
• **Progress Indicator**: A lightweight CSS-based progress bar reflects test progress (question index/total).
• **Validation**: Start/Test button is disabled until a valid seat number is entered.
• **Test Flow**: Presents the configured number of speaking prompts using the specified Google Slides deck.
• **Auto-Download per Question**: After pressing **Next** (or auto-advance), generate and download a cumulative CSV file named `Date_Class#_Seat#_Question#_SpeakingTest.csv` containing all responses up to the current question, with columns: Question Number, Slide Number, Question Text, Score, Time Remaining, Google Slides Link, Seat Number, Final Score (so far), Total Time Taken (so far). Filename collisions auto-increment to avoid browser prompts.
• **Navigation & Scoring UI**: Display **Back**, **Next**, and score buttons (1–5) at the bottom of each question. **Back** navigates to the previous question without download; **Next** records a score (0 if skipped) and triggers a cumulative CSV download.
• **Filename Collision Handling**: On download, if the filename exists, automatically append a numeric suffix (e.g., `(1)`, `(2)`, etc.) to avoid overwriting and minimize browser download prompts.
• **Final Results Download**: Upon completing all questions, generate and download a summary CSV file named `Date_Class#_Seat#_SpeakingTest.csv` containing global info (Seat Number, Class Number, Timer Duration, Google Slides Link, Final Score, Total Time Taken) followed by rows for each question with columns: Question Number, Slide Number, Question Text, Score, Time Remaining.
• **Summary Screen**: After the final download, display **Seat Number**, **Final Score**, **Total Time Taken**, and a table listing each question with its number, slide number, score, and time remaining.

## 6. Architecture

- Outline the intended system architecture and component diagram.

## 7. Technology Stack

- Front-end: ...
- Back-end: ...
- Database: ...

## 8. Timeline and Milestones

- Milestone 1: ... (date)
- Milestone 2: ... (date)

## 9. Risks and Mitigations

- Identify potential risks and proposed mitigations.

## 10. Next Steps

- Review this document and provide feedback.
- Begin detailed design of key components.
