/**
 * SKANDA ENGINEERING - FIREBASE CONFIGURATION
 * Firebase setup for authentication and Firestore database
 */

// Firebase configuration
// Replace these values with your Firebase project credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence
db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
        } else if (err.code == 'unimplemented') {
            console.log('The current browser does not support all of the features required to enable persistence');
        }
    });

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to Firebase Console: https://console.firebase.google.com
 * 2. Create a new project (or select existing)
 * 3. Enable Authentication:
 *    - Authentication → Sign-in method
 *    - Enable Email/Password
 * 4. Create Firestore Database:
 *    - Firestore Database → Create database
 *    - Start in test mode (for development)
 *    - Choose region: asia-south1 (for India)
 * 5. Get your config values:
 *    - Project Settings → Your apps → Firebase SDK snippet
 *    - Copy the firebaseConfig object values above
 * 6. Security Rules for Firestore:
 *    
 *    rules_version = '2';
 *    service cloud.firestore {
 *      match /databases/{database}/documents {
 *        // Users collection - only accessible by authenticated users
 *        match /users/{userId} {
 *          allow read, write: if request.auth.uid == userId;
 *        }
 *        
 *        // Customers collection - only accessible by authenticated users
 *        match /customers/{document=**} {
 *          allow read, write: if request.auth != null;
 *        }
 *        
 *        // Products collection - accessible by all authenticated users
 *        match /products/{document=**} {
 *          allow read, write: if request.auth != null;
 *        }
 *        
 *        // Quotes collection
 *        match /quotes/{document=**} {
 *          allow read, write: if request.auth != null;
 *        }
 *        
 *        // Orders collection
 *        match /orders/{document=**} {
 *          allow read, write: if request.auth != null;
 *        }
 *      }
 *    }
 */

// Export for use in other modules
window.firebaseConfig = { auth, db };
