const express = require('express');
require('dotenv').config();

const loginRoutes = require('./api/login');
const otpRoutes = require('./api/submitOtp');

const app = express();
app.use(express.json());

app.use('/login', loginRoutes);
app.use('/submit-otp', otpRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
