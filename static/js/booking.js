let selectedService = "";
let selectedProvider = "";

function loadBookingForm() {
    requireLogin();
    selectedService = sessionStorage.getItem("selectedService");
    selectedProvider = sessionStorage.getItem("selectedProvider");

    document.getElementById("serviceTitle").innerText = "Book " + selectedService;
    document.getElementById("providerTitle").innerText = selectedProvider;
}

async function submitBooking(event) {
    event.preventDefault();

    const user = getSession();

    const data = {
        service: selectedService,
        provider: selectedProvider,
        user: user.username,
        name: document.getElementById("bk_name").value,
        phone: document.getElementById("bk_phone").value,
        address: document.getElementById("bk_address").value,
        pincode: document.getElementById("bk_pincode").value,
        date: document.getElementById("bk_date").value,
        time: document.getElementById("bk_time").value,
        desc: document.getElementById("bk_desc").value,
        status: "Pending",
        created: Date.now()
    };

    await addRecord("bookings", data);

    await addRecord("notifications", {
        to: selectedProvider,
        from: user.username,
        service: selectedService,
        msg: "New booking received for " + selectedService,
        time: Date.now()
    });

    alert("Booking Successful!");
    window.location.href = "dashboard_user.html";
}
