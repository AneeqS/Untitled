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
router.get("/campgrounds/new", isLoggedIn, (req, res) =>{
    console.log("Request was made for the NEW Route");
    res.render("campgrounds/new");
});

//CREATE
router.post("/campgrounds",isLoggedIn, (req, res) =>{
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


function isLoggedIn(req, res, next){

    if(req.isAuthenticated()){
        return next;
    }
    res.redirect("/login");

};


module.exports = router;