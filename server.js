const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const fs = require('fs');

const uuid = require('uuid');

// Initialize our app variable by setting it to the value of 'express()'
const app = express();

// Important to use body parsing middleware, best practices: at least one of these
app.use(express.json()); //implement middleware for parsing json
app.use(express.urlencoded({ extended: true })); //implement middleware for parsing URL encoded data
//Choosing extended: true is generally recommended when you need to handle more complex data structures in your application. 
//It gives you the flexibility to work with nested objects and arrays, which can be crucial for handling form data in more sophisticated applications.

// Serve up static files from the '/public' folder
app.use(express.static('public'));

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, "/public/index.html"))
  );

// GET request for notes
app.get('/api/notes', (req, res) => {
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
// API route, not HTML route
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a new note`);

  // Prepare a response object to send back to the user
  let response;

  // Check if there is anything in the response body
  if (req.body && req.body.text) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid.v4(),
      } 

    noteData.push(newNote);
    // push the new note onto the array, must have noteData first then push
    fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => {
      response = {
        status: 'success',
        data: req.body,
        };
  
     res.json(`Review for ${response.data.text} has been added!`)
  });
  
  } else {
    res.json('Request body must at least contain content');
  }

  // Log the response body to the console
  console.log(req.body);
  });

app.delete('/api/notes/:note_id', (req, res) => {
  const note_id = req.params.note_id;
  // Log that a DELETE request was received
  console.info(`${req.method} request received to delete a note`);

  const deleteNote = noteData.findIndex(function(note){
    return note.id === note_id;
    //looks through every single note that matches that the api was given, then it returns the index of where the note was found
    })

    noteData.splice(deleteNote, 1);
    //deletes the one that indexed above

    fs.writeFile('./db/db.json', JSON.stringify(noteData), (err) => {
      response = {
        status: 'success',
        data: req.body,
    };

   res.json(`${note_id} has been added!`)
  });

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);