let express             = require("express"),
    router              = express.Router(),
    passport            = require("passport"),
    middleWare          = require("../middleware"),
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
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("succes", "Signed you up");
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
    req.flash("success", "Logged You Out!");
    res.redirect("/");
});


module.exports = router;