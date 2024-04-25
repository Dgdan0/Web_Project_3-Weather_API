import express from "express";
import bodyParser from "body-parser";
import axios from "axios";



const app = express();
const port = 3000;



// Middleware //
app.use(express.static("public"));      // Main route will be public
app.use(bodyParser.urlencoded({extended: true}));       // Can use res.body to get json database



// Server //
app.get("/", (req, res) =>{
    res.render('index.ejs');
})