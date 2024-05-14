const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const uid = require('uid');
// const uniqueId = uid(3);
// console.log(uniqueId);
const PORT = 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static files from the '/public' folder
app.use(express.static('public'));

// Route to serve notes.html for the /notes route

app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, 'public/index.html')));
  

// Endpoint to return JSON data
app.get('/notes', (req, res) => res.json(noteData));

// // Catch-all for route to serve index.html for other routes



// // GET request for all notes
app.get('/notes', (req, res) => {
  // Log request to the terminal
  console.info(`${req.method} request received to get all the notes`);

//   // Sending all notes to the client
  return res.json(notes);
});

// POST request to add a note
app.post('/note', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Prepare a response object to send back to the client
  let response;

  // Check if there is anything in the response body
  if (req.body && req.body.conent) {
    response = {
      status: 'success',
      data: req.body,
    };
    res.json(`Note for ${response.data.content} has been added!`);
  } else {
    res.json('Request body must at least contain a note title');
  }

  //Log the response body to the console
  console.log(req.body);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);