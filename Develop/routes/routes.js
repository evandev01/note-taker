const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const {v4: uuidv4} = require("uuid");

module.exports = function(app){

    let noteID = uuidv4();

    //function to read note data in db.json file
    fs.readFile("db/db.json", "utf8", (err, data)=>{
        if(err) throw err
        var noteData = JSON.parse(data);
    });

    //api routes
    //=========================================================================

    //get route
    app.get("/api/notes", (req, res)=>{
        res.json(noteData);
        console.log("Get data: ")
    });

    //post route
    app.post("/api/notes", (req, res)=>{
        console.log(req.body);
        let newNote = {title: req.body.title, text: req.body.text};
        db.push(newNote);
        fs.writeFileSync("../db/db.json", JSON.stringify(db), "utf-8");
        res.json(db);
    });

    //delete route
    app.delete("/api/notes", (req, res)=>{
        res.splice(req.params.note);
        modifyJSON();
        console.log("Delete data: ")
    });

    //html routes
    //=========================================================================

    //display notes
    app.get("/notes", (req, res)=>{
        res.sendFile(path.join(__dirname, "../public/assets/js/notes.html"))
    });

    //display index.html
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "../public/assets/js/index.html"))
    });

    //Update db.json file
    function modifyJSON(){
        fs.writeFile("../db/db.json", JSON.stringify(noteData), err =>{
            if (err) throw err;
            return true;
        })
    }
};