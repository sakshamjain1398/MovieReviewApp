var express=require("express"),
	passport=require("passport"),
	User=require("../models/user"),
	routes=express.Router();

routes.get("/signup",function (req,res) {
	res.render("signup");
});

routes.get("/login",function (req,res) {
	res.render("login");
});

routes.post("/signup",function (req,res) {
	User.register(new User({username:req.body.username}),req.body.password,function (err,user) {
		if(err)
		{
			console.log(err);
			// req.flash("error",err.message);
			return res.render("signup");
		}
		passport.authenticate("local")(req,res,function () {
			res.redirect(req.app.get("prev_path"));
		});
	});
});
routes.post("/login",passport.authenticate("local",{
	// successRedirect:"/",
	failureRedirect:"/login"
}),function (req,res) {
	if(req.user){
	res.redirect(req.app.get("prev_path"));
	}
	else
	{
		res.redirect("/login");
	}
});

routes.get("/logout",function (req,res) {
	req.logout();
	// req.flash("success","Successfully Logged Out!!")
	res.redirect(req.app.get("prev_path"));
});
function isLoggedin(req,res,next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Log In required!");
	res.redirect("/login");
}
module.exports=routes;