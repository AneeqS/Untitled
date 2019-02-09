var express =  require("express"),
    app = express(),
    ejs =  require("ejs"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    port = 3000;

mongoose.connect("mongodb://localhost:" + port + "/untitled");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Schema

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
    console.log("Request was made for the GET Campgrounds Route");

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", (req, res) =>{
    console.log("Request was made for the NEW Campgrounds Route");
    res.render("new");
});

app.post("/campgrounds", (req, res) =>{
    console.log("Request was made for the POST Campgrounds Route");
    var newCamp = {
        name: req.body.name,
        image: req.body.image
    };
    console.log(newCamp);
    campgrounds.push(newCamp);
    res.redirect("/campgrounds");
});

app.get("*", (req, res) =>{
   console.log("Request was made for non defined route");
   res.sendStatus(404);
});

app.listen(port, () =>{
   console.log("Server Started");
});


//Might need later
/**
 * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Vivamus a finibus odio. Cras risus turpis, lobortis id eros a, feugiat ornare felis.
 * Ut egestas odio eget varius imperdiet. Curabitur viverra diam dignissim tempor maximus.
 * Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
 * Cras eu tempus velit, sed fermentum dolor. In quis tempor nisi. Aenean rutrum lectus ut
 * lectus egestas, consectetur convallis lorem efficitur. Donec maximus magna ut pretium finibus.
 * Aliquam semper velit eget posuere congue.
 * Vivamus tempor nec sem eget cursus.
 * Phasellus ultrices mollis purus id ultrices. Nunc ultrices eget odio et iaculis.
 * Donec accumsan justo eu feugiat faucibus. Praesent risus est,
 * finibus vel felis vel, tristique lacinia libero. Vestibulum tempus
 * efficitur nibh, nec tempor eros molestie quis. Sed nec risus at est tristique auctor.
 * Maecenas vitae fermentum nulla. Cras suscipit massa non sagittis accumsan.
 * Cras eleifend sollicitudin feugiat.
 * Sed tincidunt tempus odio, non accumsan nisl mattis a.
 * Integer scelerisque non nibh id tempus.
 * Ut id orci in leo pulvinar condimentum condimentum ac metus.
 * Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
 * Proin pharetra quis metus et facilisis. Mauris mollis ullamcorper nisl vel auctor.
 * Praesent ac elit pretium, blandit nunc quis, vulputate neque. Aliquam convallis,
 * magna et molestie finibus, nisi nibh volutpat nibh, vel interdum magna orci eu metus.
 * Ut pellentesque elementum libero, ut semper quam commodo at.
 * Etiam tempus eros eget metus suscipit ornare.
 * Aliquam enim lorem, mollis in blandit et, dapibus sit amet erat.
 * In facilisis vehicula ullamcorper. In est nisl,
 * fermentum lacinia ex non, blandit cursus massa. Nunc vehicula lorem libero,
 * in luctus massa ultrices eu. Praesent sed erat molestie, tincidunt nisl sed,
 * lobortis augue. Mauris faucibus facilisis ligula, ut ultricies mauris convallis a.
 * Quisque lorem risus, porta eu pellentesque sit amet, tempus volutpat mauris.
 * Aliquam consectetur in ante at sollicitudin. Suspendisse potenti.
 * Sed varius augue et mauris hendrerit, finibus semper purus egestas.
 * Fusce aliquet at eros ut lacinia. In vitae lacus mattis, consequat lorem non,
 * efficitur nulla. Proin luctus mi pulvinar, efficitur enim vel, vulputate est.
 * Proin mauris orci, volutpat ac odio non, volutpat vulputate massa.
 * Duis lacinia tellus ac nulla iaculis facilisis.
 * Nullam lacinia lobortis dignissim. In et nulla diam.
 * Suspendisse quis lorem nulla. Nam at ipsum id diam fermentum auctor.
 * Nunc id rutrum metus. Aliquam erat volutpat.
 * Curabitur dui lacus, laoreet ac mauris id, ultrices commodo quam.
 * Integer feugiat libero velit, at fringilla diam posuere nec.
 * * Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Vivamus a finibus odio. Cras risus turpis, lobortis id eros a, feugiat ornare felis.
 * Ut egestas odio eget varius imperdiet. Curabitur viverra diam dignissim tempor maximus.
 * Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
 * Cras eu tempus velit, sed fermentum dolor. In quis tempor nisi. Aenean rutrum lectus ut
 * lectus egestas, consectetur convallis lorem efficitur. Donec maximus magna ut pretium finibus.
 * Aliquam semper velit eget posuere congue.
 * Vivamus tempor nec sem eget cursus.
 * Phasellus ultrices mollis purus id ultrices. Nunc ultrices eget odio et iaculis.
 * Donec accumsan justo eu feugiat faucibus. Praesent risus est,
 * finibus vel felis vel, tristique lacinia libero. Vestibulum tempus
 * efficitur nibh, nec tempor eros molestie quis. Sed nec risus at est tristique auctor.
 * Maecenas vitae fermentum nulla. Cras suscipit massa non sagittis accumsan.
 * Cras eleifend sollicitudin feugiat.
 * Sed tincidunt tempus odio, non accumsan nisl mattis a.
 * Integer scelerisque non nibh id tempus.
 * Ut id orci in leo pulvinar condimentum condimentum ac metus.
 * Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
 * Proin pharetra quis metus et facilisis. Mauris mollis ullamcorper nisl vel auctor.
 * Praesent ac elit pretium, blandit nunc quis, vulputate neque. Aliquam convallis,
 * magna et molestie finibus, nisi nibh volutpat nibh, vel interdum magna orci eu metus.
 * Ut pellentesque elementum libero, ut semper quam commodo at.
 * Etiam tempus eros eget metus suscipit ornare.
 * Aliquam enim lorem, mollis in blandit et, dapibus sit amet erat.
 * In facilisis vehicula ullamcorper. In est nisl,
 * fermentum lacinia ex non, blandit cursus massa. Nunc vehicula lorem libero,
 * in luctus massa ultrices eu. Praesent sed erat molestie, tincidunt nisl sed,
 * lobortis augue. Mauris faucibus facilisis ligula, ut ultricies mauris convallis a.
 * Quisque lorem risus, porta eu pellentesque sit amet, tempus volutpat mauris.
 * Aliquam consectetur in ante at sollicitudin. Suspendisse potenti.
 * Sed varius augue et mauris hendrerit, finibus semper purus egestas.
 * Fusce aliquet at eros ut lacinia. In vitae lacus mattis, consequat lorem non,
 * efficitur nulla. Proin luctus mi pulvinar, efficitur enim vel, vulputate est.
 * Proin mauris orci, volutpat ac odio non, volutpat vulputate massa.
 * Duis lacinia tellus ac nulla iaculis facilisis.
 * Nullam lacinia lobortis dignissim. In et nulla diam.
 * Suspendisse quis lorem nulla. Nam at ipsum id diam fermentum auctor.
 * Nunc id rutrum metus. Aliquam erat volutpat.
 * Curabitur dui lacus, laoreet ac mauris id, ultrices commodo quam.
 * Integer feugiat libero velit, at fringilla diam posuere nec.
 */
