var express =  require("express");
var app = express();
var bodyParser = require("body-parser");
var port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.listen(port, () =>{
   console.log("Server Started");
});