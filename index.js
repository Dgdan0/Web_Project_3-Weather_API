import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import * as gwd from "./utils/getWeatherDashboard.js";

const app = express();
const port = 3000;
const apiKey = "6438e532cef6304b313ea1b9fe1351bd";
const API_URL = "https://api.openweathermap.org";


// Middleware //
app.use(express.static("public"));      // Main route will be public
app.use(bodyParser.urlencoded({extended: true}));       // Can use res.body to get json database
app.use(express.json());




// Server //
app.get("/", (req, res) =>{
    res.render('index.ejs');
})

app.get("/dashboard", (req, res) => {
    res.render('dashboard.ejs');
})

app.post("/submit-city",async (req, res) =>{
    const cityName = req.body.city;
    const time = '9';
    console.log("City Name: "+cityName);
    let weatherData = await gwd.generateWeatherData(cityName, time);
    console.log(weatherData);
    if(weatherData.error){
        console.log(weatherError.error);
        res.render('dashboard.ejs', {error:weatherData.error});
    }
    else{
        console.log(cityName);
        res.render('dashboard.ejs',{
            cityName: weatherData.cityName,
            fiveWeather: weatherData.fiveWeather});
    }
})

app.post("/change-time", async (req, res) =>{
    let time = req.body.time;
    let cityName = req.body.cityName;

    let weatherData = await gwd.generateWeatherData(cityName, time);
    if(weatherData.error){
        console.log(weatherError.error);
        res.render('dashboard.ejs', {error:weatherData.error});
    }
    else{
        console.log(cityName);
        res.json({
            cityName: weatherData.cityName,
            fiveWeather: weatherData.fiveWeather});
    }
})








app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
})