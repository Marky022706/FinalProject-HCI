function toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('show');
}

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

function markAllRead() {
    document.querySelectorAll('.notification-item').forEach(n => n.classList.remove('unread'));
    updateBadge();
}

function deleteNotification(id) {
    const notif = document.querySelector(`[data-id="${id}"]`);
    if (notif) {
        notif.remove();
        updateBadge();
        if (document.querySelectorAll('.notification-item').length === 0) {
            document.getElementById('notificationList').innerHTML =
                '<div style="padding: 40px; text-align: center; color: #9ca3af;">No notifications</div>';
        }
    }
}

function deleteAll() {
    const list = document.getElementById('notificationList');
    list.innerHTML = '<div style="padding: 40px; text-align: center; color: #9ca3af;">No notifications</div>';
    updateBadge();
}

// Close panel when clicking outside
document.addEventListener('click', function(event) {
    const panel = document.getElementById('notificationPanel');
    const notifIcon = document.querySelector('.notification-icon');
    if (!panel.contains(event.target) && !notifIcon.contains(event.target)) {
        panel.classList.remove('show');
    }
});

updateBadge();
