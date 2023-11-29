const express = require("express");
const router = express.Router();
// const Director = require('../models/director.js');
const Film = require('../models/film.js');
const { getDataByParam, filterByParam} = require("../utils/dataProcessing.js");

// Get all directors
router.get("/", async function(req, res){
    const films = await Film.find();
    res.json(films);
});

// Get a film by id
router.get("/id/:id", function(req, res){
    getDataByParam(res, Film, "id", req.params["id"]);
});

// Get film by title
router.get("/title/:title", function(req, res){
    getDataByParam(res, Film, "filmTitle", req.params["title"]);
});

// Get films by one specific release year
router.get("/releaseYear/:releaseYear", function(req, res){
    getDataByParam(res, Film, "releaseYear", req.params["releaseYear"]);
});

// Get films by querying min/max release year
router.get("/releaseYear", function(req, res){
    filterByParam(res, Film, "releaseYear", req.query.min, req.query.max);
});

// Get films by director id
router.get("/directorId/:directorId", function(req, res){
    getDataByParam(res, Film, "directorId", req.params["directorId"]);
});

// Get films by querying min/max length
router.get("/length", function(req, res){
    filterByParam(res, Film, "length", req.query.min, req.query.max);
});

// Get films by one specific length
router.get("/length/:length", function(req, res){
    console.log(req.params);
    getDataByParam(res, Film, "length", req.params["length"]);
});

// Add a director to the data by specifying all required properties for a director object
router.post("/", async function(req, res){
    try {
        const count = await Film.countDocuments();
        console.log(req.body);
        console.log(req.body);
        console.log("Entered");
        const film = new Film({
            id: count + 1,
            filmTitle: req.body.filmTitle,
            releaseYear: parseInt(req.body.releaseYear),
            directorId: parseInt(req.body.directorId),
            length: parseInt(req.body.length)
        });
        await film.save();
        res.json(film);
    } catch(err) {
        console.error(err);
        res.status(500).send('Error adding film');
    }
});

// Delete a director from the data based on a specific id
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params["id"]);
        const result = await Film.deleteOne({ id: id }); // Delete the director by ID
        if (result.deletedCount === 1) {
            res.status(204).send(); // Successfully deleted
        } else {
            res.status(404).send("Film not found");
        }
    } catch (err) {
        console.error("Error deleting director:", err);
        res.status(500).json({ error: 'Error deleting film' });
    }
});

module.exports = router;