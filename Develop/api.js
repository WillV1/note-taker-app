const express = require("express");
const fs = require("fs");
const util = require('util');


const readFileSync = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFile);



module.exports = function (app) {

  //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.


  app.get("/api/notes", function (req, res) {

    (readFileSync('./Develop/db/db.json', 'utf8'))
      .then(noteList => {

        console.log(noteList, "data-two")
        res.json(JSON.parse(noteList))
      })
      .catch(err => console.log(err))

  });


  //   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
  // and then return the new note to the client.


  app.post("/api/notes", async function (req, res) {

    let newNote = req.body;
    console.log(newNote);

    var num = Math.floor(Math.random() * 100 + 1);
    var n = num.toString();

    let new_property = { "id": n }

    let new_object = [{ "title": req.body.title, "text": req.body.text, ...new_property }]
    let notes_string = await readFileSync("./Develop/db/db.json", "utf8");

    let notes = JSON.parse(notes_string);
 
    notes.push(new_object[0])
    let new_notes = JSON.stringify(notes)

    await writeFileSync('./Develop/db/db.json', new_notes, "utf8");

    console.log(new_notes, "data");
    res.json(new_notes);

  });

  //   * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. 
  // This means you'll need to find a way to give each note a unique `id` when it's saved. 
  // In order to delete a note, you'll need to read all notes from the `db.json` file, 
  // remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

  app.delete("/api/notes/:id", async function (req, res){

    let noteID  = req.params.id;

    let full_string = await readFileSync("./Develop/db/db.json", "utf8");

    let notes = JSON.parse(full_string);

    // let id = parseInt(id);

    let note = notes.filter(note => {
      return note.id == noteID;
    });

    let noteIndex = notes.indexOf(note);
 
    notes.splice(noteIndex, 1);

    let new_notes = JSON.stringify(notes)

    await writeFileSync('./Develop/db/db.json', new_notes, "utf8");

    res.send("Item deleted");
  });

}