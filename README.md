# Team DASH: Titanic Survivor Prediction App

## Project Introduction

The Titanic Survivor Prediction App is designed to predict the survival chances of passengers aboard the Titanic based on various input parameters. Our goal is to create an intuitive and user-friendly web application that uses multiple machine learning models to provide accurate predictions.

## Key Features

- **User-Friendly Interface:** Designed with simplicity and ease of use in mind.
- **Real-Time Predictions:** Predictions are updated instantly as user inputs change.
- **Model Selection:** Users can choose from multiple machine learning models for predictions.
- **Prediction History:** Displays the last 5 predictions made during the current session.

## Technologies Used

### Backend

- **FastAPI:** For creating RESTful API endpoints.
- **Python:** For implementing machine learning models.

### Frontend

- **ReactJS:** For building the user interface.
- **TypeScript:** For type-safe frontend development.
- **HTML/CSS:** For structuring and styling the web pages.

### DevOps

- **Docker:** For containerizing the application.
- **GitLab CI/CD:** For continuous integration and deployment.

### Project Management

- **JIRA:** For task tracking and sprint planning.

## System Architecture

### Backend

- **Framework:** FastAPI for high performance.
- **API:** RESTful API for frontend communication.
- **Containerization:** Dockerized for consistency and easy deployment.
- **Endpoints:** `/predict` for predictions, `/models` for model selection.

### Frontend

- **Framework:** ReactJS and TypeScript for a responsive UI.
- **Components:** Landing Page, Survival Calculator, Prediction History.
- **Styling:** CSS for a user-friendly interface.
- **Containerization:** Dockerized for reliability.

### Database

- **Model Storage:** Trained models stored as Pickle files in Docker images.
- **Data Handling:** Efficient management of prediction requests and responses.
- **Internal API Calls:** Frontend communicates with backend via HTTP.

## Models Used

The app utilizes a variety of machine learning models, including Random Forest, Decision Tree, KNN, Support Vector Machines, and Logistic Regression, to provide accurate survival predictions.

### Model Training

The models were trained on the Titanic dataset, using the same techniques as the proof-of-concept notebook to ensure reliable and accurate predictions.

### Implementation

The machine learning models are stored as Pickle files and integrated into the web application through a prediction service with a RESTful API, providing users with real-time survival predictions.

## Features of the Web App

### Landing Page

- Provides an overview of the app's functionality.
- Link to the Survival Calculator.

### Survival Calculator

- Input fields for passenger details: PClass, Sex, Age, Fare, Traveled Alone, Embarked.
- Real-time prediction updates.
- Option to select multiple models.
- Reset button for inputs.
- Displays the last 5 predictions in the current session.

## DevOps and CI/CD

### Version Control

- Managed with GitLab.
- Weekly commits to ensure active development.

### Docker

- Both web and model services are containerized.
- Docker Compose for managing multi-container applications.

### CI/CD Pipeline

- GitLab CI for automated builds and testing.
- Ensures code quality and deployability.

## Testing and Quality Assurance

### Unit and Integration Tests

- Written using pytest.
- Achieved 75% test coverage.
- Ensured individual component and integration functionality.

### Quality Assurance

- Conducted code reviews.
- Used static analysis tools.
- Implemented continuous integration with GitLab CI.

### Results

- Early bug detection and fixing.
- Maintained high code quality and consistency.
- Ensured a reliable and robust application.

## Conclusion

### Project Success

- Successfully developed and deployed the Titanic Survivor App.
- Met all functional and non-functional requirements.

### Key Achievements

- Implemented multiple prediction models.
- Created an interactive and user-friendly web application.
- Ensured high code quality and reliability through rigorous testing.

### Learning Outcomes

- Gained hands-on experience with FastAPI, React, and Docker.
- Improved collaboration and project management skills.
- Applied machine learning models to solve real-world problems.

## Setup Instructions

1. Install Python 3.11.
2. Install Node.js version 14.
3. Run the following command in the terminal:
   ```sh
   docker-compose up --build
   ```
