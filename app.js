var express =  require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", (req, res) =>{
    console.log("Request was made for the ROOT Route");
    res.send("Welcome To Home Page");
});

app.get("*", (req, res) =>{
   console.log("Request was made for non defined route");
   res.sendStatus(404);
});

app.listen(port, () =>{
   console.log("Server Started");
});