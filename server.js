const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to Database
connectDB();

// Router files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'developement') {
  app.use(morgan('dev'));
}

// Route
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.status(200).send({ name: 'walid' });
});

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server && exit process
  server.close(() => process.exit(1));
});
