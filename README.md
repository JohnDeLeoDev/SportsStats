# SportsStats: AI-Powered Sports Statistics Application

SportsStats is a web application that allows users to query and retrieve Major League Baseball (MLB) statistics using natural language processing (NLP). The project leverages AI/ML technologies to transform user queries into SQL queries and provides data visualizations for better insights.

## Table of Contents

- Project Overview
- Features
- Tech Stack
- Testing

### Project Overview

SportsStats enables users to retrieve MLB statistics by entering natural language queries. The application processes the input using an AI-powered NLP model to convert it into SQL queries, which are then executed to return relevant statistics from a database. It also provides visualized insights, making it easy for users to interpret sports data.

#### Key Goals:
- Allow users to query MLB statistics naturally (e.g., "What were Aaron Judge’s stats in 2023?").
- Provide clean, interactive data visualizations for easier interpretation.
- Ensure a seamless user experience with features like user accounts and saved query history.

### Features

- Natural Language Querying: Retrieve sports statistics using conversational queries.
- AI-Driven Query Processing: AI/ML models convert natural language into SQL queries for data retrieval.
- Real-Time Data Visualizations: Charts and graphs show user-requested sports statistics.
- User Account Support: Create accounts, log in, and access previous queries.

### Tech Stack

#### Frontend:

- Next.js: Framework for server-side rendering and React-based UI.
- TypeScript: Strong typing for better code reliability.
- SWC: Next.js’s default compiler, used for transforming code.

#### Backend:

- Node.js: Backend runtime for handling API requests.
- PostgreSQL: Database used to store and query MLB statistics.
- AWS RDS: Managed database service for PostgreSQL.
- AWS Lambda: Serverless compute for processing user queries.

#### CI/CD and Hosting:

- Amazon Amplify: Used to automate the build and deployment process for production.

### Testing

SportsStats employs Jest for unit and integration testing, using SWC to transpile TypeScript files quickly.

- Test Suite: Comprehensive tests covering UI components, backend functionality, and API interactions.
- Test Coverage: Focuses on key features, including natural language query translation, data retrieval, and rendering of statistics.
#### Running Tests
Tests are run as part of the continuous integration process with GitHub and Amplify to ensure code quality and reliability.

- Unit & Integration Tests: Test individual components and integrations across the system.
- Mocking APIs: Third-party API calls (e.g., MLB API) are mocked to test system behavior without external dependencies.

### Deployment

The application is deployed using Amazon Amplify, which automates the build, deployment, and hosting processes for the production environment.

#### Key Deployment Details:
- CI/CD: Every push to the production branch triggers a new build and deployment.
- Amplify Build Pipeline: Amplify automates the creation of optimized production builds and handles environment variables for database connections and API endpoints.
