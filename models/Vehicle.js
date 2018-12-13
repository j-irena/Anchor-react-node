var mongoose = require("mongoose");
var VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["SUV", "Truck", "Hybrid", "Convertible"]
  },
  created_at: { type: Number, default: new Date().getTime() },
  last_successful_update: { type: Number, default: new Date().getTime() }
});

mongoose.model("Vehicle", VehicleSchema);
module.exports = mongoose.model("Vehicle");
