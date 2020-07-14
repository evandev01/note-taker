const fs = require("fs");
const path = require("path");

module.exports = function(app){

    //function to read note data in db.json file
    fs.readFile("db/db.json", "utf8", (err, data)=>{
        if(err) throw err
        var noteData = JSON.parse(data);
    });

    //api routes
    //=========================================================================

    //get route
    app.get("/api/notes", function(req, res){
        res.json(noteData);
        console.log("Get data: ")
    });

    //post route
    app.post("api/notes", function(req, res){
        res.json(noteData);
        console.log("Post data: ")
    });

    //delete route
    app.delete("api/notes/:note", function(req, res){
        res.splice(req.params.note);
        modifyJSON();
        console.log("Delete data: ")
    });

    //html routes
    //=========================================================================

    //display notes
    app.get("/notes", function(){
        res.sendFile(path.join(__dirname, "../public/assets/js/notes.html"))
    });

    //display index.html
    app.get("*", function(req, res){
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