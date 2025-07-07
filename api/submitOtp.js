const express = require('express');
const router = express.Router();
const { submitOtp } = require('../automation/submitOtp');

router.post('/', async (req, res) => {
  const { otp, session_id } = req.body;

  try {
    const result = await submitOtp(session_id, otp);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "FAILED", message: err.message });
  }
});

module.exports = router;
