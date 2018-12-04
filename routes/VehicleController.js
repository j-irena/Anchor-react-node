const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Vehicle = require("../models/Vehicle");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://apps007.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "dYFrWpWlrTLxKkSuWxxGz5RBxDQrg9Gu",
  issuer: `https://apps007.auth0.com/`,
  algorithms: ["RS256"]
});

// Create a new vehicle
router.post("/", checkJwt, function(req, res) {
  Vehicle.create(
    {
      name: req.body.name,
      type: req.body.type
    },
    function(err, vehicle) {
      if (err)
        return res
          .status(500)
          .send("There was a problem adding the information to the database.");
      res.status(200).send(vehicle);
    }
  );
});

// Return all the vehicles in the database
router.get("/", function(req, res) {
  Vehicle.find({}, function(err, vehicles) {
    if (err)
      return res.status(500).send("There was a problem finding the vehicles.");
    res.status(200).send(vehicles);
  });
});

// Return all the vehicle types in the database
router.get("/vehicleTypes", function(req, res) {
  types = Vehicle.schema.path("type").enumValues;
  if (!types)
    return res.status(500).send("There was a problem finding the vehicles.");
  res.status(200).send(types);
});

// Gets a single vehicle in the database
router.get("/:id", function(req, res) {
  Vehicle.findById(req.params.id, function(err, vehicle) {
    if (err)
      return res.status(500).send("There was a problem finding the vehicle.");
    if (!vehicle) return res.status(404).send("No vehicle found.");
    res.status(200).send(vehicle);
  });
});

// Deletes a vehicle from the database
router.delete("/:id", function(req, res) {
  Vehicle.findByIdAndRemove(req.params.id, function(err, vehicle) {
    if (err)
      return res.status(500).send("There was a problem deleting the vehicle.");
    res.status(200).send("Vehicle " + vehicle.name + " was deleted.");
  });
});

// Updates a single vehicle in the database
router.put("/:id", function(req, res) {
  Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    vehicle
  ) {
    if (err)
      return res.status(500).send("There was a problem updating the vehicle.");
    res.status(200).send(vehicle);
  });
});
module.exports = router;
