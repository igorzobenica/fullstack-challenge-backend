# Fullstack Challenge Backend (Firebase Cloud Functions)

This is the backend for the Fullstack Challenge project, implemented using Firebase Cloud Functions. It provides an API for managing user profiles and interacts with Firebase services, including Firestore and Firebase Authentication.

## Features

- User authentication using Firebase Authentication
- User profile management via Firestore (save and retrieve profile)
- CORS middleware for secure cross-origin requests
- Jest test cases for the controllers
- Firebase Functions Test SDK for unit testing

## Deployed API URL

This project is deployed using Firebase Cloud Functions. You can access the API at the following URL:

**[Deployed API on Firebase](https://us-central1-fullstack-challenge-5a3f1.cloudfunctions.net/app)**

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v18 or above)
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase Project with Firestore and Authentication enabled
- Service account key for Firebase Admin SDK

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/fullstack-challenge-backend.git
cd fullstack-challenge-backend/functions
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Firebase Project

- Create a Firebase project in the Firebase Console.
- Enable Firestore and Firebase Authentication.
- Download the Firebase Admin SDK service account key (JSON) and place it in the functions/config/ directory.

### 4. Set Up Firebase Functions Environment

```bash
firebase functions:config:set \
  api.url="your_api_url" \
  frontend.url="your_frontend_url"
```

### 5. Set Up Testing Environment

For testing, place your service account key in config/fullstack-challenge-5a3f1-90a715e294fd.json and update the testing config in profileController.test.ts.

Run tests using:

```bash
npm test
```

### 6. Local Development

To serve the Firebase Cloud Functions locally, run:

```bash
npm run serve
```

### 7. Deploy to Firebase

To deploy the Cloud Functions to Firebase:

```bash
npm run deploy
```

This will deploy the functions to your Firebase project and make the API available at the specified URL.

### 8. Linting and Formatting

Ensure your code is linted and formatted using:

```bash
npm run lint
npm run format
```

### 9. Firebase Environment Setup

Ensure that you've added the correct CORS configuration for your frontend URLs in the Firebase project, especially for production and development URLs.
