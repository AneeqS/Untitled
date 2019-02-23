let express             = require("express"),
    router              = express.Router(),
    passport            = require("passport"),
    User                = require("../models/user");


router.get("/", (req, res) =>{
    console.log("Request was made for the ROOT Route");
    res.render("landing");
});

//Sign Up Routes
router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, function (err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});


//Login Routes

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failedRedirect: "/login"
}), (req, res) => {
});

//Log out Route

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});


function isLoggedIn(req, res, next){

    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");

};


module.exports = router;