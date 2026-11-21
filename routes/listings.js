// This file handles every page that starts with /listings.
// GET  /listings      shows the table of all listings.
// GET  /listings/new  shows the empty "Post a Listing" form.
// POST /listings      checks the form and saves the new listing.

const express = require('express');
const router = express.Router();

const { Listing, CONDITIONS } = require('../models/Listing');
const validateListing = require('../utils/validateListing');

// This route shows all listings, newest first.
router.get('/', async (req, res, next) => {
  try {
    // .find() gets every listing. .sort() puts the newest at the top.
    // .lean() returns plain objects, which are faster to display.
    const listings = await Listing.find().sort({ createdAt: -1 }).lean();

    // After a new listing is saved, its id is in the address as ?new=<id>.
    // The page uses it to show a success message and highlight that row.
    // It only counts if a listing with that id really exists.
    const newListingId = listings.some((l) => String(l._id) === req.query.new) ? req.query.new : null;

    res.render('listings/index', {
      pageTitle: 'Listings',
      activePage: 'listings',
      listings,
      newListingId
    });
  } catch (err) {
    // Any database error is passed to the error page in server.js.
    next(err);
  }
});

// This route shows the empty form.
router.get('/new', (req, res) => {
  res.render('listings/new', {
    pageTitle: 'Post a Listing',
    activePage: 'new',
    conditions: CONDITIONS,
    values: {},
    errors: {}
  });
});

// This route runs when the form is submitted.
router.post('/', async (req, res, next) => {
  const { values, errors, isValid } = validateListing(req.body);

  // If something is wrong, the form is shown again.
  // It keeps what the user typed and shows a message next to each problem.
  if (!isValid) {
    return res.status(400).render('listings/new', {
      pageTitle: 'Post a Listing',
      activePage: 'new',
      conditions: CONDITIONS,
      values,
      errors
    });
  }

  try {
    // Listing.create saves the new listing in MongoDB.
    const listing = await Listing.create({ ...values, price: Number(values.price) });

    // After saving, the browser is sent to the listings page.
    // This stops the form from being submitted twice if the page is refreshed.
    res.redirect(`/listings?new=${listing._id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;