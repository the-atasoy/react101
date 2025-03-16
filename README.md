# Memorium - Command Line Memory Assistant

Memorium is a web application that helps users organize and remember command-line instructions for different platforms. Never forget that complex Docker command or obscure Git operation again!

## Purpose

This project was developed for learning React fundamentals. It serves as the UI component for a microservice architecture project that was built for learning microservice fundamentals.

Backend project: [MicroService101](https://github.com/the-atasoy/MicroService101)

## Project Overview

Memorium allows users to:

- Create and manage technology platforms (Linux, Windows, Docker, etc.)
- Store and organize commands by platform
- Easily copy commands with a single click

## Technical Stack

- React 19.0.0 with TypeScript
- Material UI for component styling
- React Router for navigation
- Axios for API communication

## Project Structure

```
src/
├── components/               # Reusable UI components
│   ├── command/              # Command-related components
│   │   ├── CommandCard.tsx   # Card for displaying individual commands
│   │   ├── CommandList.tsx   # List for displaying commands
│   │   └── CommandModal.tsx  # Modal for creating/editing commands
│   ├── platform/             # Platform-related components
│   │   ├── PlatformCard.tsx  # Card for displaying individual platforms
│   │   ├── PlatformList.tsx  # List for displaying platforms
│   │   └── PlatformModal.tsx # Modal for creating/editing platforms
│   └── Header.tsx            # Application header component
├── contexts/
│   └── AlertContext.tsx      # Global alert management context
├── pages/                    # Page components
│   ├── Commands.tsx          # Command management page
│   ├── Home.tsx              # Landing page
│   └── Platforms.tsx         # Platform management page
├── services/                 # API service layer
│   ├── api.config.tsx        # API configuration
│   ├── apiWrapper.ts         # API error handling wrapper
│   ├── commandService.ts     # Command API integration
│   └── platformService.ts    # Platform API integration
├── types/                    # TypeScript type definitions
│   ├── Command.ts            # Command interface
│   ├── Platform.ts           # Platform interface
│   └── error.ts              # Error handling types
├── App.tsx                   # Root application component
├── index.tsx                 # Application entry point
└── theme.ts                  # Material-UI theme configuration
```

## Getting Started

### Prerequisites

- Node.js (14.x or later)
- npm or yarn
- Backend API running ([MicroService101](https://github.com/the-atasoy/MicroService101))

### Running Locally

1. Clone the repository:

   ```sh
   git clone https://github.com/the-atasoy/react101.git
   cd react101
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Adjust `api.config.tsx` file in the root directory:

   ```sh
   const BASE_URL = 'http://acme.com';
   ```

   Note: Adjust the API URL to match your backend configuration

4. Start the development server:

   ```sh
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Additional Commands

- `npm run build` - Creates a production build in the `build` folder
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App configuration (one-way operation)

## Features

### Platform Management

- Create, view, update, and delete platforms
- View platform details including name, publisher, and cost
- Visual cost indicators

### Command Management

- Organize commands by platform
- Store command text and usage instructions
- One-click copy functionality

### User Interface

- Responsive design for all screen sizes
- Dark theme support
- Intuitive navigation

## API Integration

The application connects to [MicroService101](https://github.com/the-atasoy/MicroService101) backend API locally for data storage and retrieval. API services handle:

- Platform CRUD operations
- Command CRUD operations
- Error handling and response transformation

## Future Improvements

- User authentication and personal command libraries
