let express             = require("express"),
    router              = express.Router(),
    expressSanitizer    = require("express-sanitizer"),
    Campground          = require("../models/campground");

//INDEX
router.get("/", (req, res) =>{
    console.log("Request was made for the INDEX Route");

    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

//CREATE
router.post("/",isLoggedIn, (req, res) => {
    console.log("Request was made for the CREATE Route");
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCamp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: author
    };

    Campground.create(newCamp, function (err, campground){
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");
        }
    });
});

//NEW
router.get("/new", isLoggedIn, (req, res) => {
    console.log("Request was made for the NEW Route");
    res.render("campgrounds/new");
});

//SHOW
router.get("/:id", (req, res) => {

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


//Edit
router.get("/:id/edit", checkOwnership, (req, res) => {

    console.log("Request Made for the EDIT Route");
    Campground.findById(req.params.id, function (err, foundCamp){
        res.render("campgrounds/edit", {campground: foundCamp});
    });
});

//Update
router.put("/:id", checkOwnership, (req, res) => {

    console.log("Request Made for the UPDATE Route");
    req.body.campground.body = req.sanitize(req.body.campground.body);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCamp){

        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Delete
router.delete("/:id", checkOwnership, (req, res) => {

    console.log("Request Made for the DELETE Route");
    Campground.findByIdAndRemove(req.params.id, function (err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});

function isLoggedIn(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

};

function checkOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }  else {
                // does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;