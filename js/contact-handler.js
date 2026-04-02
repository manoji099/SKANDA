/**
 * SKANDA ENGINEERING - CONTACT HANDLER
 * Contact form submission
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function handleContactSubmit(event) {
    event.preventDefault();

    // Validate form
    if (!validateContactForm()) {
        utils.showAlert('Please fill all required fields correctly', 'danger', 'contact-alert-container');
        return;
    }

    // Collect form data
    const contactData = {
        fullName: document.getElementById('contactName').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        phone: document.getElementById('contactPhone').value.trim(),
        subject: document.getElementById('contactSubject').value.trim(),
        message: document.getElementById('contactMessage').value.trim(),
    };

    try {
        // Save contact
        dataStore.saveContact(contactData);

        // Show success message
        utils.showAlert(
            'Thank you for contacting us! We will get back to you within 24 hours.',
            'success',
            'contact-alert-container'
        );

        // Reset form
        document.getElementById('contactForm').reset();

    } catch (error) {
        console.error('Error submitting contact form:', error);
        utils.showAlert('Error submitting message. Please try again.', 'danger', 'contact-alert-container');
    }
}

function validateContactForm() {
    const fullName = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!fullName || fullName.length < 3) {
        return false;
    }

    if (!utils.validateEmail(email)) {
        return false;
    }

    if (!subject || subject.length < 5) {
        return false;
    }

    if (!message || message.length < 10) {
        return false;
    }

    return true;
}
