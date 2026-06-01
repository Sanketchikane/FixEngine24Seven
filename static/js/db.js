/* -------------------------------------------------------
   FixEngine247 – ENTERPRISE INDEXEDDB ENGINE (FINAL v3)
--------------------------------------------------------- */

let db = null;
const DB_NAME = "FixEngine247_DB";
const DB_VERSION = 3;   // ⭐ IMPORTANT → new version ensures fresh DB upgrade

/* -------------------------------------------------------
   OPEN DATABASE
--------------------------------------------------------- */
function openDB() {
    return new Promise((resolve, reject) => {

        if (db) return resolve(db);

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (e) => {
            console.error("Failed to open IndexedDB:", e);
            reject(e);
        };

        request.onupgradeneeded = event => {
            db = event.target.result;

            console.log("⏫ Database Upgrading / Creating...");

            // USERS
            if (!db.objectStoreNames.contains("users")) {
                db.createObjectStore("users", { keyPath: "username" });
            }

            // SERVICEMEN
            if (!db.objectStoreNames.contains("servicemen")) {
                db.createObjectStore("servicemen", { keyPath: "username" });
            }

            // BOOKINGS
            if (!db.objectStoreNames.contains("bookings")) {
                db.createObjectStore("bookings", { keyPath: "id", autoIncrement: true });
            }

            // PAYMENTS
            if (!db.objectStoreNames.contains("payments")) {
                db.createObjectStore("payments", { keyPath: "id", autoIncrement: true });
            }

            // NOTIFICATIONS
            if (!db.objectStoreNames.contains("notifications")) {
                db.createObjectStore("notifications", { keyPath: "id", autoIncrement: true });
            }

            // ⭐ NEW: PROVIDERS TABLE (for Photography, AC, etc.)
            if (!db.objectStoreNames.contains("providers")) {
                db.createObjectStore("providers", { keyPath: "id", autoIncrement: true });
            }

            // ⭐ NEW FUTURE USE: SERVICES TABLE
            if (!db.objectStoreNames.contains("services")) {
                db.createObjectStore("services", { keyPath: "name" });
            }
        };

        request.onsuccess = () => {
            db = request.result;

            // ensure admin created
            createDefaultAdmin();

            resolve(db);
        };
    });
}

/* -------------------------------------------------------
   CREATE DEFAULT ADMIN (ONLY ONCE)
--------------------------------------------------------- */
async function createDefaultAdmin() {
    await waitForDB();

    const tx = db.transaction("users", "readonly");
    const store = tx.objectStore("users");

    store.get("admin").onsuccess = async evt => {
        if (!evt.target.result) {
            const hashed = await hashPassword("admin123");

            const tx2 = db.transaction("users", "readwrite");
            tx2.objectStore("users").add({
                name: "System Administrator",
                username: "admin",
                password: hashed,
                contact: "9999999999",
                role: "admin"
            });

            console.log("✔ Default admin created → admin / admin123");
        }
    };
}

/* -------------------------------------------------------
   WAIT UNTIL DB IS READY
--------------------------------------------------------- */
function waitForDB() {
    return new Promise(resolve => {
        if (db) return resolve();

        openDB();

        const check = setInterval(() => {
            if (db) {
                clearInterval(check);
                resolve();
            }
        }, 40);
    });
}

/* -------------------------------------------------------
   ADD RECORD
--------------------------------------------------------- */
async function addRecord(store, data) {
    await waitForDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(store, "readwrite");
        tx.objectStore(store).add(data);
        tx.oncomplete = resolve;
        tx.onerror = reject;
    });
}

/* -------------------------------------------------------
   UPDATE RECORD
--------------------------------------------------------- */
async function updateRecord(store, data) {
    await waitForDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(store, "readwrite");
        tx.objectStore(store).put(data);
        tx.oncomplete = resolve;
        tx.onerror = reject;
    });
}

/* -------------------------------------------------------
   GET ALL RECORDS
--------------------------------------------------------- */
async function getAll(store) {
    await waitForDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(store, "readonly");
        const req = tx.objectStore(store).getAll();

        req.onsuccess = () => resolve(req.result);
        req.onerror = reject;
    });
}

/* -------------------------------------------------------
   HASH PASSWORD (SHA-256)
--------------------------------------------------------- */
async function hashPassword(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const digest = await crypto.subtle.digest("SHA-256", data);

    return [...new Uint8Array(digest)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

/* -------------------------------------------------------
   AUTO-INIT DATABASE
--------------------------------------------------------- */
openDB().catch(err => console.error("DB Initialization Failed:", err));
