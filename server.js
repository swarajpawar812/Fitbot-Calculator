// Import the required modules
const express = require('express');
const path = require('path');

// Initialize the Express application
const app = express();

// Set the static folder for serving HTML, CSS, and JS files
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the main HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define the port for the server
const PORT = process.env.PORT || 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});