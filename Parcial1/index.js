const express = require('express'); // Import express   
const app = express(); // Initialize express    
const port = 3000; // Port where server will run

app.get('/', (req, res) => { // Define a route
    res.sendFile(__dirname + '/public/index.html'); // Send HTML file
    }); 

app.listen(port, () => { // Start server
    console.log(`Server running at http://localhost:${port}`); // Log message
    });