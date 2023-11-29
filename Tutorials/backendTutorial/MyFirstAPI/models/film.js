const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  id: Number,
  filmTitle: String,
  releaseYear: Number,
  directorId: Number,
  length: Number
});

const Film = mongoose.model('films', filmSchema, 'films');

module.exports = Film;