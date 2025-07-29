const riskyWords = [
  // Contact methods
  "email", "e-mail", "gmail", "hotmail", "outlook", "yahoo", "phone", "mobile", "number", "contact", "call",
  "whatsapp", "telegram", "skype", "zoom", "meet", "hangouts", "viber", "imo", "signal",

  // Payment & financial
  "pay", "payment", "paypal", "venmo", "cashapp", "bank", "western union", "moneygram", "btc", "bitcoin", "crypto", "wallet",
  "wire transfer", "invoice", "direct payment", "outside fiverr", "off fiverr", "send money", "money",

  // External links/platforms
  "personal website", "domain", "upwork", "freelancer", "freelancer.com", "peopleperhour", "toptal", "fiverr alternative",

  // Social platforms
  "facebook", "messenger", "instagram", "linkedin", "twitter", "x.com", "snapchat", "tiktok", "youtube", "pinterest", "reddit", "discord",

  // Policy evasion phrases
  "give me your number", "contact me outside", "message me on", "hire me on", "work outside fiverr", "pay directly",

  // Inappropriate/explicit (partial list for demo)
  "fuck", "shit", "bitch", "bastard", "asshole", "dick", "pussy", "slut", "whore", "cunt", "nude", "nudes", "porn", "sex", "hentai",

  // Threats/violence
  "kill", "die", "suicide", "bomb", "terrorist", "attack", "shoot", "gun", "weapon"
];

function insertHyphen(word) {
    const clean = word.replace(/[^a-zA-Z]/g, "");
    if (clean.length < 2) return word;

    let pos;
    if (clean.length === 2) {
        pos = 1; //
    } else {
        pos = Math.floor(clean.length / 2); //
    }

    const hyphenated = clean.slice(0, pos) + "-" + clean.slice(pos);
    return word.replace(clean, hyphenated);
}

function processMessage() {
    let text = document.getElementById("inputText").value;
    let foundWords = [];

    riskyWords.forEach(risky => {
        const pattern = new RegExp(`\\b${risky}\\b`, "gi");

        // Detect all matches and add to foundWords array (avoid duplicates)
        let matches = text.match(pattern);
        if (matches) {
            matches.forEach(m => {
                const lower = m.toLowerCase();
                if (!foundWords.includes(lower)) foundWords.push(lower);
            });
        }

        // Replace with hyphenated version
        text = text.replace(pattern, match => insertHyphen(match));
    });

    document.getElementById("outputText").innerText = text;
    updateCounts();

    // Show restricted words found
    const restrictedDiv = document.getElementById("restrictedWords");
    if (foundWords.length) {
        restrictedDiv.style.display = "block";
        restrictedDiv.innerText = "🚫 Found restricted words: " + foundWords.join(", ");
    } else {
        restrictedDiv.style.display = "none";
        restrictedDiv.innerText = "";
    }
}

function copyOutput() {
    const text = document.getElementById("outputText").innerText;
    navigator.clipboard.writeText(text)
        .then(() => alert("✅ Message copied!"))
        .catch(() => alert("❌ Copy failed!"));
}

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

function updateCounts() {
    const input = document.getElementById("inputText").value;
    const output = document.getElementById("outputText").innerText;

    const inputWords = input.trim() ? input.trim().split(/\s+/).length : 0;
    const inputChars = input.length;

    const outputWords = output.trim() ? output.trim().split(/\s+/).length : 0;
    const outputChars = output.length;

    document.getElementById("inputCount").innerText = `Words: ${inputWords} | Characters: ${inputChars}`;
    document.getElementById("outputCount").innerText = `Words: ${outputWords} | Characters: ${outputChars}`;
}

document.getElementById("inputText").addEventListener("input", updateCounts);