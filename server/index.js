// server/index.js
const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });// Headless false for CAPTCHA
  const page = await browser.newPage();

  try {
    await page.goto('https://www.irctc.co.in/nget/train-search', { timeout: 60000 });
    await page.click('text=LOGIN', { timeout: 20000 });

    await page.fill('input[formcontrolname="userid"]', username);
    await page.fill('input[formcontrolname="password"]', password);

    console.log('🔒 WAIT: Please solve CAPTCHA manually within 60 seconds...');
    await page.waitForTimeout(60000);

    await page.click('button[type="submit"]');

    await page.waitForSelector('text=Book Ticket', { timeout: 30000 });
    console.log('✅ Logged in! Keeping session alive...');

    for (let i = 0; i < 4; i++) {
      await page.goto('https://www.irctc.co.in/nget/train-search');
      console.log(`✅ Session ping ${i + 1}`);
      await page.waitForTimeout(30000);
    }

    res.json({ success: true, message: 'Login success and session kept alive for 2 minutes.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Automation failed.' });
  } finally {
    await browser.close();
  }
});

app.listen(5000, () => {
  console.log('🚀 Backend running on http://localhost:5000');
});
