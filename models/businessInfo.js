const mongoose = require("mongoose");

const businessInfoSchema = new mongoose.Schema({
  businessInfo: String,
  country: String,
  state: String,
  city: String,
  address: String,
  openingTime: String,
  closingTime: String,
  email: String,
  mobileNumber: String,
  image: String,
});

module.exports = mongoose.model("BusinessInfo", businessInfoSchema);
