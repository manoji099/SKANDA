# Firebase Integration Setup Guide

## Overview

This guide walks you through setting up Firebase for the Skanda Engineering Admin Dashboard. Firebase provides cloud-based authentication and data storage, enabling users to securely log in and sync data across devices.

---

## Section 1: Create Firebase Project

### Step 1.1: Go to Firebase Console
1. Visit: [https://console.firebase.google.com](https://console.firebase.google.com)
2. Sign in with your Google account (or create one)
3. Click **"Add project"** or **"Create a project"**

### Step 1.2: Configure Project
1. **Project Name:** `Skanda Engineering`
2. Click **Continue**
3. Enable Google Analytics (optional) → Click **Continue**
4. Choose account and location
5. Click **Create Project**
6. Wait for project creation to complete (1-2 minutes)

### Step 1.3: Access Project Settings
1. From the Firebase console, click the **gear icon** (⚙️) → **Project Settings**
2. Go to the **General** tab
3. Scroll down to **"Your apps"** section
4. Click **"Add app"** → Select **"Web"** (</>)

### Step 1.4: Register Web App
1. **App nickname:** `Skanda Admin Dashboard`
2. Check **"Also set up Firebase Hosting for this app"** (optional)
3. Click **Register app**

---

## Section 2: Get Firebase Config

### Step 2.1: Copy Firebase Config
After registering the web app, you'll see the Firebase SDK initialization code. It looks like:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### Step 2.2: Update firebase-config.js
1. Open `backend/js/firebase-config.js` in your editor
2. Replace the placeholder config with your actual values
3. Save the file

**Example:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD1234567890abcdef1234567890abcd",
  authDomain: "skanda-engineering.firebaseapp.com",
  projectId: "skanda-engineering",
  storageBucket: "skanda-engineering.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

---

## Section 3: Enable Authentication

### Step 3.1: Enable Email/Password Auth
1. In Firebase console, go to **Authentication** (left sidebar)
2. Click **Get Started** button
3. Select **Email/Password** provider
4. Toggle **Enable** to ON
5. Toggle **Email link sign-in** as preferred (optional)
6. Click **Save**

### Step 3.2: Create First Admin User
1. Go to **Authentication** → **Users** tab
2. Click **Add user** button
3. Enter:
   - **Email:** `admin@skanda.com`
   - **Password:** `Choose a strong password (minimum 8 characters)`
4. Click **Add user**
5. Note the User UID (you may need this later)

### Step 3.3: Set Admin Claims (Optional but Recommended)
For advanced role-based access, you can set custom claims:

1. Go to **Authentication** → **Users**
2. Click the user you just created
3. In the Custom Claims section, add:
```json
{
  "admin": true,
  "role": "administrator"
}
```
4. Save changes

---

## Section 4: Set Up Firestore Database

### Step 4.1: Create Firestore Database
1. In Firebase console, go to **Firestore Database** (left sidebar)
2. Click **Create database** button
3. Choose location:
   - **For India:** Select `asia-south1 (Delhi)`
   - **For other regions:** Choose closest region
4. Click **Next**

### Step 4.2: Choose Security Rules
1. Select **Start in test mode** (for development)
   - ⚠️ Production uses more restrictive rules (see Section 5)
2. Click **Create**
3. Wait for database to initialize (1-2 minutes)

### Step 4.3: Verify Database Structure
The Firestore structure will be automatically created by the app:
```
Firestore Database
├── users/{uid}/customers
├── users/{uid}/products
├── users/{uid}/quotes
├── users/{uid}/orders
├── users/{uid}/invoices
└── users/{uid}/challans
```

---

## Section 5: Configure Security Rules

### Step 5.1: Set Production Security Rules
⚠️ Important: Test mode allows anyone to read/write. Use these rules for production:

1. In Firestore, go to **Rules** tab
2. Replace ALL content with:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Verify user is authenticated
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      
      // Collections owned by user
      match /{document=**} {
        allow read, write: if request.auth.uid == userId;
      }
    }
    
    // Public read-only data (optional)
    match /public/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

3. Click **Publish**
4. Confirm the update

---

## Section 6: Testing the Integration

### Step 6.1: Test Login Page
1. Open: `http://localhost:8000/admin/login.html` (or your hosting URL)
2. Click **"Create one"** to show signup form
3. **OR** enter existing credentials:
   - Email: `admin@skanda.com`
   - Password: (the password you set)
4. Click **Sign In**
5. Should redirect to admin dashboard

### Step 6.2: Verify Authentication
In the admin dashboard:
- Check that user email appears in top-right header
- Verify logout button works
- Logout and confirm redirect to login page

### Step 6.3: Check Firestore
1. Go to Firebase console → **Firestore Database**
2. Navigate to `users/{userId}/customers`
3. Add a new customer in admin dashboard
4. Refresh Firestore console - new data should appear

---

## Section 7: Troubleshooting

### Issue: "Firebase config is not initialized" error

**Solution:**
1. Verify firebase-config.js contains correct values
2. Check browser console (F12 → Console tab)
3. Ensure all Firebase SDK scripts loaded (F12 → Network tab)
4. Restart development server

### Issue: Cannot sign in - "Auth not initialized"

**Solution:**
1. Verify firebase-auth.js is loaded AFTER firebase-config.js
2. Check that `firebaseAuth` object exists in console: `console.log(firebaseAuth)`
3. Make sure Firebase SDK version matches: 9.23.0

### Issue: Firestore data not syncing

**Solution:**
1. Check Firebase console → Firestore for database creation
2. Verify security rules allow user's UID
3. Check browser console for error messages
4. Try test mode rules temporarily to debug

### Issue: Signup works but can't login after

**Solution:**
1. Wait 5 seconds after signup (Firebase needs time to create user)
2. Verify email/password are correct
3. Check Firebase console → Authentication → Users (confirm user exists)
4. Clear browser cache and try again

---

## Section 8: Production Deployment

### Step 8.1: Enable Firestore Persistence
Already included in firebase-datastore.js:
```javascript
enableIndexedDbPersistence(firebaseDb);
```
This enables offline data access.

### Step 8.2: Set Up Backups
1. Firebase console → **Firestore Database** → **Backups**
2. Create automated backup schedule
3. Choose retention period (7-35 days)

### Step 8.3: Monitor Usage
1. Firebase console → **Usage Dashboard**
2. Set up billing alerts
3. Monitor reads/writes per day

### Step 8.4: Enable CORS (if using custom domain)
1. Go to **Storage Rules** tab
2. Add CORS headers to allow cross-origin requests

---

## Section 9: Architecture Overview

### Data Flow Diagram
```
┌─────────────────────────────────────────┐
│  Admin Dashboard (HTML/CSS/JS)          │
│  ├─ login.html (authentication)         │
│  ├─ index.html (main dashboard)         │
│  └─ admin-main.js (business logic)      │
└────────────┬────────────────────────────┘
             │
             ├─────────────────┬───────────────┐
             │                 │               │
             ▼                 ▼               ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │ Firebase     │  │LocalStorage  │  │SessionStorage│
    │Authentication│  │(Backup)      │  │(Current)     │
    └──────────────┘  └──────────────┘  └──────────────┘
             │                 │               │
             └─────────────────┴───────────────┘
                        │
                        ▼
            ┌──────────────────────┐
            │ Firestore Database   │
            │ (Cloud Persistence)  │
            └──────────────────────┘
```

### Data Sync Strategy
1. **Online:** Data syncs to Firestore in real-time
2. **Offline:** Data stored in LocalStorage
3. **Reconnect:** Automatic sync when connection restored

---

## Section 10: File References

### Key Files for Firebase Integration

| File | Purpose |
|------|---------|
| `backend/js/firebase-config.js` | Firebase initialization & config |
| `backend/js/firebase-auth.js` | Authentication (login/signup/logout) |
| `backend/js/firebase-datastore.js` | Firestore data operations |
| `admin/login.html` | User login page |
| `admin/index.html` | Main dashboard with auth check |
| `backend/js/data-store.js` | LocalStorage fallback (legacy) |

### Code Usage Examples

#### Check if User is Logged In
```javascript
firebaseAuth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User logged in:', user.email);
  } else {
    console.log('User logged out');
  }
});
```

#### Save Data to Firestore
```javascript
const firebaseDataStore = new FirebaseDataStore();
await firebaseDataStore.saveCustomer({
  fullName: 'Acme Corp',
  email: 'contact@acme.com',
  phone: '+91-9876543210'
});
```

#### Get Current User UID
```javascript
firebaseAuth.getCurrentUser().then(user => {
  console.log('User UID:', user.uid);
});
```

---

## Section 11: Next Steps

After completing Firebase setup:

1. ✅ Test login/logout flow
2. ✅ Add a customer and verify Firestore sync
3. ✅ Test offline mode (disable internet)
4. ✅ Set up additional users if needed
5. ✅ Deploy to production with proper security rules

---

## Support & Resources

### Firebase Documentation
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)

### Skanda Project Docs
- [README.md](./README.md) - Project overview
- [INSTALLATION.md](./INSTALLATION.md) - Local setup
- [PROJECT-COMPLETION.md](./PROJECT-COMPLETION.md) - Feature checklist

### Contact & Debug
- Check browser console: `F12 → Console tab`
- View Firebase logs: `https://console.firebase.google.com/u/0/v1/run/` 
- Firestore rules validator: Built into Firebase console

---

**Last Updated:** April 2026  
**Firebase SDK Version:** 9.23.0  
**Compatible With:** All modern browsers (Chrome, Firefox, Safari, Edge)
