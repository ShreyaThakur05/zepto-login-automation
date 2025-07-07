require('dotenv').config();
const puppeteer = require('puppeteer');
const { getLiveSession, clearLiveSession } = require('./login');

async function submitOtp(sessionId, otp) {
  console.log(`Submitting OTP for session ${sessionId} ...`);

  const live = getLiveSession(sessionId);
  if (!live) {
    throw new Error(`Session not found for ID: ${sessionId}`);
  }

  const { page, browser } = live;

  console.log(`Typing OTP: ${otp} ...`);

  await page.waitForSelector("input[type='tel']", { timeout: 20000 });
  await page.type("input[type='tel']", otp);

  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.innerText, btn);
    if (text.toLowerCase().includes('verify') || text.toLowerCase().includes('continue')) {
      await btn.click();
      console.log("Clicked Verify/Continue");
      break;
    }
  }

  await new Promise(r => setTimeout(r, 5000)); 

  await browser.close();
  clearLiveSession(sessionId);

  return {
    status: "SUCCESS",
    message: "OTP submitted and session closed!"
  };
}

module.exports = { submitOtp };
