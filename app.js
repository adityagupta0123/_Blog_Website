const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has root" +
        "s in a piece of classical Latin literature from 45 BC, making it over 2000 yea" +
        "rs old. Richard McClintock, a Latin professor at Hampden-Sydney College in Vir" +
        "ginia, looked up one of the more obscure Latin words, consectetur, from a Lore" +
        "m Ipsum passage, and going through the cites of the word in classical literatu" +
        "re, discovered the undoubtable source. ";
const aboutContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has root" +
        "s in a piece of classical Latin literature from 45 BC, making it over 2000 yea" +
        "rs old. Richard McClintock, a Latin professor at Hampden-Sydney College in Vir" +
        "ginia, looked up one of the more obscure Latin words, consectetur, from a Lore" +
        "m Ipsum passage, and going through the cites of the word in classical literatu" +
        "re, discovered the undoubtable source. ";
const contactContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has root" +
        "s in a piece of classical Latin literature from 45 BC, making it over 2000 yea" +
        "rs old. Richard McClintock, a Latin professor at Hampden-Sydney College in Vir" +
        "ginia, looked up one of the more obscure Latin words, consectetur, from a Lore" +
        "m Ipsum passage, and going through the cites of the word in classical literatu" +
        "re, discovered the undoubtable source. ";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extends: true}));

app.use("/Blog_Project/public",express.static("public"));
// app.use(express.static("public"));

let posts = []; 

app.get("/", function (req, res) {
    res.render("home", {
         startingContent : homeStartingContent,
         posts : posts
    });
    
});

app.get("/about", function(req,res){
    res.render("about", { AboutContent : aboutContent} );
});

app.get("/contact", function(req,res){
    res.render("contact", { ContactContent : contactContent} );
});

app.get("/compose", function(req,res){
    res.render("compose" );
});


app.post("/compose", function(req,res){
    const post = {
        title   : req.body.postTitle ,
        content : req.body.postBody
    };

    posts.push(post);
    res.redirect("/");
});

app.get("/post/:postName", function(req,res){
   var requestedTitle = _.lowerCase(req.params.postName);

   posts.forEach(function(post){
       const storedtitle = _.lowerCase(post.title);

       if(storedtitle === requestedTitle){
           res.render("post", {
               title : post.title,
               content : post.content
           })
       }
   });
    
});


app.listen(3000, function () {
    console.log("server stared on port 3000.");
});