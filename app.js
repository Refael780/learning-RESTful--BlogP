// ========================================
// APP SETUP
// ========================================
var bodyParser  = require("body-parser")
methodOverride  = require("method-override")
mongoose        = require("mongoose"),
express         = require("express");
app             = express();

mongoose.connect("mongodb://localhost/RESTfulBlog");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// ========================================
// MONGOOS SETUP
// ========================================
 ///MONGOOSE CONFIG
var blogSchema=new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type:Date,default:Date.now()}
});

///MODEL CONFIG
var Blog=mongoose.model("Blog",blogSchema);




// ========================================
// RESTful ROUTES
// ========================================



// =====INDEX ROUTES======
app.get("/",function(req,res){
res.redirect("/blogs");
})

app.get("/blogs",function(req,res){
    Blog.find({},function(err,Blog){
        if(err){
            console.log("ERORR!!!!");
        }
        else{
            res.render("index",{Blog: Blog});
        }
    })
   
});

// =====NEW ROUTES======
app.get("/blogs/new",function(req,res){
    res.render("new");

})

// =====CREATE ROUTES====
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog,function(err,newBlog){
        if (err) {
            console.log("ERORR!!!!");

        }
        else{

            res.redirect("/blogs");
        }
    });
})
// =====SHOW ROUTE====
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id,function(err,foundBlog){
        if (err) {
            res.redirect("/");
        }
        else{
            res.render("show",{blog:foundBlog});
        }
    })

})

// =====EDIT ROUTE====
app.get("/blogs/:id/edit",function(req,res)
{
    Blog.findById(req.params.id,function(err,foundBlog){
        if (err) {
            res.redirect("/");
        }
        else{
            res.render("edit",{blog:foundBlog});

        }
    })
})

app.put("/blogs/:id",function(req,res){
        Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updateBlog){
            if (err) {
                res.redirect("/");
            }
            else{
                console.log("Enter");
                res.redirect("/blogs/"+req.params.id);
            }
        })
})

// =====DESTROY ROUTE====
app.delete("/blogs/:id",function(req,res){
    Blog.findByIdAndRemove(req.params.id,function(err){
        if (err) 
        {
            console.log("ERROR TO REMOVE");    
        }
        else{
            res.redirect("/");
        }
    })

})
 
// ========================================
// PORT LISTENING
// ========================================
app.listen(3000,function(){
    console.log("Yelcamp server has started");
    });