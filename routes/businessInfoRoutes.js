const express = require("express");
const router = express.Router();
const BusinessInfo = require("../models/businessInfo");
const upload = require("../multerConfig");

// CREATE Business Information
router.post("/", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;

  try {
    const businessInfo = new BusinessInfo(req.body);
    businessInfo.image = imagePath;
    const newBusinessInfo = await businessInfo.save();
    res.status(201).json(newBusinessInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
