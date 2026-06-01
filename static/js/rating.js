let bookingId = null;

async function loadRatingForm() {
    bookingId = parseInt(sessionStorage.getItem("ratingBookingId"));
}

async function submitRating() {
    const rating = parseInt(document.getElementById("rt_rating").value);
    const review = document.getElementById("rt_review").value;

    const bookings = await getAll("bookings");
    const b = bookings.find(x => x.id === bookingId);

    b.rating = rating;
    b.review = review;

    await updateRecord("bookings", b);

    alert("Thank you for your feedback!");
    window.location.href = "dashboard_user.html";
}
