// Import packages, initial setup
const cors = require('cors');
const express = require("express");
const connectDb = require('./mongoDb/db.js');
const film = require("./routes/filmHandler.js");
const director = require("./routes/directorHandler.js");

// Connect to the database
connectDb();

// Create the server
const app = express();

const port = process.env.PORT ? process.env.PORT : 3000;

// Enable CORS
const corsOptions = {
    origin: '*',  //replace with your domain or '*'
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Enable static routing for "public" folder
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Set up to use the body parser (allows us to read POSTed form data)
app.use(express.urlencoded({ extended: false }));

// Set up to use the JSON parser (allows us to read JSON data)
app.use(express.json());

// Set up the routes
app.use("/films", film);
app.use("/directors", director);

// Start the server running
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});