/* LOGIN CHECK */
if (!getSession()) {
    sessionStorage.setItem("returnTo", window.location.href);
    window.location.href = "login.html";
}

/* VIDEO FILES */
const SERVICE_VIDEOS = {
    "Photography": "static/images/Photography/Photography Vid.mp4",
    "AC Repair": "static/images/AC/AC Vid.mp4",
    "Electrician": "static/images/Electrician/Electrician Vid.mp4",
    "Mechanic": "static/images/Mechanic/Mechanic Vid.mp4"
};

/* PROVIDERS DATA */
const PROVIDERS = {

    "Photography": [
        { name: "Shreyash_Shinde.in", price: "₹1,75,000 / day", desc: "Wedding photography, cinematic video.", img: "static/images/Photography/Photography Main.jpg" },
        { name: "Sanket Clicks", price: "₹60,000 / day", desc: "Pre-wedding and cinematic highlights.", img: "static/images/Photography/Photography 1.jpg" },
        { name: "Minar Dev Edits", price: "₹85,000 / day", desc: "Portrait, events & candid photography.", img: "static/images/Photography/Photography 2.jpg" }
    ],

    "AC Repair": [
        { name: "Gulab AC Expert Services", price: "₹700 / visit", desc: "Cooling issues, repairs, maintenance.", img: "static/images/AC/AC Main.jpg" },
        { name: "Sid AC Service 1", price: "₹600 / visit", desc: "General servicing & cleaning.", img: "static/images/AC/AC 1.jpg" },
        { name: "Saurabh AC Service 2", price: "₹800 / visit", desc: "Gas refill, deep cleaning & advanced repair.", img: "static/images/AC/AC 2.jpg" }
    ],

    "Electrician": [
        { name: "PowerFix Electrician", price: "₹500 / job", desc: "Wiring, installation, switchboard repair.", img: "static/images/Electrician/Electrician Main.jpg" },
        { name: "Mahalaxmi Services", price: "₹450 / job", desc: "Fan installation and switch repair.", img: "static/images/Electrician/Electrician 1.jpg" },
        { name: "Pratapgarh Electrician Service", price: "₹550 / job", desc: "Full wiring inspection and maintenance.", img: "static/images/Electrician/Electrician Main.jpg" }
    ],

    "Mechanic": [
        { name: "RapidAuto Mechanic", price: "₹600 / job", desc: "Two-wheeler repair & servicing.", img: "static/images/Mechanic/Machanic main.jpg" },
        { name: "Aniket Mechanic Service 1", price: "₹650 / job", desc: "Bike engine service & tuning.", img: "static/images/Mechanic/Machanic 1.jpg" },
        { name: "Shreedev Mechanic Service", price: "₹750 / job", desc: "Car repair, brake inspection, oil change.", img: "static/images/Mechanic/Machanic 2.jpg" }
    ]
};

/* PAGE LOAD */
window.onload = () => {
    const url = new URL(window.location.href);
    const service = url.searchParams.get("service");

    document.getElementById("srvTitle").innerText = service;

    document.getElementById("serviceVideo").src = SERVICE_VIDEOS[service];

    loadProviders(service);
};

/* LOAD PROVIDERS */
function loadProviders(service) {
    const box = document.getElementById("providerList");
    box.innerHTML = "";

    PROVIDERS[service].forEach(p => {
        box.innerHTML += `
            <div class="provider-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p class="price">${p.price}</p>
                <p class="desc">${p.desc}</p>
                <button onclick="bookProvider('${service}', '${p.name}')">Book Now</button>
            </div>
        `;
    });
}

/* BOOK PROVIDER */
function bookProvider(service, provider) {
    sessionStorage.setItem("selectedService", service);
    sessionStorage.setItem("selectedProvider", provider);
    window.location.href = "booking.html";
}
