// 🧱 Dashboard System Class
class DashboardSystem {
    constructor(logoutBtnId, logoutModalId, logoutSuccessId, cancelId, confirmId, okId, hamburgerId, navId) {
        this.logoutBtn = document.getElementById(logoutBtnId);
        this.logoutModal = document.getElementById(logoutModalId);
        this.logoutSuccessModal = document.getElementById(logoutSuccessId);
        this.cancelLogout = document.getElementById(cancelId);
        this.confirmLogout = document.getElementById(confirmId);
        this.okLogout = document.getElementById(okId);
        this.hamburger = document.getElementById(hamburgerId);
        this.mainNav = document.getElementById(navId);
        this.initEvents();
    }

    initEvents() {
        this.logoutBtn.addEventListener('click', () => this.showLogoutModal());
        this.cancelLogout.addEventListener('click', () => this.hideLogoutModal());
        this.confirmLogout.addEventListener('click', () => this.confirmLogoutAction());
        this.okLogout.addEventListener('click', () => this.redirectToLogin());
        window.addEventListener('click', (event) => this.closeOnOutsideClick(event));
        this.hamburger.addEventListener('click', () => this.toggleNavigation());
    }

    showLogoutModal() { this.logoutModal.style.display = 'flex'; }
    hideLogoutModal() { this.logoutModal.style.display = 'none'; }
    confirmLogoutAction() {
        this.logoutModal.style.display = 'none';
        this.logoutSuccessModal.style.display = 'flex';
    }
    redirectToLogin() {
        this.logoutSuccessModal.style.display = 'none';
        window.location.href = "landingPage.html";
    }
    closeOnOutsideClick(event) {
        if (event.target === this.logoutModal) this.logoutModal.style.display = 'none';
        if (event.target === this.logoutSuccessModal) this.logoutSuccessModal.style.display = 'none';
    }
    toggleNavigation() { this.mainNav.classList.toggle('active'); }
}

// 🚀 Create an instance
const dashboard = new DashboardSystem(
    'logoutBtn', 'logoutModal', 'logoutSuccessModal',
    'cancelLogout', 'confirmLogout', 'okLogout',
    'hamburger', 'mainNav'
);

// 📅 Event Calendar Script
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const events = {
    '0-1': { name: 'New Year Celebration', details: 'Welcome the new year with fireworks and festivities!' },
    '1-14': { name: 'Valentine\'s Day', details: 'Celebrate love and friendship with special activities.' },
    '2-17': { name: 'St. Patrick\'s Day', details: 'Irish cultural celebration with parades and green everything!' },
    '3-1': { name: 'April Fools Day', details: 'Day of pranks and jokes. Be prepared for surprises!' },
    '3-22': { name: 'Earth Day', details: 'Environmental awareness and conservation activities.' },
    '4-5': { name: 'Cinco de Mayo', details: 'Mexican heritage celebration with food and music.' },
    '4-12': { name: 'Mother\'s Day', details: 'Honor and celebrate mothers and mother figures.' },
    '5-16': { name: 'Father\'s Day', details: 'Celebrate fathers and father figures with family time.' },
    '5-21': { name: 'Summer Solstice', details: 'Longest day of the year - summer officially begins!' },
    '6-4': { name: 'Independence Day', details: 'Fireworks, BBQ, and celebration of national freedom!' },
    '6-15': { name: 'Summer Concert', details: 'Outdoor music festival featuring local and international artists.' },
    '7-2': { name: 'Summer Beach Party', details: 'Annual beach gathering with games, food, and fun in the sun!' },
    '7-20': { name: 'International Friendship Day', details: 'Celebrate friendships old and new!' },
    '8-15': { name: 'Fall Festival', details: 'Harvest celebration with food, crafts, and entertainment.' },
    '9-31': { name: 'Halloween Party', details: 'Costume party with spooky decorations and treats!' },
    '10-28': { name: 'Thanksgiving Dinner', details: 'Traditional feast with family and friends.' },
    '11-25': { name: 'Christmas Celebration', details: 'Holiday party with gifts, decorations, and festive cheer!' },
    '11-31': { name: 'New Year\'s Eve Party', details: 'Countdown to midnight with music, dancing, and champagne!' }
};


const monthSelect = document.getElementById('monthSelect');
const daySelect = document.getElementById('daySelect');
const eventsGrid = document.getElementById('eventsGrid');
const searchBtn = document.getElementById('searchBtn');

function getMonthEvents(month) {
    const monthEvents = [];
    for (const [key, event] of Object.entries(events)) {
        const [m, d] = key.split('-').map(Number);
        if (m === month) monthEvents.push({ month: m, day: d, ...event });
    }
    monthEvents.sort((a,b)=>a.day-b.day);
    return monthEvents.slice(0,6); // now shows 6 event cards
}

function createEventCard(event) {
    const hasEvent = event && event.name;
    return `
        <div class="event-card">
            <div class="date-display">
                <div class="month">${monthNames[event.month]}</div>
                <div class="day">${event.day.toString().padStart(2,'0')}</div>
            </div>
            <div class="input-group">
                <input type="text" value="${hasEvent ? event.name : 'No event scheduled'}" 
                    class="${hasEvent ? '' : 'no-event'}" readonly>
            </div>
            <div class="input-group">
                <textarea readonly class="${hasEvent ? '' : 'no-event'}">
${hasEvent ? event.details : 'No details available for this date'}
                </textarea>
            </div>
        </div>
    `;
}

function displayEventCards() {
    const month = parseInt(monthSelect.value);
    const monthEvents = getMonthEvents(month);
    eventsGrid.innerHTML = '';
    if (monthEvents.length === 0) {
        for (let i=1;i<=6;i++){
            eventsGrid.innerHTML += createEventCard({month, day:i, name:'', details:''});
        }
    } else {
        monthEvents.forEach(event=>eventsGrid.innerHTML += createEventCard(event));
        const remaining = 6 - monthEvents.length;
        for (let i=0;i<remaining;i++){
            const lastDay = monthEvents[monthEvents.length-1].day;
            eventsGrid.innerHTML += createEventCard({month, day:lastDay+i+1, name:'', details:''});
        }
    }
}

function populateDays(month, year=2025){
    const daysInMonth = new Date(year, month+1, 0).getDate();
    daySelect.innerHTML = '';
    for(let i=1;i<=daysInMonth;i++){
        const opt=document.createElement('option');
        opt.value=i;
        opt.textContent=i.toString().padStart(2,'0');
        daySelect.appendChild(opt);
    }
}

function highlightCards(){
    const cards=document.querySelectorAll('.event-card');
    cards.forEach((c,i)=>{
        setTimeout(()=>{c.classList.add('highlight');
            setTimeout(()=>c.classList.remove('highlight'),600);
        },i*100);
    });
}

monthSelect.addEventListener('change',()=>{
    const month=parseInt(monthSelect.value);
    populateDays(month);
    displayEventCards();
});
searchBtn.addEventListener('click', highlightCards);

// Initialize
populateDays(7);
displayEventCards();
