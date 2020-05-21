const express = require("express");
const fs = require("fs");
const util = require('util');

const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);


//  let note = fs.readFileSync ('.db/db/json', 'utf8')
module.exports = function(app) {

app.get("/api/notes", function (req, res) {

  let noteList = (readFileSync('./db/db.json', 'utf8'))
  // let getFileData = getFile();
  // console.log(getFileData);
  .then(noteList => res.json(JSON.parse(noteList)))
    .catch(err => console.log(err))
    console.log(noteList);
});

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
// and then return the new note to the client.
let newList = [];

app.post("/api/notes", function (req, res) {


  //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.


  // // // let note = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));    
    let newNote = req.body;
    console.log(newNote);


    writeFileSync('./db/db.json', JSON.stringify(newNote, null, 2),
    "utf8")

  // We then add the json the user sent to the notes array
  // listArray.push(newNote);
  newList.push(newNote);
  // We then display the JSON to the users
  res.json(newNote);

  
});


}