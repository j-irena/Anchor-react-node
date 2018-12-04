var mongoose = require("mongoose");
var VehicleSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["SUV", "Truck", "Hybrid", "Convertible"] },
  created_at: { type: Number, default: new Date().getTime() },
  last_successful_update: { type: Number, default: new Date().getTime() }
});

// VehicleSchema.pre('save', function(next) {
// 	var now = new Date().getTime();

// 	if ( !this.created_at) {
// 		this.created_at = now;this.last_successful_upd
//     ate = now;
// 	}
//   	next();
// });

mongoose.model("Vehicle", VehicleSchema);
module.exports = mongoose.model("Vehicle");
