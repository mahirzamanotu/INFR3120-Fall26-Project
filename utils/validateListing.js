// This file checks the "Post a Listing" form before anything is saved.
// The browser also checks the form, but users can skip the browser checks.
// So the server checks every field again here.

const { CONDITIONS } = require('../models/Listing');

// This pattern matches a simple email like name@example.com.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// validateListing takes the submitted form data.
// It returns the cleaned values and a list of error messages.
// If the errors object is empty, the listing is valid.
function validateListing(body) {
  // clean turns missing values into an empty string and removes extra spaces.
  const clean = (value) => (typeof value === 'string' ? value.trim() : '');

  const values = {
    title: clean(body.title),
    price: clean(body.price),
    condition: clean(body.condition),
    description: clean(body.description),
    sellerEmail: clean(body.sellerEmail).toLowerCase()
  };

  // Each problem is saved under the name of the field it belongs to.
  const errors = {};

  // The title must be between 3 and 80 characters.
  if (!values.title) {
    errors.title = 'Item name is required.';
  } else if (values.title.length < 3 || values.title.length > 80) {
    errors.title = 'Item name must be 3 to 80 characters.';
  }

  // The price must be a number from 0 to 10,000.
  const price = Number(values.price);
  if (values.price === '') {
    errors.price = 'Price is required.';
  } else if (Number.isNaN(price) || price < 0 || price > 10000) {
    errors.price = 'Price must be a number from 0 to 10,000.';
  }

  // The condition must be one of the options in the dropdown.
  if (!CONDITIONS.includes(values.condition)) {
    errors.condition = 'Choose a condition from the list.';
  }

  // The description must be between 10 and 500 characters.
  if (!values.description) {
    errors.description = 'Description is required.';
  } else if (values.description.length < 10 || values.description.length > 500) {
    errors.description = 'Description must be 10 to 500 characters.';
  }

  // The email must look like a real email address.
  if (!values.sellerEmail) {
    errors.sellerEmail = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(values.sellerEmail)) {
    errors.sellerEmail = 'Enter a valid email, like name@example.com.';
  }

  return { values, errors, isValid: Object.keys(errors).length === 0 };
}

module.exports = validateListing;