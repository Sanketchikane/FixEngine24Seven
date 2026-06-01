let svcUser = null;

async function loadServicemanDashboard() {
    requireLogin();
    svcUser = getSession();

    document.getElementById("svcName").innerText = svcUser.name;

    loadProfile();
}

function showSvcSection(id) {
    document.querySelectorAll(".dashboard-content > div").forEach(box => box.style.display = "none");
    document.querySelectorAll(".dashboard-tabs a").forEach(a => a.classList.remove("active"));

    document.getElementById("svc_" + id).style.display = "block";
    event.target.classList.add("active");
}

async function loadProfile() {
    const all = await getAll("providers");
    const found = all.find(p => p.username === svcUser.username);

    if (found) {
        document.getElementById("prof_name_title").innerText = found.name;
        document.getElementById("prof_service_title").innerText = found.service;
        document.getElementById("prof_img_preview").src = found.photo;

        document.getElementById("prof_name").value = found.name;
        document.getElementById("prof_phone").value = found.phone;
        document.getElementById("prof_service").value = found.service;
        document.getElementById("prof_price").value = found.price;
        document.getElementById("prof_desc").value = found.desc;
    }
}

function previewProfileImage() {
    const file = document.getElementById("prof_img").files[0];
    const reader = new FileReader();

    reader.onload = e => {
        document.getElementById("prof_img_preview").src = e.target.result;
    };

    if (file) reader.readAsDataURL(file);
}

async function saveServicemanProfile(event) {
    event.preventDefault();

    const img = document.getElementById("prof_img_preview").src;

    const data = {
        username: svcUser.username,
        name: document.getElementById("prof_name").value,
        phone: document.getElementById("prof_phone").value,
        service: document.getElementById("prof_service").value,
        price: document.getElementById("prof_price").value,
        desc: document.getElementById("prof_desc").value,
        photo: img
    };

    await updateRecord("providers", data);

    alert("Profile Saved Successfully!");
    loadProfile();
}
