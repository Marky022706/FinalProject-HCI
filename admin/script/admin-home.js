// 🧱 Create a class to handle Logout and Navigation features
class DashboardSystem {

    // 🔧 Constructor runs when we create an object from this class
    constructor(logoutBtnId, logoutModalId, logoutSuccessId, cancelId, confirmId, okId, hamburgerId, navId) {

        // 🎯 Get all the elements by their IDs
        this.logoutBtn = document.getElementById(logoutBtnId);          // Logout button
        this.logoutModal = document.getElementById(logoutModalId);      // Logout confirmation modal
        this.logoutSuccessModal = document.getElementById(logoutSuccessId); // Success modal
        this.cancelLogout = document.getElementById(cancelId);          // Cancel button
        this.confirmLogout = document.getElementById(confirmId);        // Confirm button
        this.okLogout = document.getElementById(okId);                  // OK button after success
        this.hamburger = document.getElementById(hamburgerId);          // Hamburger icon for mobile
        this.mainNav = document.getElementById(navId);                  // Main navigation menu

        // 🧠 Initialize event listeners for all buttons
        this.initEvents();
    }

    // ⚙️ Method to set up all the event listeners
    initEvents() {

        // 🚪 When logout button is clicked → show the confirmation modal
        this.logoutBtn.addEventListener('click', () => this.showLogoutModal());

        // ❌ When cancel button is clicked → hide the confirmation modal
        this.cancelLogout.addEventListener('click', () => this.hideLogoutModal());

        // ✅ When confirm logout is clicked → show success message
        this.confirmLogout.addEventListener('click', () => this.confirmLogoutAction());

        // 🆗 When OK button is clicked → close success modal and redirect
        this.okLogout.addEventListener('click', () => this.redirectToLogin());

        // 🪟 When user clicks outside the modals → close them
        window.addEventListener('click', (event) => this.closeOnOutsideClick(event));

        // 🍔 When hamburger icon is clicked → toggle the navigation menu
        this.hamburger.addEventListener('click', () => this.toggleNavigation());
    }

    // 🪄 Show the logout confirmation modal
    showLogoutModal() {
        this.logoutModal.style.display = 'flex';
    }

    // 🚫 Hide the logout confirmation modal
    hideLogoutModal() {
        this.logoutModal.style.display = 'none';
    }

    // ✅ Confirm logout → hide modal, then show success modal
    confirmLogoutAction() {
        this.logoutModal.style.display = 'none';
        this.logoutSuccessModal.style.display = 'flex';
    }

    // 🔁 Redirect to login page after clicking OK
    redirectToLogin() {
        this.logoutSuccessModal.style.display = 'none';
        window.location.href = "studentdashboard-landingPage.html";
    }

    // 🪟 Close modals when clicking outside them
    closeOnOutsideClick(event) {
        if (event.target === this.logoutModal) {
            this.logoutModal.style.display = 'none';
        }
        if (event.target === this.logoutSuccessModal) {
            this.logoutSuccessModal.style.display = 'none';
        }
    }

    // 📱 Toggle mobile navigation visibility
    toggleNavigation() {
        this.mainNav.classList.toggle('active');
    }
}

// 🚀 Create an instance (object) of DashboardSystem
const dashboard = new DashboardSystem(
    'logoutBtn',            // ID for logout button
    'logoutModal',          // ID for confirmation modal
    'logoutSuccessModal',   // ID for success modal
    'cancelLogout',         // ID for cancel button
    'confirmLogout',        // ID for confirm button
    'okLogout',             // ID for OK button
    'hamburger',            // ID for hamburger icon
    'mainNav'               // ID for navigation bar
);


