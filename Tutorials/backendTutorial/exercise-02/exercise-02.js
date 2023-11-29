// The express package contains Express, and its own required dependencies. It needs to be
// installed using npm.
const express = require("express");
const app = express();
const port = 3000;

// Setup static routing. Any file located in the "public" folder
// will be able to be accessed by clients directly.
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// When a GET request is made to "/" (i.e. the root path), send "Hello World!" back to the client.
app.get("/", function (req, res) {
    res.send("Bing Chilling");
});

// When a GET request is made to "/about", send "I am Cool!" back to the client.
app.get("/about", function (req, res) {
    res.send("I am Cool!");
});


// Listen for either "/" or "/about" requests on port 3000.
// if "/" is requested, send "Hello World!" back to the client.
// if "/about" is requested, send "I am Cool!" back to the client.
app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
}
);

