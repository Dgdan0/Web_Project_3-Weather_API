import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;
const apiKey = "6438e532cef6304b313ea1b9fe1351bd";
const API_URL = "https://api.openweathermap.org";


// Middleware //
app.use(express.static("public"));      // Main route will be public
app.use(bodyParser.urlencoded({extended: true}));       // Can use res.body to get json database



const fetchWeather = async (city) => {
    try{
        const response = await axios.get(API_URL+"/geo/1.0/direct?q="+city+"&appid="+apiKey);
        const result = response.data;
        console.log(result);
    } catch(error){
        console.error(error.message);
    }
}

// Server //
app.get("/", (req, res) =>{
    res.render('index.ejs');
})

app.get("/dashboard", (req, res) => {
    res.render('dashboard.ejs');
})

app.post("/submit-city", (req, res) =>{
    const cityName = req.body.city;
    console.log(cityName);
    fetchWeather(cityName);
})









app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})