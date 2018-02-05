var express=require("express"),
	request=require("request"),
	Movie=require("./../models/Movie"),
	routes=express.Router();

routes.post("/:imdb_title/review",function (req,res) {
	Movie.create({MovieId:req.params.imdb_title,username:req.user.username,review:req.body.review},function (err,movie) {
		if(err)
			console.log(err);
		else
		{
			res.redirect("/"+req.params.imdb_title);
		}
	});
});

routes.delete("/:imdb_title/review/:review_id/delete",function(req,res) {
	Movie.findByIdAndRemove(req.params.review_id,function (err,movie) {
		if(err)
			console.log(err);
		else
			res.redirect("/"+req.params.imdb_title);
	})
});

routes.put("/:imdb_title/review/:review_id/edit",function (req,res) {
	Movie.findById(req.params.review_id,function (err,movie) {
		movie.review=req.body.review;
		Movie.findByIdAndUpdate(req.params.review_id,movie,function (err,new_movie) {
			res.redirect("/"+req.params.imdb_title);
		})
	})
});

routes.get("/:imdb_title",function (req,res) {
	req.app.set("prev_path","/"+req.params.imdb_title);
	request("http://www.omdbapi.com/?i="+req.params.imdb_title+"&plot=full&apikey=thewdb",function(error,response,body){
		if(!error&&response.statusCode==200)
		{
			var data=JSON.parse(body);
			if(data["Response"]=="False")
				res.render("not_found");
			else
			{
					Movie.find({MovieId:req.params.imdb_title},function (err,reviews) {
					res.render("movie",{data:data,reviews:reviews,imdb_title:req.params.imdb_title});
				});
			}
		}
	});
});

module.exports=routes;