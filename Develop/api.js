const router = require("express").Router();
const fs = require("fs");
const util = require('util');


const readFileSync = util.promisify(fs.readFile)
const writeFileSync = util.promisify(fs.writeFile)



//  let note = fs.readFileSync ('.db/db/json', 'utf8')


function getFile() {
  let noteList = readFileSync('./db/db.json', 'utf8')
  // console.log(noteList);
  return noteList;
  //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

}

router.get("/api/notes", function (req, res) {
  // let getFileData = getFile();
  // console.log(getFileData);
  getFile().then(noteList => res.json(JSON.parse(noteList)))
    .catch(err => console.log(err))
});

//   * POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, 
// and then return the new note to the client.

function writeFile() {

  // console.log(noteList);
  readFileSync('./db/db.json', 'utf8')
}



router.post("/api/notes", function (req, res) {
  
  let newNote = req.body;
  console.log(newNote)
    //   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.

  
writeFile()
let newList = [].map(JSON.parse);
//   * GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.
writeFileSync('./db/db.json', JSON.stringify(newList, null, 2), "utf8")
newList.push(newNote);
  // // let newNote = req.body
  // // console.log(newNote)
  // // getFile()
  // // .then(newNote => writeFile('./db/db.json', JSON.stringify(newNote, null, 2), "utf8"))
  // // res.json(newNote);

  // // // let note = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));    
  //   let newNote = req.body;
  //   console.log(newNote);
  //   fs.writeFileSync('./db/db.json', JSON.stringify(newNote, null, 2),
  //   "utf8")

    // We then add the json the user sent to the notes array
    // listArray.push(newNote);

    // We then display the JSON to the users
    res.json(newList);
});


module.exports = router;