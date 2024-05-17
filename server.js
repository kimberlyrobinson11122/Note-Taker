const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const PORT = 3001;

// Initialize our app variable by setting it to the value of 'express()'
const app = express();

// Middleware for parsing application/json and urlencoded data (body parsing section-15)
// Important to use body parsing middleware, good to have at least one
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static files from the '/public' folder
app.use(express.static('public'));

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET request for notes
app.get('/notes', (req, res) => {
  console.info(`GET /notes`);
  res.status(200).json(noteData);
});

// GET request for ALL notes
app.get('/notes', (req, res) => {

    // Log our request to the terminal
    console.info(`${req.method} request received to get all the notes`);

    // Sending all notes to the user
    res.sendFile(path.join(__dirname, "/public/notes.html"))

});

// POST request to add a note to the database
app.post('/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a new note`);

  // Prepare a response object to send back to the user
  let response;

  // Check if there is anything in the response body
  if (req.body && req.body.content) {
    response = {
      status: 'success',
      data: req.body,
    };
    res.json(`Review for ${response.data.content} has been added!`);
  } else {
    res.json('Request body must at least contain content');
  }

  // Log the response body to the console
  console.log(req.body);
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);