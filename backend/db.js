// backend/db.js
const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://ShaikhZiya:Ziya4321@cricke.7mmh4.mongodb.net/?retryWrites=true&w=majority&appName=Cricke';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;