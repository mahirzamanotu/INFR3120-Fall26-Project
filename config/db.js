// This file connects the app to the MongoDB Atlas database.

// Mongoose is a library that makes it easier to work with MongoDB.
const mongoose = require('mongoose');

// connectToDatabase opens the connection to MongoDB.
// It reads the connection string from the MONGODB_URI setting.
// server.js calls this function before the website starts.
async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  // Without a connection string, the app has nowhere to save listings.
  // This error explains exactly what is missing.
  if (!uri) {
    throw new Error('MONGODB_URI is not set. It must be added to the .env file or the hosting settings.');
  }

  // mongoose.connect waits until the connection to the database is ready.
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
}

// This makes the function available to other files, like server.js.
module.exports = connectToDatabase;