// Importing necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Importing route handlers
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const userRoutes = require('./routes/userRoutes'); // Importing user routes

// Initializing the Express app
const app = express();

// Database connection string
const dbURI =  "mongodb+srv://Cluster55809:e3dibUtffE1u@cluster55809.c7touiq.mongodb.net/honours_project?retryWrites=true&w=majority";

// Connecting to the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to the MongoDB database'))
  .catch((err) => console.error('Database connection error:', err));

// Middleware setup
app.use(cors()); // Handling CORS
app.use(bodyParser.json()); // Parsing JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded bodies
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
// Add other middleware as needed

// Setting up routes
app.use('/auth', authRoutes);
app.use('/course', courseRoutes);
// app.use('/assignment', assignmentRoutes);
app.use('/user', userRoutes); // Adding user routes

// Handling 404 - Not Found
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
