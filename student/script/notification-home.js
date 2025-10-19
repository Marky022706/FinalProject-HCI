const notifPanel = document.getElementById('notificationPanel');
const notifBell = document.getElementById('notifBell');

notifBell.addEventListener('click', () => {
    notifPanel.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    if (!notifPanel.contains(event.target) && !notifBell.contains(event.target)) {
        notifPanel.classList.remove('show');
    }
});

function updateBadge() {
    const unread = document.querySelectorAll('.notification-item.unread').length;
    const badge = document.getElementById('notifBadge');
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
}

function markAllRead() {
    document.querySelectorAll('.notification-item').forEach(n => n.classList.remove('unread'));
    updateBadge();
}

function deleteNotification(id) {
    const item = document.querySelector(`[data-id="${id}"]`);
    if (item) {
        item.remove();
        updateBadge();
    }
}

function deleteAll() {
    document.getElementById('notificationList').innerHTML = '<div style="padding:40px;text-align:center;color:#9ca3af;">No notifications</div>';
    updateBadge();
}

updateBadge();
