function loadRazor() {
    const amount = sessionStorage.getItem("payBookingAmount");
    document.getElementById("rzp_amount").innerText = amount;
}

function payUPI() {
    window.location.href = "upi_payment.html";
}

function payCard() {
    alert("Card payment gateway coming soon.");
}

function payWallet() {
    alert("Wallet payment option coming soon.");
}
