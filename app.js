var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    app = express();
//APP setup
mongoose.connect("mongodb://localhost/men_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//DB schemas

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL Routes
app.get("/blogs", function(req, res){
  res.render("index");
})

app.listen(3000, function(){
    console.log("Server Started");
})
