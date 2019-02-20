let express             = require("express"),
    router              = express.Router(),
    Campground          = require("../models/campground");

//INDEX
router.get("/campgrounds", (req, res) =>{
    console.log("Request was made for the INDEX Route");

    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

//NEW
router.get("/campgrounds/new", (req, res) =>{
    console.log("Request was made for the NEW Route");
    res.render("campgrounds/new");
});

//CREATE
router.post("/campgrounds", (req, res) =>{
    console.log("Request was made for the CREATE Route");
    let newCamp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    Campground.create(newCamp, function (err, campground){
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");
        }
    });
});

//SHOW
router.get("/campgrounds/:id", (req, res) => {

    console.log("Request was made for the SHOW Route");
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCamp){
        if(err){
            console.log(err);
        }else {
            console.log("Found");
            res.render("campgrounds/show", {campground: foundCamp});
        }
    });
});

module.exports = router;