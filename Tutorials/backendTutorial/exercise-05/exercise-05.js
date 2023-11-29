// Import packages, initial setup
const express = require("express");
const app = express();
const port = 3000;

// Enable static routing for "public" folder
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Set up to use the body parser (allows us to read POSTed form data)
app.use(express.urlencoded({ extended: false }));

// TODO Your code here.
app.get("/getJson", function (req, res) {
    const contents = req.query;
    writeToJson(contents, res);
});

app.post("/postJson", function (req, res) {
    const contents = req.body;
    writeToJson(contents, res);
});

function writeToJson(contents, res) {
    let empty = false
    for (data in contents) {
        if (contents[data]==="" || contents["thoughts"]===undefined) {
            res.send("Some inputs are empty");
            empty = true;
            break;
        }
    }
    if (empty === false) {
        const formData = {
            name: contents["name"],
            email: contents["e-mail"],
            city: contents["city"],
            thoughts: contents["thoughts"],
            experience: contents["experience"],
            mammal: contents["mammal"],
            comments: contents["comments"],
            submit_button: contents["submit_button"]
        }
        res.json(formData);
    }
}


// Start the server running
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
