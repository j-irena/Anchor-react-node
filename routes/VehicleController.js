var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Vehicle = require('../models/Vehicle');


// Create a new vehicle
router.post('/', function (req, res) {
    Vehicle.create({
            name : req.body.name,
            type : req.body.type
        }, 
        function (err, vehicle) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(vehicle);
        });
});

// Return all the vehicles in the database
router.get('/', function (req, res) {
    Vehicle.find({}, function (err, vehicles) {
        if (err) return res.status(500).send("There was a problem finding the vehicles.");
        res.status(200).send(vehicles);
    });
});

// Gets a single vehicle in the database
router.get('/:id', function (req, res) {
    Vehicle.findById(req.params.id, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem finding the vehicle.");
        if (!vehicle) return res.status(404).send("No vehicle found.");
        res.status(200).send(vehicle);
    });
});

// Deletes a vehicle from the database
router.delete('/:id', function (req, res) {
    Vehicle.findByIdAndRemove(req.params.id, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem deleting the vehicle.");
        res.status(200).send("Vehicle "+ vehicle.name +" was deleted.");
    });
});

// Updates a single vehicle in the database
router.put('/:id', function (req, res) {
    Vehicle.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, vehicle) {
        if (err) return res.status(500).send("There was a problem updating the vehicle.");
        res.status(200).send(vehicle);
    });
});
module.exports = router;
