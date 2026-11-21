// This file describes what a listing looks like in the database.
// A listing is one item a student is selling.

const mongoose = require('mongoose');

// These are the only conditions an item can have.
// The form dropdown and the validation both use this same list.
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

// The schema lists every field a listing has and the rules for each one.
const listingSchema = new mongoose.Schema(
  {
    // The name of the item, like "Calculus textbook".
    title: { type: String, required: true, trim: true, maxlength: 80 },

    // The asking price in dollars.
    price: { type: Number, required: true, min: 0, max: 10000 },

    // How used the item is. It must be one of the CONDITIONS above.
    condition: { type: String, required: true, enum: CONDITIONS },

    // More details about the item.
    description: { type: String, required: true, trim: true, maxlength: 500 },

    // The email buyers use to contact the seller.
    sellerEmail: { type: String, required: true, trim: true, lowercase: true, maxlength: 100 }
  },
  // timestamps adds createdAt and updatedAt dates to every listing automatically.
  { timestamps: true }
);

// The model is what the routes use to save and find listings.
// MongoDB stores them in a collection called "listings".
const Listing = mongoose.model('Listing', listingSchema);

module.exports = { Listing, CONDITIONS };