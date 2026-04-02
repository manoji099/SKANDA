/**
 * SKANDA ENGINEERING - FIREBASE AUTHENTICATION
 * Handles user login, signup, and session management
 */

class FirebaseAuth {
    constructor() {
        this.auth = window.firebaseConfig?.auth;
        this.db = window.firebaseConfig?.db;
        this.currentUser = null;
    }

    /**
     * Sign up a new admin user
     */
    async signup(email, password, displayName) {
        try {
            const result = await this.auth.createUserWithEmailAndPassword(email, password);
            const user = result.user;

            // Create user profile
            await user.updateProfile({
                displayName: displayName
            });

            // Create user document in Firestore
            await this.db.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: email,
                displayName: displayName,
                role: 'admin',
                createdAt: new Date().toISOString(),
                company: 'Skanda Engineering'
            });

            return { success: true, user: user, uid: user.uid };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Login with email and password
     */
    async login(email, password) {
        try {
            const result = await this.auth.signInWithEmailAndPassword(email, password);
            this.currentUser = result.user;
            localStorage.setItem('skanda_user', JSON.stringify({
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                loginTime: new Date().toISOString()
            }));
            return { success: true, user: result.user, uid: result.user.uid };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Logout current user
     */
    async logout() {
        try {
            await this.auth.signOut();
            this.currentUser = null;
            localStorage.removeItem('skanda_user');
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Get current logged-in user
     */
    getCurrentUser() {
        return this.auth.currentUser;
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.auth.currentUser !== null;
    }

    /**
     * Setup auth state observer
     */
    onAuthStateChanged(callback) {
        return this.auth.onAuthStateChanged(callback);
    }

    /**
     * Reset password
     */
    async resetPassword(email) {
        try {
            await this.auth.sendPasswordResetEmail(email);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    /**
     * Get user's UID
     */
    getUserId() {
        return this.auth.currentUser?.uid || null;
    }

    /**
     * Get user's email
     */
    getUserEmail() {
        return this.auth.currentUser?.email || null;
    }

    /**
     * Get user's display name
     */
    getUserDisplayName() {
        return this.auth.currentUser?.displayName || 'Admin';
    }
}

// Create global instance
const firebaseAuth = new FirebaseAuth();
