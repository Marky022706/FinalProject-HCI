// 🧱 Define a class named "LoginSystem"
class LoginSystem {

    constructor(emailId, passwordId, toggleId, buttonId, messageId) {
        this.emailInput = document.getElementById(emailId);
        this.passwordInput = document.getElementById(passwordId);
        this.togglePassword = document.getElementById(toggleId);
        this.loginBtn = document.getElementById(buttonId);
        this.message = document.getElementById(messageId);
        this.isVisible = false;
        this.initEvents();
    }

    // ⚙️ Set event listeners
    initEvents() {
        this.togglePassword.addEventListener('click', () => this.toggleVisibility());
        this.loginBtn.addEventListener('click', (e) => this.login(e));
    }

    // 👁️ Toggle password visibility
    toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.passwordInput.type = this.isVisible ? 'text' : 'password';
    }

    // 🔐 Login process
    login(event) {
        event.preventDefault();

        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value.trim();

        const studentEmail = "student@srcb.ph";
        const studentPassword = "student";
        const adminEmail = "admin@srcb.ph";
        const adminPassword = "admin";

        // ✅ Student Authentication
        if (email === studentEmail && password === studentPassword) {
            this.showMessage("✅ Login successful! Redirecting...", "success");

            this.emailInput.classList.remove('error-border');
            this.passwordInput.classList.remove('error-border');
            this.emailInput.classList.add('success-border');
            this.passwordInput.classList.add('success-border');

            setTimeout(() => {
                window.location.href = "student-home.html";
            }, 1500);

        // ✅ Admin Authentication
        } else if (email === adminEmail && password === adminPassword) {
            this.showMessage("✅ Login successful! Redirecting...", "success");

            this.emailInput.classList.remove('error-border');
            this.passwordInput.classList.remove('error-border');
            this.emailInput.classList.add('success-border');
            this.passwordInput.classList.add('success-border');

            setTimeout(() => {
                window.location.href = "admin-home.html";
            }, 1500);

        // ❌ Invalid Credentials
        } else {
            this.showMessage("❌ Invalid email or password.", "error");

            this.emailInput.classList.add('error-border', 'shake');
            this.passwordInput.classList.add('error-border', 'shake');

            setTimeout(() => {
                this.emailInput.classList.remove('shake');
                this.passwordInput.classList.remove('shake');
            }, 500);
        }

        if (email === "" || password === "") {
            this.showMessage("❌ Please fill in all fields.", "error");
        }
    }

    // 💬 Display message
    showMessage(text, type) {
        this.message.textContent = text;
        this.message.className = `message ${type}`;
    }
}

// 🚀 Create instance
const loginSystem = new LoginSystem('email', 'password', 'togglePassword', 'loginBtn', 'message');
