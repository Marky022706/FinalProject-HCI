// Toggle notification panel
function toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('show');
}

// Update badge count
function updateBadge() {
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.getElementById('notifBadge');
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Mark all as read
function markAllRead() {
    const items = document.querySelectorAll('.notification-item');
    items.forEach(item => item.classList.remove('unread'));
    updateBadge();
}

// Delete single notification
function deleteNotification(id) {
    const item = document.querySelector(`[data-id="${id}"]`);
    if (item) {
        item.remove();
        updateBadge();
        checkEmpty();
    }
}

// Delete all notifications
function deleteAll() {
    const list = document.getElementById('notificationList');
    list.innerHTML = `<div style="padding: 30px; text-align: center; color: #9ca3af;">No notifications</div>`;
    updateBadge();
}

// Check if empty
function checkEmpty() {
    const list = document.getElementById('notificationList');
    if (!list.querySelector('.notification-item')) {
        list.innerHTML = `<div style="padding: 30px; text-align: center; color: #9ca3af;">No notifications</div>`;
    }
}

// Auto-close when clicking outside
document.addEventListener('click', (event) => {
    const panel = document.getElementById('notificationPanel');
    const icon = document.querySelector('.notification-icon');
    if (!panel.contains(event.target) && !icon.contains(event.target)) {
        panel.classList.remove('show');
    }
});

// Initialize badge
document.addEventListener('DOMContentLoaded', updateBadge);
