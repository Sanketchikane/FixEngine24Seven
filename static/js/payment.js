let bookingData = null;

async function loadPaymentForm() {
    const bookingId = parseInt(sessionStorage.getItem("payBookingId"));
    const bookings = await getAll("bookings");

    bookingData = bookings.find(b => b.id === bookingId);

    document.getElementById("pm_bookingId").innerText = bookingData.id;
    document.getElementById("pm_service").innerText = bookingData.service;
    document.getElementById("pm_provider").innerText = bookingData.provider;
}

async function submitPayment() {
    const amount = document.getElementById("pm_amount").value;
    const mode = document.getElementById("pm_mode").value;

    const pay = {
        booking: bookingData.id,
        user: bookingData.user,
        amount: amount,
        mode: mode,
        date: new Date().toLocaleString()
    };

    await addRecord("payments", pay);

    alert("Payment Completed Successfully!");

    window.location.href = "dashboard_user.html";
}

function downloadInvoice() {
    const html = `
        <h2>FixEngine247 – Service Invoice</h2>
        <p><b>Booking ID:</b> ${bookingData.id}</p>
        <p><b>Service:</b> ${bookingData.service}</p>
        <p><b>Provider:</b> ${bookingData.provider}</p>
        <p><b>User:</b> ${bookingData.name}</p>
        <p><b>Phone:</b> ${bookingData.phone}</p>
        <p><b>Date:</b> ${bookingData.date} ${bookingData.time}</p>
        <br>
        <p><b>Total Amount:</b> ₹${document.getElementById("pm_amount").value}</p>
        <p><b>Payment Mode:</b> ${document.getElementById("pm_mode").value}</p>
        <br><br>
        <p>Thank you for choosing FixEngine247.</p>
    `;

    const popup = window.open("", "_blank");
    popup.document.write(html);
    popup.print();
}
