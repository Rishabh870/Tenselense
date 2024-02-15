const mongoose = require("mongoose");

const ownerManagerSchema = new mongoose.Schema({
  fullName: String,
  profilePic: String,
  state: String,
  city: String,
  country: String,
  address: String,
  email: String,
  mobileNumber: String,
});

module.exports = mongoose.model("OwnerManagerDetail", ownerManagerSchema);
