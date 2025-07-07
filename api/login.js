const express = require('express');
const router = express.Router();
const { launchLoginBrowser } = require('../automation/login');

router.post('/', async (req, res) => {
  const { phone_number } = req.body;
  try {
    const result = await launchLoginBrowser(phone_number);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "FAILED", message: err.message });
  }
});

module.exports = router;
