# Zepto Login Automation

This project automates the login flow for **Zepto** using a headless browser.  
It uses **Puppeteer** to:
- Open Zepto’s website
- Click the login button
- Enter a phone number
- Submit the number to trigger an OTP
- Return the session ID in the terminal

---

## 📂 Features

✅ CSS Selector identification for:
- Login buttons
- Phone number input
- OTP input fields
- Submit buttons

✅ Headless browser with:
- Non-essential resources blocked (fonts, images, CSS)
- Keeping in mind Content Security Policy (CSP)

✅ Fully automated:
- Navigation to the platform
- Phone number entry
- OTP request

---

## ⚙️ Tech Stack

- **Node.js**
- **Puppeteer** (or `chromedp` alternative if needed)

---

## 🚀 How to Run

Clone this repository:
```bash
git clone https://github.com/ShreyaThakur05/zepto-login-automation.git
cd zepto-login-automation
```
