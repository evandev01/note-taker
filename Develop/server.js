var express = require("express");
var path = require("path");

//express server and port
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//route files
require("../Develop/routes/routes");

/// initializes server
app.listen(PORT, ()=>{
    console.log(`Application listening on PORT ${PORT}`);
});
