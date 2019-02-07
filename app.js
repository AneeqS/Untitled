var express =  require("express");
var app = express();
var body_parser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");