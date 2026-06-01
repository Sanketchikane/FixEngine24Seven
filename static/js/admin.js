/* -------------------------------------------------------
   ADMIN DASHBOARD ENGINE (FINAL ENTERPRISE VERSION)
--------------------------------------------------------- */

async function loadAdminDashboard() {
    requireLogin();

    const user = getSession();
    if (user.role !== "admin") {
        alert("Unauthorized Access");
        window.location.href = "login.html";
        return;
    }

    await waitForDB();

    const users = await getAll("users");
    const servicemen = await getAll("servicemen");
    const bookings = await getAll("bookings");

    document.getElementById("totalUsers").innerText = users.length;
    document.getElementById("totalServicemen").innerText = servicemen.length;
    document.getElementById("totalBookings").innerText = bookings.length;
}

function showAdminSection(sec) {
    const ids = [
        "home", "users", "servicemen",
        "bookings", "payments", "notifications", "settings"
    ];

    ids.forEach(id => {
        document.getElementById("admin_" + id).style.display =
            (id === sec) ? "block" : "none";
    });

    if (sec === "users") loadAdminUsers();
    if (sec === "servicemen") loadAdminServicemen();
    if (sec === "bookings") loadAdminBookings();
    if (sec === "payments") loadAdminPayments();
    if (sec === "notifications") loadAdminNotifications();
}

/* USERS */
async function loadAdminUsers() {
    const users = await getAll("users");
    let html = "";

    users.forEach(u => {
        html += `
            <div class="list-item">
                <p><b>${u.name}</b> (${u.username})</p>
                <p>Role: ${u.role}</p>
                <p>Contact: ${u.contact}</p>
            </div>`;
    });

    document.getElementById("adminUserList").innerHTML = html;
}

/* SERVICEMEN */
async function loadAdminServicemen() {
    const svc = await getAll("servicemen");
    let html = "";

    svc.forEach(s => {
        html += `
            <div class="list-item">
                <p><b>${s.username}</b></p>
                <p>Status: ${s.available ? "Available" : "Busy"}</p>
                <p>Contact: ${s.contact}</p>
            </div>`;
    });

    document.getElementById("adminServicemanList").innerHTML = html;
}

/* BOOKINGS */
async function loadAdminBookings() {
    const list = await getAll("bookings");

    let html = "";
    list.forEach(b => {
        html += `
            <div class="list-item">
                <p><b>${b.service}</b> (${b.provider})</p>
                <p>User: ${b.name} (${b.user})</p>
                <p>Date: ${b.date} ${b.time}</p>
                <p>Status: ${b.status}</p>
                <p>Description: ${b.desc}</p>
                <p>Assigned To: ${b.assigned || "Not Assigned"}</p>
            </div>`;
    });

    document.getElementById("adminBookingList").innerHTML = html;
}

/* PAYMENTS */
async function loadAdminPayments() {
    const list = await getAll("payments");

    let html = "";
    list.forEach(p => {
        html += `
            <div class="list-item">
                <p><b>₹${p.amount}</b></p>
                <p>Booking ID: ${p.booking}</p>
                <p>Mode: ${p.mode}</p>
                <p>User: ${p.user}</p>
                <p>Date: ${p.date}</p>
            </div>`;
    });

    document.getElementById("paymentList").innerHTML = html;
}

/* NOTIFICATIONS */
async function loadAdminNotifications() {
    const list = await getAll("notifications");

    let html = "";
    list.forEach(n => {
        html += `
            <div class="notification-card admin">
                <p><b>To:</b> ${n.to}</p>
                <p>${n.message}</p>
                <p>${n.created}</p>
            </div>`;
    });

    document.getElementById("notifList").innerHTML = html;
}
