/**
 * SKANDA ENGINEERING - MAIN WEBSITE JS
 * Common functionality and utilities
 */

// Utility Functions
const utils = {
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0
        }).format(amount);
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Format datetime
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Show alert
    showAlert(message, type = 'info', containerId = 'alert-container') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        container.innerHTML = '';
        container.appendChild(alertDiv);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    },

    // Validate email
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Validate phone
    validatePhone(phone) {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone.replace(/[^\d]/g, ''));
    },

    // Sanitize input
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    // Get query parameter
    getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }
};

// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Add any global initialization code here
    console.log('Skanda Engineering Website Initialized');
}

// Export for use in other scripts
window.utils = utils;
