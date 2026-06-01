/* -------------------------------------------------------
   FixEngine247 – NOTIFICATION ENGINE (ENTERPRISE VERSION)
--------------------------------------------------------- */

async function sendNotification(to, message) {
    await waitForDB();

    return addRecord("notifications", {
        to,
        message,
        created: new Date().toISOString()
    });
}

/* -------------------------------------------------------
   Fetch notifications for a user
--------------------------------------------------------- */
async function loadNotifications(username) {
    await waitForDB();

    const list = await getAll("notifications");
    return list.filter(n => n.to === username);
}
