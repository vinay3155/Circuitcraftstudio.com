require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('CircuitCraft Studio API Server is running...');
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/circuitcraft';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
