// This file starts the web server.
// This first version only shows a message on the home page.
// It confirms that Node.js and Express are working.

// Express is the framework that handles web requests.
const express = require('express');

// app is the Express application.
const app = express();

// The server uses the port given by the hosting service.
// If no port is given, it uses port 3000.
const PORT = process.env.PORT || 3000;

// This route runs when someone visits the home page ("/").
// It sends back a short text message.
app.get('/', (req, res) => {
  res.send('CampusMarket is coming soon!');
});

// This starts the server and prints the address in the terminal.
app.listen(PORT, () => {
  console.log(`CampusMarket is running at http://localhost:${PORT}`);
});