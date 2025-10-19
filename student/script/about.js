// Get elements
const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logoutModal');
const logoutSuccessModal = document.getElementById('logoutSuccessModal');
const cancelLogout = document.getElementById('cancelLogout');
const confirmLogout = document.getElementById('confirmLogout');
const okLogout = document.getElementById('okLogout');

// Show logout confirmation modal
logoutBtn.addEventListener('click', () => {
    logoutModal.style.display = 'flex';
});

// Cancel logout
cancelLogout.addEventListener('click', () => {
    logoutModal.style.display = 'none';
});

// Confirm logout → show success message
confirmLogout.addEventListener('click', () => {
    logoutModal.style.display = 'none';
    logoutSuccessModal.style.display = 'flex';
});

// OK button → close success modal and redirect to login page
okLogout.addEventListener('click', () => {
    logoutSuccessModal.style.display = 'none';
    window.location.href = "landingPage.html"; // redirect after logout
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === logoutModal) {
        logoutModal.style.display = 'none';
    }
    if (event.target === logoutSuccessModal) {
        logoutSuccessModal.style.display = 'none';
    }
});
