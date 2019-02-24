
let     Campground          = require("../models/campground"),
        Comment             = require("../models/comment"),
        middleWareObj = {};

middleWareObj.checkCommentOwnership = function (req, res, next) {

    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            }  else {
                // does user own the comment?
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be Logged in");
        res.redirect("back");
    }

};

middleWareObj.checkOwnership = function (req, res, next) {

    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            }  else {
                // does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be Logged in");
        res.redirect("back");
    }

};

middleWareObj.isLoggedIn = function (req, res, next) {

    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be Logged in");
    res.redirect("/login");

};


module.exports = middleWareObj;