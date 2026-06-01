let currentUser = null;

async function loadServicemanDashboard() {
    requireLogin();
    currentUser = getSession();
    document.getElementById("svcName").innerText = currentUser.name;
    loadAvailability();
    loadJobs();
    loadNotifications();
    loadProfile();
}

function showSvcSection(id) {
    ["home","jobs","availability","notifications","profile"].forEach(x => {
        document.getElementById("svc_" + x).style.display = "none";
    });
    document.getElementById("svc_" + id).style.display = "block";
    document.querySelectorAll(".dashboard-tabs a").forEach(a => a.classList.remove("active"));
}

async function loadAvailability() {
    const all = await getAll("servicemen");
    const me = all.find(x => x.username === currentUser.username);
    let st = me && me.available ? "Available" : "Not Available";
    document.getElementById("availabilityStatus").innerText = st;
}

async function toggleAvailability() {
    const all = await getAll("servicemen");
    let me = all.find(x => x.username === currentUser.username);

    if (!me) {
        me = { username: currentUser.username, available: true };
    } else {
        me.available = !me.available;
    }

    await updateRecord("servicemen", me);
    loadAvailability();
}

async function loadJobs() {
    const all = await getAll("bookings");
    const myJobs = all.filter(x => x.provider === currentUser.username);
    const box = document.getElementById("jobList");
    box.innerHTML = "";

    myJobs.forEach(j => {
        box.innerHTML += `
            <div class="list-item">
                <b>${j.service}</b><br>
                ${j.name} - ${j.phone}<br>
                ${j.address}<br>
                ${j.date} ${j.time}<br>
                Status: ${j.status}
            </div>
        `;
    });
}

async function loadNotifications() {
    const all = await getAll("notifications");
    const mine = all.filter(x => x.to === currentUser.username);
    const box = document.getElementById("notifList");
    box.innerHTML = "";

    mine.forEach(n => {
        box.innerHTML += `
            <div class="notification-card">
                ${n.msg}
            </div>
        `;
    });
}

async function loadProfile() {
    const all = await getAll("servicemen");
    const me = all.find(x => x.username === currentUser.username);
    const box = document.getElementById("profileInfo");

    if (!me) {
        box.innerHTML = "No profile found";
        return;
    }

    box.innerHTML = `
        <p><b>Name:</b> ${currentUser.name}</p>
        <p><b>Username:</b> ${currentUser.username}</p>
        <p><b>Phone:</b> ${me.phone || "Not Added"}</p>
        <p><b>Services:</b> ${me.services || "Not Added"}</p>
    `;
}

async function saveServicemanProvider(service, name, price, desc, imgPath) {
    await addRecord("providers", {
        service: service,
        provider: currentUser.username,
        name: name,
        price: price,
        desc: desc,
        img: imgPath
    });
}
