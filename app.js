var  express=require("express"),
	 app=express(),
	 request=require("request"),
	 BodyParser=require("body-parser"),
	 mongoose=require("mongoose"),
	 methodOverride=require("method-override"),
	 SearchRoutes=require("./routes/search"),
	 UserRoutes=require("./routes/user"),
	 MovieRoutes=require("./routes/movie"),
	 LocalStrategy=require("passport-local"),
	 passport=require("passport"),
	 flash=require("connect-flash"),
	 User=require("./models/user"),
	 Movie = require("./models/Movie");


mongoose.connect("mongodb://localhost/MovieReview");
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(BodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("prev_path","/");

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req,res,next) {
	res.locals.currentUser=req.user;
	// res.locals.error=req.flash("error");
	// res.locals.success=req.flash("success");
	next();
});

app.use(SearchRoutes);

app.use(UserRoutes);

app.use(MovieRoutes);

app.listen(3000);