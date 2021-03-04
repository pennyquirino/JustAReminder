const util = require("util");
const fs = require("fs");


const util = require("util");
const fs = require("fs");
const { timeStamp } = require("console");

const readFileASync = util.promisify(fs.readFile);
const writeFileASync = util.promisify(fs.writeFile);

class Notes {
  constructor() {
    this.idNum = 0;
  }
  read() {
    return readFileASync("db/db.json", "utf-8");
  }
  write(note) {
    return writeFileASync("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    console.log("Got Notes")
    return this.read().then(notes => {
      console.log(notes)
      let notesArray;
      try {
        notesArray = [].concat(JSON.parse(notes));
      }
      catch (err) {
        notesArray = [];
      }
      return notesArray;
      })
    }
    addNOtes(note) {
      console.log("adding notes");
      const { title, text } = note;
      const newNote = { title, text, id: ++this.idNum }
      return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updateNotes => this.write(updateNotes))
        .then(() => newNote)
    }

    deleteNote(id) {
      console.log("delete notes");
      return this.getNotes()
        .then(notes => notes.filter(note => note.id !== parseInt(id)))
        .then(updateNotes => this.write(updateNotes))
      }

    }




    module.exports = new Notes();
