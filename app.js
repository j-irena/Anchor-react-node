const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

app.use(helmet());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan("combined"));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI);

const VehicleController = require("./routes/VehicleController");
app.use("/vehicles", VehicleController);
module.exports = app;
