// This file sets up the website and starts the server.

// dotenv reads the settings in the .env file, like the database connection string.
require('dotenv').config();

const path = require('path');
const express = require('express');

const connectToDatabase = require('./config/db');
const listingRoutes = require('./routes/listings');

const app = express();
const PORT = process.env.PORT || 3000;

// ----- Pages -----
// EJS is used to build the pages. The page templates are in the views folder.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ----- Middleware -----
// Files in the public folder (CSS, images, browser JavaScript) are sent as they are.
app.use(express.static(path.join(__dirname, 'public')));

// This reads submitted form data and puts it in req.body.
app.use(express.urlencoded({ extended: false }));

// ----- Values every page can use -----
// The site name, shown in the navigation bar and page titles.
app.locals.appName = 'CampusMarket';

// formatPrice turns 25 into "$25.00".
app.locals.formatPrice = (price) => `$${Number(price).toFixed(2)}`;

// formatDate turns a date into something readable, like "Nov 20, 2026".
app.locals.formatDate = (date) =>
  new Date(date).toLocaleDateString('en-CA', { dateStyle: 'medium', timeZone: 'America/Toronto' });

// ----- Routes -----
// The home page.
app.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home', activePage: 'home' });
});

// Every address that starts with /listings is handled in routes/listings.js.
app.use('/listings', listingRoutes);

// ----- Page not found -----
// This runs when no route above matches the address.
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', activePage: '' });
});

// ----- Errors -----
// This runs when a route has a problem, like the database being unavailable.
// Express knows it handles errors because it has four parameters.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { pageTitle: 'Error', activePage: '' });
});

// ----- Start -----
// The app connects to the database first, then starts the server.
// If the database connection fails, the app stops and prints the reason.
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`CampusMarket is running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
    process.exit(1);
  });