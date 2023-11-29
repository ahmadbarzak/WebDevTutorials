const express = require("express");
const Director = require('../models/director.js');
const Film = require('../models/film.js');
const router = express.Router();
const { getDataByParam, filterByParam } = require("../utils/dataProcessing.js");

// Get all directors
router.get("/", async function(req, res){
    const directors = await Director.find();
    res.json(directors);
});

// Get a director by id
router.get("/id/:id", function(req, res){
    getDataByParam(res, Director, "id", req.params["id"]);
});

// Get a director by first name
router.get("/firstName/:firstName", function(req, res){
    getDataByParam(res, Director, "firstName", req.params["firstName"]);
});

// Get a director by last name
router.get("/lastName/:lastName", function(req, res){
    getDataByParam(res, Director, "lastName", req.params["lastName"]);
});

// Get a director by querying min/max age
router.get("/age", function(req, res){
    filterByParam(res, Director, "age", req.query.min, req.query.max);
});

// Get a director by gender
router.get("/gender/:gender", function(req, res){
    getDataByParam(res, Director, "gender", req.params["gender"]);
});

// Get a director by country
router.get("/country/:country", function(req, res){
    getDataByParam(res, Director, "country", req.params["country"]);
});

// Add a director to the data by specifying all required properties for a director object
router.post("/", async function(req, res){
    try {
        const count = await Director.countDocuments();
        console.log(req.body);
        console.log("Entered");
        const director = new Director({
            id: count + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: parseInt(req.body.age),
            gender: req.body.gender,
            country: req.body.country
        });
        await director.save();
        res.json(director);
    } catch(err) {
        console.error(err);
        res.status(500).send('Error adding director');
    }
});

// Get a director and their films by id
router.get("/:id", async (req, res) => {
    const directorId = parseInt(req.params.id);
    const director = await Director.find({"id": directorId});
    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }
    const directorFilms = await Film.find({"directorId": directorId});
    const directorWithFilms = {
      ...director,
      films: directorFilms,
    };
    res.json(directorWithFilms);
});

// Delete a director from the data based on a specific id
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const result = await Director.deleteOne({ id: id }); // Delete the director by ID
        if (result.deletedCount === 1) {
            res.status(204).send(); // Successfully deleted
        } else {
            res.status(404).send("Director not found");
        }
    } catch (err) {
        console.error("Error deleting director:", err);
        res.status(500).json({ error: 'Error deleting director' });
    }
});

module.exports = router;