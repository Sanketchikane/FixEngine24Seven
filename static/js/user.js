/* -------------------------------------------------------
   USER DASHBOARD SYSTEM (ENTERPRISE)
--------------------------------------------------------- */

function showUserSection(sec) {
    ["home", "bookings", "notifications", "profile"].forEach(id => {
        document.getElementById(`user_${id}`).style.display =
            (id === sec) ? "block" : "none";
    });

    if (sec === "bookings") loadUserBookings();
    if (sec === "notifications") loadUserNotifications();
    if (sec === "profile") loadUserProfile();
}

async function loadUserDashboard() {
    requireLogin();
    const user = getSession();
    document.getElementById("userName").innerText = user.name;
}

async function loadUserBookings() {
    const all = await getAll("bookings");
    const user = getSession();
    const myList = all.filter(b => b.user === user.username);

    let html = "";
    myList.forEach(b => {
        html += `
            <div class="list-item">
                <p><b>${b.service}</b> (${b.provider})</p>
                <p>${b.date} ${b.time}</p>
                <p>Status: <b>${b.status}</b></p>
            </div>
        `;
    });

    document.getElementById("bookingList").innerHTML = html;
}

async function loadUserNotifications() {
    const u = getSession();
    const all = await getAll("notifications");

    const list = all.filter(n => n.to === u.username);

    let html = "";
    list.forEach(n => {
        html += `<div class="notification-card">${n.message}</div>`;
    });

    document.getElementById("notifList").innerHTML = html;
}

function loadUserProfile() {
    const u = getSession();
    document.getElementById("profileInfo").innerHTML = `
        Name: ${u.name}<br>
        Username: ${u.username}<br>
        Contact: ${u.contact}
    `;
}

function goToServices() {
    window.location.href = "service_list.html";
}
