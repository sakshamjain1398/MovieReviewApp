var express=require("express"),
	request=require("request"),
	routes=express.Router();

routes.get("/",function (req,res) {
	req.app.set("prev_path","/");
	res.render("index");
});

routes.get("/search",function (req,res) {
	var m=req.query.movie_name;
	var final_name=m.split(' ').join('+');
	if(req.query.year!=undefined)
	{
		final_name+="&y="+req.query.year;
	}
	if(req.query.type!=undefined&&req.query.type!="type")
	{
		final_name+="&type="+req.query.type;
	}
	res.redirect("/search/"+final_name+"/1")
});

routes.get("/search/filter",function (req,res) {
	req.app.set("prev_path","/search/filter");
	res.render("filtered_search");
});

routes.get("/search/:movie_name/:page_num",function (req,res) {
	req.app.set("prev_path","/search/"+req.params.movie_name+"/"+req.params.page_num);
	request("http://www.omdbapi.com/?s="+req.params.movie_name+"&page="+req.params.page_num+"&apikey=thewdb",function(error,response,body){
		if(!error&&response.statusCode==200)
		{
			var data=JSON.parse(body);
			var totalpg=data["totalResults"]/10;
			if(Number(data["totalResults"])%10!=0)
				totalpg++;
			totalpg=Math.floor(totalpg);
			if(data["Response"]=="False")
				res.render("noresult");
			else
			res.render("results",{data:data,page_num:req.params.page_num,movie_name:req.params.movie_name,totalpg:totalpg});
		}
	});
});

module.exports=routes;