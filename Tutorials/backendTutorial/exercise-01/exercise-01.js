// The http package allows us to create a basic node.js web server.
const http = require("http");

// Create the server. Whenever a request comes in, the handleRequest() function will be called,
// which will be provided with the details of that request.
const server = http.createServer(handleRequest);

// Start the server running, on port 3000 (port 3000 is the "standard" port used for node.js testing).
server.listen(3000);

//send JSON back rather than a simple text message. The JSON should contain a single property called "message" with the value "Hello, world!".
JSON.stringify({
    message: "Hello, world!"
});




// Hint: The content type for JSON is application/json. And, remember the JSON.stringify() function.

// This function is called when a request comes in. In this case, we simply send the text
// "Hello, World!" back to the client.
function handleRequest(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.end(JSON.stringify({ message: "Hello, world!" }));
}
