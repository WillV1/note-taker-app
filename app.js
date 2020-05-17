const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* GET `/notes` - Should return the `notes.html` file.

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
  });

//* GET `*` - Should return the `index.html` file

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./develop/public/index.html")); 
  });

//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

let notes = fs.readFileSync('./develop/db/db.json');
app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
// and then return the new note to the client.

app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
  
    console.log(newNote);
  
    // We then add the json the user sent to the character array
    notes.push(newNote);
  
    // We then display the JSON to the users
    res.json(newNote);
  });

//   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
// This means you'll need to find a way to give each note a unique `id` when it's saved. 
// In order to delete a note, you'll need to read all notes from the `db.json` file, 
// remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.






app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });