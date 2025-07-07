require('dotenv').config();
const puppeteer = require('puppeteer');
const selectors = require('../config/selectors.json');
const { v4: uuidv4 } = require('uuid');
const { saveBrowserSession } = require('./browserStore');

async function launchLoginBrowser(phone) {
  const sessionId = uuidv4();
  const s = selectors["zepto"];

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50
  });

  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on('request', req => {
    const resource = req.resourceType();
    if (['image', 'font'].includes(resource)) req.abort();
    else req.continue();
  });

  console.log("Using GROCERY_URL:", process.env.GROCERY_URL);

  await page.goto(process.env.GROCERY_URL, { waitUntil: "networkidle2" });

  console.log("Waiting for login button...");
  await page.waitForSelector(s.login_button, { timeout: 20000 });
  await page.click(s.login_button);

  console.log("Waiting for phone input...");
  await page.waitForSelector(s.phone_input, { timeout: 20000 });
  await page.type(s.phone_input, phone);

  console.log("Clicking Continue...");
  await new Promise(resolve => setTimeout(resolve, 1000));
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText, btn);
    if (text.toLowerCase().includes('continue')) {
      await btn.click();
      console.log("Clicked Continue");
      break;
    }
  }

  console.log("Waiting for OTP page to render...");
  await new Promise(resolve => setTimeout(resolve, 5000));

  saveBrowserSession(sessionId, browser, page);

  console.log(`OTP page ready. Session ID: ${sessionId}`);

  return { status: "OTP_SENT", session_id: sessionId };
}

module.exports = { launchLoginBrowser };
