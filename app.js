const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");


const app = express();

// app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    var url = req.body.url;
    console.log(url);
    res.send(url);
});


app.listen(3000, function(){
    console.log("Server Started on Successfully");
});