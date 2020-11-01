//*Dependencies
const fs = require("fs");
const express = require("express");
const path = require ("path");
const http = require("http");
const uuid = require("uuid");

//*Creates server
const app = express();
const PORT = process.env.PORT || 3000;

//*Configures Express
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "db")));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//*Activates server listening
app.listen(PORT, function(){
    console.log("App is listening on port: " + PORT);
});