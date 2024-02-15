const express = require("express");
const router = express.Router();
const OwnerManagerDetail = require("../models/ownerManagerDetail");

// CREATE Owner Manager Detail
router.post("/", async (req, res) => {
  const ownerManagerDetail = new OwnerManagerDetail(req.body);
  try {
    const newOwnerManagerDetail = await ownerManagerDetail.save();
    res.status(201).json(newOwnerManagerDetail);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
