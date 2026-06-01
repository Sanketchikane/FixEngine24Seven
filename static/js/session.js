/* -------------------------------------------------------
   SESSION MANAGEMENT (FINAL VERSION)
--------------------------------------------------------- */

function saveSession(user) {
    sessionStorage.setItem("fx_user", JSON.stringify(user));
}

function getSession() {
    const data = sessionStorage.getItem("fx_user");
    return data ? JSON.parse(data) : null;
}

function requireLogin() {
    const u = getSession();
    if (!u) {
        // Guest user? → redirect home
        window.location.href = "index.html";
    }
}

function logout() {
    sessionStorage.removeItem("fx_user");
    window.location.href = "index.html";  // 🔥 your requirement
}
