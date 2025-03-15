// Import the Express module to create a web server
var express = require("express");

// Initialize an Express application
var app = express();

// Serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Middleware to parse JSON data in incoming requests
app.use(express.json());

// Middleware to parse URL-encoded data from form submissions (extended: false means it uses the querystring library)
app.use(express.urlencoded({ extended: false }));

// Define the port number for the server. If an environment variable PORT is set, use that; otherwise, default to 3000
var port = process.env.PORT || 3000;

// Function to add two numbers and return the sum
const addTwoNumber = (n1, n2) => {
    return n1 + n2; // Adds n1 and n2 and returns the result
};

// Define a route for the GET request at "/addTwoNumber"
app.get("/addTwoNumber", (req, res) => {
    // Extract the values of 'n1' and 'n2' from the query parameters and convert them to integers
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);

    // Check if the parsed numbers are valid; if not, return a 400 Bad Request response
    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ statusCode: 400, error: "Invalid numbers provided" });
    }

    // Call the addTwoNumber function to calculate the sum
    const result = addTwoNumber(n1, n2);

    // Send a JSON response with the status code and the computed sum
    res.json({ statusCode: 200, data: result });
});

// Start the server and make it listen on the specified port
app.listen(port, () => {
    console.log("App is listening to: " + port); // Log a message indicating the server is running
});
