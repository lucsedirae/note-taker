const fs = require("fs");
const uuid = require("uuid");

const notes = require("../db/db.json");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", (err, data) => {
        const parsed = JSON.parse(data);
        res.json(parsed);
    });
  });

  app.post("/api/notes", function (req, res) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuid.v4(),
    };
    fs.readFile("db/db.json", (err, data) => {
      const parsed = JSON.parse(data);
      parsed.push(newNote);
      fs.writeFile("db/db.json", JSON.stringify(parsed), function (err) {
        if (err) console.log("Error", err);
      });
    });
    res.send("");
  });

      app.delete("/api/notes/:id", function(req, res){
        const noteID = req.params.id;
        fs.readFile("db/db.json", (err, data) => {
            const parsedNote = JSON.parse(data);
            const removeNote = parsedNote.filter(note => note.id !== noteID);
            fs.writeFile("db/db.json", JSON.stringify(removeNote), err => {
                if(err) throw err;
            });
        });
        res.send("Deleted note.");
    });
}