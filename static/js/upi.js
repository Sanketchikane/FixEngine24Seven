function loadUPI() {
    const amount = sessionStorage.getItem("upiAmount");
    document.getElementById("upi_amount").innerText = amount;
}

function copyUPIID() {
    navigator.clipboard.writeText("fixengine247@upi");
    document.getElementById("upi_msg").innerText = "UPI ID Copied!";
}

function confirmUPIPayment() {
    alert("UPI Payment Confirmed!");
    window.location.href = "payment.html";
}
