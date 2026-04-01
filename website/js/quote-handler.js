/**
 * SKANDA ENGINEERING - QUOTE HANDLER
 * Quote form submission and management
 */

document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmit);
        displayUserQuotes();
    }
});

function handleQuoteSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!validateQuoteForm()) {
        utils.showAlert('Please fill all required fields correctly', 'danger', 'alert-container');
        return;
    }

    // Collect form data
    const quoteData = {
        fullName: document.getElementById('fullName').value.trim(),
        company: document.getElementById('company').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        industry: document.getElementById('industry').value,
        serviceType: document.getElementById('serviceType').value,
        quantity: document.getElementById('quantity').value || '1',
        projectDescription: document.getElementById('projectDescription').value.trim(),
        timeline: document.getElementById('timeline').value,
        budget: document.getElementById('budget').value,
        additionalNotes: document.getElementById('additionalNotes').value.trim(),
    };

    try {
        // Save to DataStore
        const savedQuote = dataStore.saveQuote(quoteData);

        // Save as customer as well
        const customerData = {
            fullName: quoteData.fullName,
            company: quoteData.company,
            email: quoteData.email,
            phone: quoteData.phone,
            industry: quoteData.industry,
            source: 'website_quote'
        };
        dataStore.saveCustomer(customerData);

        // Show success message
        utils.showAlert(
            `Quote request submitted successfully! Your quote ID is ${savedQuote.id}. We'll contact you within 24 hours.`,
            'success',
            'alert-container'
        );

        // Reset form
        document.getElementById('quoteForm').reset();

        // Refresh quotes list
        setTimeout(() => {
            displayUserQuotes();
        }, 1000);

    } catch (error) {
        console.error('Error submitting quote:', error);
        utils.showAlert('Error submitting quote. Please try again.', 'danger', 'alert-container');
    }
}

function validateQuoteForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const company = document.getElementById('company').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const projectDescription = document.getElementById('projectDescription').value.trim();
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (!fullName || fullName.length < 3) {
        return false;
    }

    if (!company || company.length < 2) {
        return false;
    }

    if (!utils.validateEmail(email)) {
        return false;
    }

    if (!utils.validatePhone(phone)) {
        return false;
    }

    if (!projectDescription || projectDescription.length < 10) {
        return false;
    }

    if (!agreeTerms) {
        return false;
    }

    return true;
}

function displayUserQuotes() {
    const userEmail = localStorage.getItem('user_email');
    const quotesList = document.getElementById('quotesList');

    if (!quotesList) return;

    if (!userEmail) {
        quotesList.innerHTML = '<p style="color: var(--text-light);">📝 Submit a quote request to see your submissions here.</p>';
        return;
    }

    const userQuotes = dataStore.getQuotes(userEmail);

    if (userQuotes.length === 0) {
        quotesList.innerHTML = '<p style="color: var(--text-light);">No quotes submitted yet.</p>';
        return;
    }

    let html = '<table><thead><tr><th>Quote ID</th><th>Service</th><th>Status</th><th>Submitted</th></tr></thead><tbody>';

    userQuotes.forEach(quote => {
        const statusBadge = getStatusBadge(quote.status);
        html += `
            <tr>
                <td><strong>${quote.id}</strong></td>
                <td>${quote.serviceType}</td>
                <td>${statusBadge}</td>
                <td>${utils.formatDate(quote.createdAt)}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    quotesList.innerHTML = html;
}

function getStatusBadge(status) {
    const statusMap = {
        'pending': '<span class="badge" style="background-color: #F59E0B;">Pending</span>',
        'quoted': '<span class="badge" style="background-color: #3B82F6;">Quoted</span>',
        'accepted': '<span class="badge" style="background-color: #10B981;">Accepted</span>',
        'rejected': '<span class="badge" style="background-color: #EF4444;">Rejected</span>'
    };
    return statusMap[status] || `<span class="badge">${status}</span>`;
}
