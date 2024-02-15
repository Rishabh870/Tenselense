const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const router = express.Router();

require("./models/businessInfo");
require("./models/ownerManagerDetail");
const businessInfoRoutes = require("./routes/businessInfoRoutes");
const ownerManagerRoutes = require("./routes/ownerManagerRoutes");
const nodemailer = require("nodemailer");

require("dotenv").config();

app.use(express.json());
app.use(cors());
const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const EMAIL = process.env.USER;
const PASS = process.env.PASS;

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("DB Connected ");
});
mongoose.connection.on("error", (err) => {
  console.log("Error On mongose ,connenction " + err);
});

app.use(express.json());

app.use("/business-info", businessInfoRoutes);
app.use("/owner-manager", ownerManagerRoutes);

// verification
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASS,
  },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

const verificationCode = {};

router.post("/send-verification-code", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const code = generateOTP();
  verificationCode[email] = code;
  const mailOption = {
    from: "moses87@ethereal.email",
    to: email,
    subject: "Email Verification Code",
    text: `Your verification code is: ${code}`,
  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      // console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent" });
    }
  });
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  // console.log(email, otp, verificationCode[email]);
  if (verificationCode[email] === parseInt(otp)) {
    res.status(200).json({ message: "OTP verified" });
  } else {
    res.status(401).json({ error: "Invalid OTP" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
