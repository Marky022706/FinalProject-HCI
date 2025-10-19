// 🧱 Define a class for the Get Started button behavior
class LandingPage {

    // 🔧 Constructor runs automatically when object is created
    constructor(buttonId) {

        // 🎯 Get the button element by its ID
        this.button = document.getElementById(buttonId);

        // ⚙️ Initialize event listeners
        this.initEvents();
    }

    // 🧠 Method to add the event listener to the button
    initEvents() {

        // 🖱️ When the button is clicked → call handleButtonClick()
        this.button.addEventListener('click', (e) => this.handleButtonClick(e));
    }

    // 🚀 Method that handles the button click
    handleButtonClick(event) {

        // 🚫 Prevent automatic page reload or default link behavior
        event.preventDefault();

        // 🌫️ Add fade-out animation to the body
        document.body.classList.add("fade-out");

        // ⏳ Wait briefly for the fade animation to complete then redirect
        // Keep this slightly longer than the CSS transition (220ms) for smoothness
        setTimeout(() => {
            window.location.href = "login.html";
        }, 280);
    }
}

// ✅ Create an instance (object) of the LandingPage class
const landingPage = new LandingPage('getStartedBtn');
