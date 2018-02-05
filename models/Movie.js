var mongoose=require("mongoose");

var MovieSchema=mongoose.Schema({
	MovieId:String,
	username:String,
	review:String
});

module.exports=mongoose.model("movie",MovieSchema);