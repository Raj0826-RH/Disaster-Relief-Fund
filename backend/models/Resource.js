const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  resourceName: String,
  category: String,
  totalQuantity: Number,
  availableQuantity: Number,
  location: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model("Resource", resourceSchema);
