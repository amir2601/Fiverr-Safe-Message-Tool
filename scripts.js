const riskyWords = [
    // Contact methods
    "mail", "email", "e-mail", "gmail", "hotmail", "outlook", "yahoo", "phone", "mobile", "number", "contact", "call",
    "whatsapp", "telegram", "skype", "zoom", "meet", "hangouts", "viber", "imo", "signal",

    // Payment & financial
    "pay", "payment", "payments", "paypal", "venmo", "cashapp", "bank", "western union", "moneygram", "btc", "bitcoin", "crypto", "wallet",
    "wire transfer", "invoice", "direct payment", "outside fiverr", "outside fiver", "off fiverr", "off fiver", "send money", "money",

    // External links/platforms
    "personal website", "domain", "upwork", "freelancer", "freelancer.com", "peopleperhour", "toptal", "fiverr alternative", "Trustpilot reviews", "Google reviews",

    // Social platforms
    "facebook", "messenger", "instagram", "linkedin", "twitter", "x.com", "snapchat", "tiktok", "youtube", "pinterest", "reddit", "discord", "watch hour",
    "auto like", "auto likes", "auto follower", "auto followers",

    // Policy evasion phrases
    "give me your number", "contact me outside", "message me on", "hire me on", "work outside fiverr", "pay directly",

    // Gambling/Casino
    "gambling", "casino", "betting", "sports betting", "poker", "slot games", "slots", "blackjack", "crypto casino", "roulette", "sportsbook", "virtual casino", "betting tips",

    // Inappropriate/explicit
    "fuck", "shit", "bitch", "bastard", "asshole", "dick", "pussy", "slut", "whore", "cunt", "nude", "nudes", "porn", "sex", "hentai", "adult content",

    // Threats/violence
    "kill", "die", "suicide", "bomb", "terrorist", "attack", "shoot", "gun", "weapon"
];

// Insert hyphen in middle of risky word (cleaned)
const customHyphenPositions = {
    "payment": [2, 4],
};

function insertHyphen(word) {
    const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (clean.length < 2) return word;

    let pos;

    if (customHyphenPositions[clean]) {
        const positions = customHyphenPositions[clean];
        pos = positions[Math.floor(Math.random() * positions.length)];
    } else {
        pos = Math.floor(clean.length / 2);
    }

    const hyphenated = clean.slice(0, pos) + "-" + clean.slice(pos);
    return word.replace(new RegExp(clean, "i"), hyphenated);
}

// Main processing
function processMessage() {
    let text = document.getElementById("inputText").value;
    if (!text.trim()) return alert("⚠️ Input is empty!");

    const foundWords = new Set();
    const highlight = document.getElementById("highlightToggle").checked;

    riskyWords.forEach(risky => {
        const pattern = new RegExp(`\\b${risky}\\b`, "gi");

        text = text.replace(pattern, match => {
            foundWords.add(match.toLowerCase());
            const cleaned = insertHyphen(match);
            return highlight
                ? `<span class="highlight">${cleaned}</span>`
                : cleaned;
        });
    });

    const outputDiv = document.getElementById("outputText");
    outputDiv.innerHTML = text;
    updateCounts();

    const restrictedDiv = document.getElementById("restrictedWords");
    if (foundWords.size) {
        restrictedDiv.style.display = "block";
        restrictedDiv.innerText = "🚫 Found restricted words: " + Array.from(foundWords).join(", ");
    } else {
        restrictedDiv.style.display = "none";
        restrictedDiv.innerText = "";
    }

    document.getElementById("highlightToggle").addEventListener("change", processMessage);
}

// Copy output
function copyOutput() {
    const text = document.getElementById("outputText").innerText;
    if (!text.trim()) return alert("⚠️ Nothing to copy!");
    navigator.clipboard.writeText(text)
        .then(() => alert("✅ Message copied!"))
        .catch(() => alert("❌ Copy failed!"));
}

// Paste clipboard text
async function pasteToInput() {
    try {
        const text = await navigator.clipboard.readText();
        if (!text.trim()) {
            alert("⚠️ Clipboard is empty!");
            return;
        }
        document.getElementById("inputText").value = text;
        updateCounts();
    } catch (err) {
        const fallback = prompt("⚠️ Clipboard access blocked. Paste manually here:");
        if (fallback) {
            document.getElementById("inputText").value = fallback;
            updateCounts();
        }
    }
}

// Update word/char count
function updateCounts() {
    const input = document.getElementById("inputText").value;
    const output = document.getElementById("outputText").innerText;

    const inputWords = input.trim().split(/\s+/).filter(Boolean).length;
    const outputWords = output.trim().split(/\s+/).filter(Boolean).length;

    document.getElementById("inputCount").innerText = `Words: ${inputWords} | Characters: ${input.length}`;
    document.getElementById("outputCount").innerText = `Words: ${outputWords} | Characters: ${output.length}`;
}

// Live count on input
document.getElementById("inputText").addEventListener("input", updateCounts);