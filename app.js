var express =  require("express");
var ejs =  require("ejs");
var app = express();
var bodyParser = require("body-parser");
var port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "A", image: ""},
    {name: "B", image: ""},
    {name: "C", image: ""},
    {name: "D", image: ""},
    {name: "E", image: ""},
    {name: "F", image: ""},
    {name: "G", image: ""},
    {name: "H", image: ""},
    {name: "I", image: ""},
    {name: "J", image: ""}
];

app.get("/", (req, res) =>{
    console.log("Request was made for the ROOT Route");
    res.render("landing");
});

app.get("/campgrounds", (req, res) =>{
    console.log("Request was made for the Campgrounds Route");
res.render("campgrounds");
});

app.get("*", (req, res) =>{
   console.log("Request was made for non defined route");
   res.sendStatus(404);
});

app.listen(port, () =>{
   console.log("Server Started");
});