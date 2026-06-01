/* -------------------------------------------------------
   OFFLINE AI CHATBOT (RULE-BASED)
--------------------------------------------------------- */

const botReplies = [
    { keywords: ["hello", "hi"], reply: "Hello! How can I help you today? 😊" },
    { keywords: ["book", "service"], reply: "Sure! You can create a new booking from your dashboard." },
    { keywords: ["price", "cost"], reply: "Pricing depends on the service you select." },
    { keywords: ["status", "job"], reply: "You can check your booking status inside your dashboard." },
    { keywords: ["bye"], reply: "Goodbye! Have a great day! 👋" }
];

/* SEND MESSAGE */
function sendMessage() {
    const input = document.getElementById("userMessage");
    const text = input.value.trim();
    if (!text) return;

    addChat("user", text);
    input.value = "";

    setTimeout(() => {
        const reply = getBotReply(text.toLowerCase());
        addChat("bot", reply);
    }, 400);
}

/* ADD CHAT MESSAGE TO UI */
function addChat(sender, msg) {
    const box = document.getElementById("chatMessages");

    const div = document.createElement("div");
    div.className = `message ${sender === "user" ? "user-msg" : "bot-msg"}`;
    div.textContent = msg;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

/* BOT LOGIC */
function getBotReply(text) {
    for (let pattern of botReplies) {
        if (pattern.keywords.some(k => text.includes(k))) {
            return pattern.reply;
        }
    }
    return "I'm not fully trained on that yet, but I'm learning! 😊";
}
