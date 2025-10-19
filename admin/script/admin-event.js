// admin/script/admin-event.js

/**
 * Manages the core event listing, adding, editing, and deleting functionality.
 */
class EventManager {
    constructor() {
        this.eventList = document.getElementById('eventList');
        this.eventFormModal = document.getElementById('eventFormModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.showAddEventModalBtn = document.getElementById('showAddEventModal');
        this.cancelEventFormBtn = document.getElementById('cancelEventForm');
        this.saveEventFormBtn = document.getElementById('saveEventForm');
        this.saveAllEventsBtn = document.getElementById('saveAllEvents');

        this.eventTitleInput = document.getElementById('eventTitle');
        this.eventLocationInput = document.getElementById('eventLocation');
        this.eventDateInput = document.getElementById('eventDate');
        this.eventTimeInput = document.getElementById('eventTime');
        this.eventDescriptionInput = document.getElementById('eventDescription');
        this.eventCapacityInput = document.getElementById('eventCapacity');
        this.eventOrganizerInput = document.getElementById('eventOrganizer');

        this.currentEditingEventId = null;
        this.nextEventId = 3; // Start after initial example events

        this.init();
    }

    init() {
        document.querySelectorAll('.event-row').forEach(row => this.attachRowEventListeners(row));
        this.showAddEventModalBtn.addEventListener('click', this.showAddEventModal.bind(this));
        this.cancelEventFormBtn.addEventListener('click', this.hideEventFormModal.bind(this));
        this.saveEventFormBtn.addEventListener('click', this.saveEventForm.bind(this));
        this.saveAllEventsBtn.addEventListener('click', this.saveAllEvents.bind(this));
        this.eventFormModal.addEventListener('click', this.closeModalOnOutsideClick.bind(this));
        // Prevent clicks inside the modal content from closing it
        this.eventFormModal.querySelector('.add-event-panel').addEventListener('click', (e) => e.stopPropagation());
    }

    clearEventForm() {
        this.eventTitleInput.value = '';
        this.eventLocationInput.value = '';
        this.eventDateInput.value = '';
        this.eventTimeInput.value = '';
        this.eventDescriptionInput.value = '';
        this.eventCapacityInput.value = '';
        this.eventOrganizerInput.value = '';
    }

    fillEventForm(eventData) {
        this.eventTitleInput.value = eventData.title || '';
        this.eventLocationInput.value = eventData.location || '';
        this.eventDateInput.value = eventData.date || '';
        this.eventTimeInput.value = eventData.time || '';
        this.eventDescriptionInput.value = eventData.description || '';
        this.eventCapacityInput.value = eventData.capacity || '';
        this.eventOrganizerInput.value = eventData.organizer || '';
    }

    attachRowEventListeners(rowElement) {
        rowElement.querySelector('.edit-icon').addEventListener('click', () => {
            this.currentEditingEventId = rowElement.dataset.eventId;
            this.modalTitle.textContent = 'Edit Event';
            this.saveEventFormBtn.textContent = 'Update';

            const eventData = {
                title: rowElement.dataset.title,
                location: rowElement.dataset.location,
                date: rowElement.dataset.date,
                time: rowElement.dataset.time,
                description: rowElement.dataset.description,
                capacity: rowElement.dataset.capacity,
                organizer: rowElement.dataset.organizer
            };
            this.fillEventForm(eventData);
            this.eventFormModal.classList.add('active');
            this.eventTitleInput.focus();
            console.log('Editing event ID:', this.currentEditingEventId);
        });

        rowElement.querySelector('.delete-icon').addEventListener('click', () => {
            const eventName = rowElement.dataset.title || rowElement.querySelector('.event-input').value;
            if (confirm(`Are you sure you want to delete "${eventName}"?`)) {
                rowElement.remove();
                console.log('Delete event:', eventName);
                // In a real app, send delete request to backend
            }
        });
    }

    showAddEventModal() {
        this.currentEditingEventId = null;
        this.modalTitle.textContent = 'Add Event';
        this.saveEventFormBtn.textContent = 'Save';
        this.clearEventForm();
        this.eventFormModal.classList.add('active');
        this.eventTitleInput.focus();
    }

    hideEventFormModal() {
        this.eventFormModal.classList.remove('active');
        this.clearEventForm();
    }

    saveEventForm() {
        const eventTitle = this.eventTitleInput.value.trim();
        const location = this.eventLocationInput.value.trim();
        const date = this.eventDateInput.value.trim();
        const time = this.eventTimeInput.value.trim();
        const description = this.eventDescriptionInput.value.trim();
        const capacity = this.eventCapacityInput.value.trim();
        const organizer = this.eventOrganizerInput.value.trim();

        if (eventTitle === '') {
            alert('Event Title cannot be empty!');
            this.eventTitleInput.focus();
            return;
        }

        const newEventData = { title: eventTitle, location, date, time, description, capacity, organizer };

        if (this.currentEditingEventId) {
            const eventRowToUpdate = document.querySelector(`.event-row[data-event-id="${this.currentEditingEventId}"]`);
            if (eventRowToUpdate) {
                eventRowToUpdate.querySelector('.event-input').value = eventTitle;
                Object.keys(newEventData).forEach(key => {
                    eventRowToUpdate.dataset[key] = newEventData[key];
                });
                console.log('Event updated:', this.currentEditingEventId, newEventData);
                alert(`Event "${eventTitle}" updated successfully!`);
            }
        } else {
            const newEventRow = document.createElement('div');
            const eventId = this.nextEventId++;
            newEventRow.classList.add('event-row');
            newEventRow.dataset.eventId = eventId;
            Object.keys(newEventData).forEach(key => {
                newEventRow.dataset[key] = newEventData[key];
            });

            newEventRow.innerHTML = `
                <input type="text" value="${eventTitle}" class="event-input" readonly>
                <div class="actions-icons">
                    <i class="fas fa-pencil-alt action-icon edit-icon"></i>
                    <i class="fas fa-trash-alt action-icon delete-icon"></i>
                </div>
            `;
            this.eventList.appendChild(newEventRow);
            this.attachRowEventListeners(newEventRow);

            console.log('New event added:', eventId, newEventData);
            alert(`New event "${eventTitle}" added successfully!`);
        }

        this.hideEventFormModal();
        this.currentEditingEventId = null;
    }

    saveAllEvents() {
        const events = [];
        document.querySelectorAll('#eventList .event-row').forEach(row => {
            events.push({
                id: row.dataset.eventId,
                title: row.dataset.title,
                location: row.dataset.location,
                date: row.dataset.date,
                time: row.dataset.time,
                description: row.dataset.description,
                capacity: row.dataset.capacity,
                organizer: row.dataset.organizer
            });
        });
        console.log('Saving all events (full data):', events);
        alert('All visible event changes saved!');
        // In a real application, you'd send this full data to a backend API.
    }

    closeModalOnOutsideClick(event) {
        if (event.target === this.eventFormModal) {
            this.hideEventFormModal();
        }
    }
}

/**
 * Manages notification panel, badge, logout modals, and mobile navigation.
 */
class AdminDashboardUI {
    constructor() {
        this.notifBell = document.getElementById('notifBell');
        this.notifBadge = document.getElementById('notifBadge');
        this.notificationPanel = document.getElementById('notificationPanel');
        this.closeNotifPanelBtn = document.getElementById('closeNotifPanel');
        this.markAllReadBtn = document.getElementById('markAllReadBtn');
        this.deleteAllNotifBtn = document.getElementById('deleteAllNotifBtn');
        this.notificationList = document.getElementById('notificationList');

        this.logoutBtn = document.getElementById('logoutBtn');
        this.logoutModal = document.getElementById('logoutModal');
        this.logoutSuccessModal = document.getElementById('logoutSuccessModal');
        this.cancelLogout = document.getElementById('cancelLogout');
        this.confirmLogout = document.getElementById('confirmLogout');
        this.okLogout = document.getElementById('okLogout');

        this.hamburger = document.getElementById('hamburger');
        // We'll create a new element for the mobile overlay since current nav-item is not structured for it
        this.mobileNavOverlay = null; // Will be created dynamically if needed

        this.init();
    }

    init() {
        this.attachNotificationListeners();
        this.attachLogoutListeners();
        this.attachMobileNavListeners();
        this.updateNotificationCount(); // Initial count
    }

    // --- Notification Panel Logic ---
    attachNotificationListeners() {
        if (this.notifBell) {
            this.notifBell.addEventListener('click', this.toggleNotifications.bind(this));
        }
        if (this.closeNotifPanelBtn) {
            this.closeNotifPanelBtn.addEventListener('click', this.hideNotificationPanel.bind(this));
        }
        if (this.markAllReadBtn) {
            this.markAllReadBtn.addEventListener('click', this.markAllRead.bind(this));
        }
        if (this.deleteAllNotifBtn) {
            this.deleteAllNotifBtn.addEventListener('click', this.deleteAllNotifications.bind(this));
        }
        if (this.notificationList) {
            this.notificationList.addEventListener('click', this.handleNotificationItemClick.bind(this));
        }
        // Close panel when clicking outside
        document.addEventListener('click', (event) => {
            if (this.notificationPanel.classList.contains('active') &&
                !this.notificationPanel.contains(event.target) &&
                !this.notifBell.contains(event.target)) {
                this.hideNotificationPanel();
            }
        });
    }

    toggleNotifications() {
        this.notificationPanel.classList.toggle('active');
        if (this.notificationPanel.classList.contains('active')) {
            // When opening, mark currently visible unread items as read (visually)
            document.querySelectorAll('#notificationList .notification-item.unread').forEach(item => {
                item.classList.remove('unread');
            });
            this.updateNotificationCount();
        }
    }

    hideNotificationPanel() {
        this.notificationPanel.classList.remove('active');
    }

    updateNotificationCount() {
        const unreadCount = document.querySelectorAll('#notificationList .notification-item.unread').length;
        if (this.notifBadge) {
            this.notifBadge.textContent = unreadCount > 0 ? unreadCount : '';
            this.notifBadge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }

    markAsRead(item) {
        if (item && item.classList.contains('unread')) {
            item.classList.remove('unread');
            this.updateNotificationCount();
            // In a real app, send this change to the backend
            console.log(`Notification ID ${item.dataset.id} marked as read.`);
        }
    }

    deleteNotification(notificationItem) {
        if (notificationItem) {
            const id = notificationItem.dataset.id;
            if (confirm(`Delete this notification?`)) {
                notificationItem.remove();
                this.updateNotificationCount();
                // In a real app, send delete request to backend
                console.log(`Notification ID ${id} deleted.`);
            }
        }
    }

    handleNotificationItemClick(event) {
        let target = event.target;
        // Find the closest notification-item
        const notificationItem = target.closest('.notification-item');

        if (!notificationItem) return;

        // If trash icon or its parent is clicked
        if (target.closest('.delete-btn')) {
            event.stopPropagation(); // Prevent item's own click handler
            this.deleteNotification(notificationItem);
        } else {
            // Otherwise, it's a click on the notification text itself
            this.markAsRead(notificationItem);
            // Optional: navigate or show details
            console.log(`Notification ID ${notificationItem.dataset.id} clicked.`);
        }
    }

    markAllRead() {
        document.querySelectorAll('#notificationList .notification-item.unread').forEach(item => {
            item.classList.remove('unread');
        });
        this.updateNotificationCount();
        alert('All notifications marked as read!');
        // In a real app, send update request to backend
    }

    deleteAllNotifications() {
        if (confirm('Are you sure you want to delete all notifications?')) {
            this.notificationList.innerHTML = ''; // Clear all items
            this.updateNotificationCount();
            alert('All notifications deleted!');
            // In a real app, send delete all request to backend
        }
    }


    // --- Logout Modal Logic ---
    attachLogoutListeners() {
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', this.showLogoutModal.bind(this));
        }
        if (this.cancelLogout) {
            this.cancelLogout.addEventListener('click', this.hideLogoutModal.bind(this));
        }
        if (this.confirmLogout) {
            this.confirmLogout.addEventListener('click', this.confirmLogoutAction.bind(this));
        }
        if (this.okLogout) {
            this.okLogout.addEventListener('click', this.redirectToLogin.bind(this));
        }
        // Close modals when clicking outside
        window.addEventListener('click', this.closeModalsOnOutsideClick.bind(this));
        // Prevent clicks inside modal content from closing
        this.logoutModal.querySelector('.modal-content').addEventListener('click', (e) => e.stopPropagation());
        this.logoutSuccessModal.querySelector('.modal-content').addEventListener('click', (e) => e.stopPropagation());
    }

    showLogoutModal() {
        this.logoutModal.classList.add('active');
    }

    hideLogoutModal() {
        this.logoutModal.classList.remove('active');
    }

    confirmLogoutAction() {
        this.logoutModal.classList.remove('active');
        this.logoutSuccessModal.classList.add('active');
    }

    redirectToLogin() {
        this.logoutSuccessModal.classList.remove('active');
        window.location.href = "landingPage.html"; // Replace with your actual login page
    }

    closeModalsOnOutsideClick(event) {
        if (event.target === this.logoutModal) {
            this.hideLogoutModal();
        }
        if (event.target === this.logoutSuccessModal) {
            this.logoutSuccessModal.classList.remove('active');
        }
    }

    // --- Mobile Navigation Logic (Hamburger) ---
    attachMobileNavListeners() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', this.toggleMobileNavigation.bind(this));
        }
    }

    toggleMobileNavigation() {
        // Create the mobile nav overlay if it doesn't exist
        if (!this.mobileNavOverlay) {
            this.createMobileNavOverlay();
        }

        this.mobileNavOverlay.classList.toggle('active');

        // Toggle body scroll to prevent scrolling behind the overlay
        document.body.style.overflow = this.mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
    }

    createMobileNavOverlay() {
        this.mobileNavOverlay = document.createElement('div');
        this.mobileNavOverlay.classList.add('nav-items-mobile-overlay');

        const navLinksMobile = document.createElement('ul');
        navLinksMobile.classList.add('nav-links-mobile');

        const navItems = document.querySelectorAll('.navbar-right .nav-item');
        navItems.forEach(item => {
            const listItem = document.createElement('li');
            const link = item.cloneNode(true); // Clone the link
            link.classList.remove('nav-item'); // Remove desktop specific class if any
            navLinksMobile.appendChild(listItem).appendChild(link);
        });

        // Add close button to overlay
        const closeBtn = document.createElement('span');
        closeBtn.classList.add('close-mobile-nav');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', this.toggleMobileNavigation.bind(this));
        this.mobileNavOverlay.appendChild(closeBtn);

        this.mobileNavOverlay.appendChild(navLinksMobile);
        document.body.appendChild(this.mobileNavOverlay); // Append to body or a relevant container
    }
}


// Initialize classes when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new EventManager();
    new AdminDashboardUI();
});