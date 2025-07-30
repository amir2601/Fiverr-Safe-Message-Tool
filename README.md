# Fiverr-Safe-Message-Tool

## 🔒 Secure Your Messages on Fiverr (English + বাংলা)

A lightweight JavaScript tool that helps freelancers avoid violating Fiverr’s rules by automatically sanitizing risky words in their messages.

---

## ✨ Features

- ✅ Detects risky/restricted keywords like **email**, **payment**, **phone**, etc.
- ✅ Applies custom **hyphenation** (e.g., `pa-yment`, `e-ma-il`)
- ✅ Helps avoid Fiverr TOS violations
- ✅ Easy to customize and extend
- ✅ Lightweight and fast

---

## 🚀 Quick Example

```js
const sanitizeMessage = require('./fiverrSafeTool');

const input = "Contact me on WhatsApp or email for payment.";
const safeMessage = sanitizeMessage(input);

console.log(safeMessage);
// Output: "Con-tact me on Wha-tsApp or e-ma-il for pa-yme-nt."
