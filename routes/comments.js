let express             = require("express"),
    router              = express.Router({mergeParams: true}),
    expressSanitizer    = require("express-sanitizer"),
    middleWare          = require("../middleware"),
    Campground          = require("../models/campground"),
    Comment             = require("../models/comment");

//NEW
router.get("/new", middleWare.isLoggedIn ,(req, res) => {

    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            req.flash("error", err.message);
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});

        }
    });
});

//CREATE
router.post("/", middleWare.isLoggedIn , (req, res) => {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function (err, comment){
                if(err){
                    req.flash("error", err.message);
                    console.log(err);
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

//EDIT

router.get("/:comment_id/edit", middleWare.checkCommentOwnership , (req, res) => {

    Comment.findById(req.params.comment_id, function (err, comment) {
       if(err){
           req.flash("error", err.message);
           res.redirect("back");
       }else{
           res.render("comments/edit", {campground_id: req.params.id, comment: comment});
       }
    });
});

//UPDATE
router.put("/:comment_id", middleWare.checkCommentOwnership , (req, res) =>{

    req.body.comment.body = req.sanitize(req.body.comment.body);
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, foundComment){
       if(err){
           req.flash("error", err.message);
           res.redirect("back");
       }else{
           req.flash("success", "Updated Successfully");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });

});

//DELETE
router.delete("/:comment_id", middleWare.checkCommentOwnership , (req, res) => {

    Comment.findByIdAndRemove(req.params.comment_id, function (err){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds/" + req.params.id);
        }else{
            req.flash("success", "Deleted Successfully");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});


module.exports = router;