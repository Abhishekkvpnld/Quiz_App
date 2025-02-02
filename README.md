# Quiz Application

## Overview
This is a web-based quiz application developed using React that fetches quiz data from the provided API (`https://api.jsonserve.com/Uw5CrX`). It includes gamification features to make the quiz experience more engaging and interactive. The application presents multiple-choice questions, tracks the user's score, and displays a summary of results upon quiz completion.

## Features
- **Start Quiz**: Begin the quiz and progress through the questions.
- **Multiple-Choice Questions**: Each question comes with multiple answers, and the user can select the correct option.
- **Gamification**: Points are awarded for correct answers, and the quiz ends with a score summary.
- **Results Summary**: After completing the quiz, the user receives a summary of their performance, including the total score.

## API Integration
The application fetches quiz data from the API endpoint:  
`https://api.jsonserve.com/Uw5CrX`

### Data Handling
- The quiz data is fetched asynchronously, and error handling is implemented to ensure a smooth user experience.
- The data is parsed and presented in a user-friendly manner, with proper validation.

## Technical Stack
- **Frontend**: React.js (JavaScript framework)
- **State Management**: React's `useState` and `useEffect`
- **Data Fetching**: Fetch API for asynchronous calls
- **Styling**: CSS (or you can use any CSS framework like Tailwind or Material-UI for enhanced styling)

## Setup Instructions

### Prerequisites
- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abhishekkvpnld/Quiz_App.git
