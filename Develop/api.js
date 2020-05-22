const express = require("express");
const fs = require("fs");
const util = require('util');

const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);


//  let note = fs.readFileSync ('.db/db/json', 'utf8')
module.exports = function (app) {

  app.get("/api/notes", function (req, res) {

    (readFileSync('./db/db.json', 'utf8'))
      // let getFileData = getFile();
      // console.log(getFileData);
      .then(noteList => {
        console.log(noteList, "data-two")
        res.json(JSON.parse(noteList))
      })
      .catch(err => console.log(err))

  });

  //   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
  // and then return the new note to the client.


  app.post("/api/notes", async function (req, res) {


    //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.


    // // // let note = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));    
    let newNote = req.body;
    console.log(newNote);

    // addNote = function noteJoin() {
    //   (readFileSync('./db/db.json', 'utf8'))
    //     // let getFileData = getFile();
    //     // console.log(getFileData);
    //     .then(noteList => {
    //       console.log(noteList)
    //       return (JSON.parse(noteList))

    //     })
    //     .catch(err => console.log(err))

    //     addNote.push(newNote);
    // }

    //  let x = JSON.parse(readFileSync("./db/db.json", "utf8"));

    // let readFile = readFileSync("./db/db.json", "utf8")
    //   .then(data => {
    //     return (JSON.parse(data))
    //   })
    //   .catch(err => console.log(err))

    // var array = [];
    // array.push(readFile)

    var notes_string = await readFileSync("./db/db.json", "utf8");
    var notes = JSON.parse(notes_string);
    notes.push(newNote);
    console.log("-----------")
    console.log(notes)
    var new_notes = JSON.stringify(notes)

    await writeFileSync('./db/db.json', new_notes, "utf8");

    console.log(new_notes, "data");

    //  x.push(newNote)

    // var fileString = fs.readFileSync('./db/db.json', 'utf8')
    // var fileObj = JSON.parse(fileString);
    // var moviesArr = fileObj.movies;
    // console.log(moviesArr);

    // writeFileSync('./db/db.json', JSON.stringify(readFile, null, 2),
    //   "utf8")

    // We then add the json the user sent to the notes array
    // listArray.push(newNote);
    // newList.push(newNote);
    // We then display the JSON to the users
    res.json(new_notes);

    


  });


}

// Receive info id of note
// Read File
// Parse info
// Delete instanceof
// stringify
// Rewrite