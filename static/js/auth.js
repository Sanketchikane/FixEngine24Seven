/* -------------------------------------------------------
   Authentication System (FULL ENTERPRISE VERSION)
--------------------------------------------------------- */

async function ensureDBReady() {
    await waitForDB();
    await new Promise(resolve => setTimeout(resolve, 150));
}

/* REGISTER -------------------------- */
async function registerUser(event) {
    event.preventDefault();

    await ensureDBReady();

    const name = document.getElementById("reg_name").value.trim();
    const username = document.getElementById("reg_username").value.trim();
    const contact = document.getElementById("reg_contact").value.trim();
    const password = document.getElementById("reg_password").value.trim();
    const role = document.getElementById("reg_role").value;

    const hashed = await hashPassword(password);

    const allUsers = await getAll("users");
    const allSvc = await getAll("servicemen");

    if (allUsers.find(u => u.username === username) ||
        allSvc.find(s => s.username === username)) {
        alert("Username already exists");
        return;
    }

    const newUser = { name, username, password: hashed, contact, role };

    if (role === "serviceman")
        await addRecord("servicemen", newUser);
    else
        await addRecord("users", newUser);

    alert("Registration successful!");
    window.location.href = "login.html";
}

/* LOGIN -------------------------- */
async function login(event) {
    event.preventDefault();

    await ensureDBReady();

    const username = document.getElementById("login_username").value.trim();
    const password = document.getElementById("login_password").value.trim();
    const hashed = await hashPassword(password);

    const users = await getAll("users");
    const svc = await getAll("servicemen");

    let found =
        users.find(u => u.username === username && u.password === hashed) ||
        svc.find(s => s.username === username && s.password === hashed);

    if (!found) {
        alert("Invalid username or password");
        return;
    }

    saveSession(found);

    /* -----------------------------------------
       RETURN TO LAST PAGE (service_details)
    ------------------------------------------ */
    const backURL = sessionStorage.getItem("returnTo");
    if (backURL) {
        sessionStorage.removeItem("returnTo");
        window.location.href = backURL;
        return;
    }

    /* -----------------------------------------
       DEFAULT ROLE REDIRECT
    ------------------------------------------ */
    if (found.role === "admin")
        window.location.href = "dashboard_admin.html";
    else if (found.role === "serviceman")
        window.location.href = "dashboard_serviceman.html";
    else
        window.location.href = "dashboard_user.html";
}

/* FORGOT PASSWORD -------------------------- */
async function forgotPassword(event) {
    event.preventDefault();

    await ensureDBReady();

    const username = document.getElementById("fp_username").value.trim();

    const users = await getAll("users");
    const svc = await getAll("servicemen");

    let target =
        users.find(u => u.username === username) ||
        svc.find(s => s.username === username);

    if (!target) return alert("User not found");

    const newPass = prompt("Enter new password:");
    if (!newPass) return;

    target.password = await hashPassword(newPass);

    if (target.role === "serviceman")
        await updateRecord("servicemen", target);
    else
        await updateRecord("users", target);

    alert("Password changed!");
    window.location.href = "login.html";
}
