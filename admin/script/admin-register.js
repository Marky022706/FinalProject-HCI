// script.js

/**
 * Manages the student registration form's validation and submission.
 */
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) {
            console.error(`Form with ID "${formId}" not found.`);
            return;
        }
        this.fields = {
            fullName: document.getElementById('fullName'),
            gmailAccount: document.getElementById('gmailAccount'),
            studentID: document.getElementById('studentID'),
            gradeYearLevel: document.getElementById('gradeYearLevel'),
            courseStrand: document.getElementById('courseStrand'),
            sectionBlock: document.getElementById('sectionBlock'),
            registrationDate: document.getElementById('registrationDate')
        };
        this.cancelButton = this.form.querySelector('.btn-cancel');

        this.init();
    }

    /**
     * Initializes the form by attaching event listeners.
     */
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        if (this.cancelButton) {
            this.cancelButton.addEventListener('click', this.handleCancel.bind(this));
        }
    }

    /**
     * Performs client-side validation for the form fields.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    validateForm() {
        const { fullName, gmailAccount, studentID, gradeYearLevel, courseStrand, sectionBlock, registrationDate } = this.fields;

        if (!fullName.value.trim()) {
            alert('Full Name is required.');
            fullName.focus();
            return false;
        }
        if (!gmailAccount.value.trim() || !gmailAccount.checkValidity()) {
            alert('A valid Gmail Account is required.');
            gmailAccount.focus();
            return false;
        }
        if (!studentID.value.trim()) {
            alert('Student ID Number is required.');
            studentID.focus();
            return false;
        }
        if (!gradeYearLevel.value) {
            alert('Grade / Year Level is required.');
            gradeYearLevel.focus();
            return false;
        }
        if (!courseStrand.value) {
            alert('Course / Strand is required.');
            courseStrand.focus();
            return false;
        }
        if (!sectionBlock.value.trim()) {
            alert('Section / Block is required.');
            sectionBlock.focus();
            return false;
        }
        if (!registrationDate.value) {
            alert('Registration Date is required.');
            registrationDate.focus();
            return false;
        }
        return true;
    }

    /**
     * Handles the form submission event.
     * @param {Event} event The submit event.
     */
    handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        if (this.validateForm()) {
            const studentData = {};
            for (const key in this.fields) {
                studentData[key] = this.fields[key].value.trim();
            }
            console.log('Student Data:', studentData);

            // --- This is where you would typically send the data to a server ---
            /*
            fetch('/api/register-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(studentData),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Student registered successfully!');
                this.form.reset(); // Clear the form
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error registering the student.');
            });
            */
            alert('Student registered successfully! (Check console for data)');
            this.form.reset(); // Clear the form after successful "submission"
        }
    }

    /**
     * Handles the form cancellation event.
     */
    handleCancel() {
        if (confirm('Are you sure you want to cancel and clear the form?')) {
            this.form.reset();
            alert('Form has been cleared.');
        }
    }
}

/**
 * Manages global application elements like navigation icons.
 */
class App {
    constructor() {
        this.notificationIcon = document.getElementById('notificationIcon');
        this.logoutIcon = document.getElementById('logoutIcon');

        this.init();
    }

    /**
     * Initializes the application by attaching global event listeners.
     */
    init() {
        this.attachIconListeners();
    }

    /**
     * Attaches click listeners to the notification and logout icons.
     */
    attachIconListeners() {
        if (this.notificationIcon) {
            this.notificationIcon.addEventListener('click', this.handleNotificationClick);
        }

        if (this.logoutIcon) {
            this.logoutIcon.addEventListener('click', this.handleLogoutClick);
        }
    }

    /**
     * Handles the click event for the notification icon.
     * @param {Event} event The click event.
     */
    handleNotificationClick(event) {
        event.preventDefault();
        alert('Notification icon clicked! (Implement your notification logic here)');
        // In a real app, you might show a notification dropdown or go to a notifications page.
    }

    /**
     * Handles the click event for the logout icon.
     * @param {Event} event The click event.
     */
    handleLogoutClick(event) {
        event.preventDefault();
        if (confirm('Are you sure you want to log out?')) {
            alert('Logging out...');
            // In a real app, you would redirect to a logout endpoint or clear session data.
            // window.location.href = '/logout';
        }
    }
}

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler('studentRegistrationForm');
    new App();
});