const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    country: String
});

const Director = mongoose.model('directors', directorSchema, 'directors');

module.exports = Director;