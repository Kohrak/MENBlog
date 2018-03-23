var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    app = express();
//APP setup
mongoose.connect("mongodb://localhost/men_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//DB schemas

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
})

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL Routes

app.get("/", function(req, res){
  res.redirect("/blogs")
})

//Index

app.get("/blogs", function(req, res){
  Blog.find({}, function(err, blogs){
    if (err){
      console.log("error")
    } else {
      res.render("index", {blogs: blogs});
    }
  })
})
//New

app.get("/blogs/new", function(req, res){
  res.render("new.ejs");
})

//Create
app.post("/blogs", function(req, res){
  Blog.create(req.body.blog, function(err, newBlog){
    if (err){
      console.log("Error creating new blog")
      res.render("new.ejs")
    } else {
      console.log(newBlog)
      res.redirect("/blogs");
    }
  })
})

//Show

app.get("/blogs/:id", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err){
      res.redirect("/blogs")
    } else {
       res.render("show.ejs", {blog: foundBlog});
    }
  })
})  

//edit

app.get("/blogs/:id/edit", function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if (err){
      res.redirect("/blogs")
    } else {
       res.render("edit.ejs", {blog: foundBlog});
    }
  })
})  

//update

app.put("/blogs/:id", function(req, res){
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if (err){
      res.redirect("/blogs")
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  })
})

//Destroy

app.delete("/blogs/:id", function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if (err){
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  })
})

//Local

// app.listen(3000, function(){
//     console.log("Server Started");
// })

//Cloud 9

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started");
})

